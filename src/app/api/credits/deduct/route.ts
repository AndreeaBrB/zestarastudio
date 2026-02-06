import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { amount } = await req.json()
        const creditsToDeduct = amount || 1

        const supabase = createServerClient()

        // 1. Get current credits
        const { data: profile, error: fetchError } = await supabase
            .from("profiles")
            .select("credits")
            .eq("id", userId)
            .single()

        if (fetchError || !profile) {
            return new NextResponse("Profile not found", { status: 404 })
        }

        if ((profile.credits || 0) < creditsToDeduct) {
            return new NextResponse("Insufficient credits", { status: 403 })
        }

        // 2. Deduct credits
        const { error: updateError } = await supabase
            .from("profiles")
            .update({ credits: profile.credits - creditsToDeduct })
            .eq("id", userId)

        if (updateError) {
            return new NextResponse("Failed to update credits", { status: 500 })
        }

        return NextResponse.json({ success: true, remaining: profile.credits - creditsToDeduct })

    } catch (error) {
        console.error("Internal Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
