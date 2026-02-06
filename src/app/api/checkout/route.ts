import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user || !user.emailAddresses[0].emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { items, mode } = body; // items: array of { price, credits, planName, type... }

    if (!items || items.length === 0) {
      return new NextResponse("No items in cart", { status: 400 });
    }

    // Prepare line items for Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.type === "subscription"
            ? `Subscription: ${item.name}`
            : `${item.credits} Credits Top-up`,
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
        recurring: item.type === "subscription" ? { interval: "month" } : undefined,
      },
      quantity: 1,
    }));

    // Aggregate metadata for webhook processing
    // NOTE: Webhooks with multiple items can be complex. 
    // We will store a JSON string of items summary in metadata or rely on checkout session expansion in webhook.
    // For simplicity, we'll store a 'cart_payload' if it fits, or just 'credits' sum.
    // Let's sum up credits to simplify basic webhook logic for now.
    const totalCredits = items.reduce((sum: number, i: any) => sum + (i.credits || 0), 0);
    // If there's a subscription, we might want to flag it.
    const subs = items.filter((i: any) => i.type === "subscription");
    const planName = subs.length > 0 ? subs[0].planName : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: mode, // 'subscription' or 'payment'
      payment_method_types: ["card"],
      line_items,
      customer_email: user.emailAddresses[0].emailAddress,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        credits: totalCredits.toString(),
        planName: planName || "credit_pack",
        isCartCheckout: "true"
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
