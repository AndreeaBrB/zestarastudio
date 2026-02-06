import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { prompt, genre, length } = await req.json();

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const supabase = createServerClient();
        const COST = 3; // 3 credits per story

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

        // 2. Mock AI Generation (Replace with Llama 3 via Groq/Replicate later)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockStory = `Title: The ${genre} Adventure\n\nOnce upon a time, based on your prompt: "${prompt}"...\n\nEvery shadow seemed to whisper secrets of the ancient world. The protagonist stepped forward, heart pounding like a war drum in the silence of the night. This was no ordinary journey; it was a ${length} quest that would determine the fate of the entire kingdom.\n\n(This is a mock generated story. Integration with Llama 3 will replace this text with a full complete story based on your prompt!)`;

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
            story: mockStory,
            remainingCredits: profile.credits - COST
        });

    } catch (error) {
        console.error("[STORY_GEN_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
