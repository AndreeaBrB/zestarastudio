"use client"

import { useState } from "react"
import { Sparkles, Wand2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface MagicPromptButtonProps {
    currentValue: string
    onEnhance: (newValue: string) => void
    type: "story" | "music" | "image" | "animation" | "voice"
    className?: string
}

// Simple client-side "AI" for now. 
// In a real app, this would call an API like /api/enhance-prompt
const INSPIRATIONS = {
    story: [
        "A time-traveling barista who accidentally serves coffee to historical figures.",
        "A dragon who is afraid of fire and wants to be a firefighter.",
        "In a world where emotions are traded as currency...",
        "A detective solving crimes in a city built on the back of a giant turtle.",
        "The last library on Earth, guarded by a robotic librarian with a glitch."
    ],
    music: [
        "A hopeful melody that builds into a triumphant orchestral climax.",
        "Cyberpunk synthwave for a high-speed chase in a neon city.",
        "Lo-fi hip hop beats for studying, with rain sounds in the background.",
        "An eerie ambient track with distant whispers and deep bass.",
        "Upbeat french house track with funky basslines."
    ],
    image: [
        "A futuristic city made of crystal, glowing under a purple moon.",
        "A portrait of a cat wizard casting a spell, digital art style.",
        "A steampunk airship flying through cloudy skies at sunset.",
        "Cyberpunk street food vendor in a rainy Tokyo alleyway.",
        "A magical forest where the trees have glowing blue leaves."
    ],
    animation: [
        "A robot dancing the robot dance.",
        "A flower blooming in fast motion with sparkles.",
        "A spaceship taking off and leaving a trail of smoke.",
        "A cute ghost floating through a wall."
    ],
    voice: [
        "A deep, narrator voice for a movie trailer.",
        "A cheerful anime character saying hello.",
        "A grumpy wizard casting a spell.",
        "A soothing meditation guide voice."
    ]
}

const ENHANCERS = [
    (s: string) => `${s}, featuring vivid details and a cinematic atmosphere.`,
    (s: string) => `${s}. The mood should be mysterious and enchanting.`,
    (s: string) => `${s}. Add a touch of whimsy and magic.`,
    (s: string) => `${s}. Make it epic, dramatic, and emotionally resonant.`,
    (s: string) => `${s}. In the style of a award-winning masterpiece.`
]

export function MagicPromptButton({ currentValue, onEnhance, type, className }: MagicPromptButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleMagic = async () => {
        setIsLoading(true)

        // Simulate "AI" thinking time
        await new Promise(resolve => setTimeout(resolve, 800))

        if (!currentValue || currentValue.trim().length === 0) {
            // Pick a random inspiration
            const options = INSPIRATIONS[type] || INSPIRATIONS.story
            const randomPick = options[Math.floor(Math.random() * options.length)]
            onEnhance(randomPick)
        } else {
            // Enhance existing
            const enhanceFunc = ENHANCERS[Math.floor(Math.random() * ENHANCERS.length)]
            onEnhance(enhanceFunc(currentValue))
        }

        setIsLoading(false)
    }

    return (
        <button
            onClick={handleMagic}
            disabled={isLoading}
            className={cn(
                "absolute right-3 bottom-3 p-2 rounded-full transition-all duration-300 group",
                "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-110",
                "text-white shadow-lg shadow-purple-500/30",
                className
            )}
            title={currentValue ? "Enhance Magic" : "Inspire Me"}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            )}
            <span className="sr-only">Magic Prompt</span>
        </button>
    )
}
