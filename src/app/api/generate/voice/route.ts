import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { text, voice } = await req.json();

        if (!text) {
            return new NextResponse("Text is required", { status: 400 });
        }

        // Admin Bypass
        const isAdmin = user.emailAddresses.some(e => e.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL || e.emailAddress === process.env.ADMIN_EMAIL);

        let profile = null;

        if (!isAdmin) {
            const supabase = createServerClient();
            const COST = 2; // 2 credits per voice generation

            // 1. Check User Balance
            const { data: userProfile, error: profileError } = await supabase
                .from("profiles")
                .select("credits")
                .eq("id", user.id)
                .single();

            if (profileError || !userProfile) {
                return new NextResponse("User profile not found", { status: 404 });
            }

            if (userProfile.credits < COST) {
                return new NextResponse("Insufficient credits", { status: 403 });
            }
            profile = userProfile;
        }

        // 2. Mock AI Generation (Replace with OpenAI/Coqui TTS later)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Return a dummy audio file URL (this is a sample MP3)
        const mockAudioUrl = "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav";

        // 3. Deduct Credits
        if (!isAdmin && profile) {
            const supabase = createServerClient();
            const COST = 2;
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ credits: profile.credits - COST })
                .eq("id", user.id);

            if (updateError) {
                console.error("Credit deduction failed:", updateError);
                return new NextResponse("Transaction failed", { status: 500 });
            }
        }

        if (updateError) {
            console.error("Credit deduction failed:", updateError);
            return new NextResponse("Transaction failed", { status: 500 });
        }

        return NextResponse.json({
            success: true,
            audioUrl: mockAudioUrl,
            remainingCredits: isAdmin ? 999999 : (profile ? profile.credits - 2 : 0)
        });

    } catch (error) {
        console.error("[VOICE_GEN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
