import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        // Retrieve the subscription details if it's a subscription
        const subscription = session.subscription;

        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is missing in metadata", { status: 400 });
        }

        const { userId, credits, planName } = session.metadata;
        const creditsToAdd = parseInt(credits || "0");

        const supabase = createServerClient();

        // Check if user profile exists
        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (profile) {
            // Update existing profile
            const { error } = await supabase
                .from("profiles")
                .update({
                    credits: (profile.credits || 0) + creditsToAdd,
                    tier: planName !== "credit_pack" ? planName : profile.tier,
                    stripe_customer_id: session.customer as string,
                    stripe_subscription_id: typeof subscription === "string" ? subscription : subscription?.id,
                })
                .eq("id", userId);

            if (error) {
                console.error("Error updating profile:", error);
                return new NextResponse("Database Error", { status: 500 });
            }
        } else {
            // Create new profile if it doesn't exist (though it should ideally exist on signup)
            const { error } = await supabase
                .from("profiles")
                .insert({
                    id: userId,
                    credits: creditsToAdd,
                    tier: planName !== "credit_pack" ? planName : "free",
                    stripe_customer_id: session.customer as string,
                    stripe_subscription_id: typeof subscription === "string" ? subscription : subscription?.id,
                });

            if (error) {
                console.error("Error creating profile:", error);
                // Verify if error is because user doesn't exist in auth.users? 
                // Supabase triggers usually handle profile creation. 
                // If we rely on webhooks, we must ensure profile exists or we can insert it.
                return new NextResponse("Database Error", { status: 500 });
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
