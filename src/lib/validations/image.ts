import { z } from "zod"

// Input validation schema for Image Generation
export const imageGenerationSchema = z.object({
    prompt: z.string().min(1, "Prompt is required").max(1000),
    negativePrompt: z.string().optional(),
    aspectRatio: z.enum(["1:1", "16:9", "9:16", "4:3", "3:4"]).default("1:1"),
    style: z.enum(["pixar", "cinematic", "anime", "photorealistic", "3d-model"]).default("pixar"),
    numberOfImages: z.number().min(1).max(4).default(1),
    // For InstantID (Photo to Character)
    faceImage: z.string().optional(), // Base64 string
})

export type ImageGenerationInput = z.infer<typeof imageGenerationSchema>
