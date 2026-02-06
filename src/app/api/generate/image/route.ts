import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { prompt, style, image } = await req.json();

        if (!image) {
            return new NextResponse("Image is required", { status: 400 });
        }

        const supabase = createServerClient();
        const COST = 2; // 2 credits per generation

        // 1. Check User Balance
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("credits")
            .eq("id", user.id)
            .single();

        if (profileError || !profile) {
            return new NextResponse("User profile not found", { status: 404 });
        }

        if (profile.credits < COST) {
            return new NextResponse("Insufficient credits", { status: 403 });
        }

        // 2. Mock AI Generation (Replace with ComfyUI / Replicate call later)
        // We'll mimic a delay and return the same image for now
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const generatedImageUrl = "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop";

        // 3. Deduct Credits
        const { error: updateError } = await supabase
            .from("profiles")
            .update({ credits: profile.credits - COST })
            .eq("id", user.id);

        if (updateError) {
            console.error("Credit deduction failed:", updateError);
            return new NextResponse("Transaction failed", { status: 500 });
        }

        return NextResponse.json({
            success: true,
            imageUrl: generatedImageUrl,
            remainingCredits: profile.credits - COST
        });

    } catch (error) {
        console.error("[IMAGE_GEN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
