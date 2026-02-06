"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useCredits } from "@/hooks/useCredits"
import { cn } from "@/lib/utils"

interface GuestCreditBannerProps {
    category: string
    className?: string
}

export function GuestCreditBanner({ category, className }: GuestCreditBannerProps) {
    const { getCredits, isGuest, totalLimit } = useCredits()
    const credits = getCredits(category)

    if (!isGuest) return null

    return (
        <div className={cn(
            "w-full max-w-md mx-auto mb-8 p-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-1",
            className
        )}>
            <div className="flex items-center gap-2 font-medium text-yellow-400">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>{credits}/{totalLimit} Free Guest Spells Remaining</span>
            </div>
            <p className="text-xs text-yellow-500/80">
                <Link href="/sign-up" className="underline hover:text-yellow-400 font-bold">Register free</Link> to get 3 fresh credits every week!
            </p>
        </div>
    )
}
