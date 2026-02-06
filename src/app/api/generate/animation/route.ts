import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { image, style } = await req.json();

        if (!image) {
            return new NextResponse("Image is required", { status: 400 });
        }

        const supabase = createServerClient();
        const COST = 5; // 5 credits per animation

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

        // 2. Mock AI Generation (Replace with AnimateDiff logic later)
        await new Promise((resolve) => setTimeout(resolve, 4000));

        // Return a dummy video URL
        const mockVideoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

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
            videoUrl: mockVideoUrl,
            remainingCredits: profile.credits - COST
        });

    } catch (error) {
        console.error("[ANIMATION_GEN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
