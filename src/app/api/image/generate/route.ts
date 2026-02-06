import { NextRequest, NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { z } from "zod"
import { imageGenerationSchema } from "@/lib/validations/image"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

// Placeholder for Comfy Cloud API URL
const COMFY_API_URL = "https://www.comfy.org/api" // Example, needs actual endpoint

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser()

        // 1. Auth Check
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // 2. Input Validation
        const json = await req.json()
        const input = imageGenerationSchema.parse(json)

        console.log(`[ImageGen] User ${user.id} requested: ${input.prompt}`)

        // 3. Admin Bypass (Free unlimited)
        const isAdmin = user.emailAddresses.some(e => e.emailAddress === process.env.ADMIN_EMAIL)

        // 4. Credit Check (If not admin)
        if (!isAdmin) {
            // TODO: Fetch credits from Supabase
            // const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single()
            // if ((profile?.credits || 0) < 2) return new NextResponse("Insufficient credits", { status: 403 })
        }

        // 5. Call ComfyUI Cloud
        // NOTE: This requires the valid workflow JSON for SDXL + InstantID
        // For now, we return a mock success to prove the end-to-end flow works

        // In a real implementation:
        // const response = await fetch(`${COMFY_API_URL}/run`, {
        //   method: "POST",
        //   headers: { "Authorization": `Bearer ${process.env.COMFY_CLOUD_API_KEY}` },
        //   body: JSON.stringify({ prompt: input.prompt, workflow_id: "pixar-workflow-id" })
        // })

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000))

        return NextResponse.json({
            success: true,
            // Return a placeholder image that changes based on style to show "logic" is working
            images: [`https://placehold.co/1024x1024/png?text=${input.style}+Character+By+Zestara`]
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 })
        }
        console.error("[ImageGen Error]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
