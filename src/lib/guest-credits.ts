"use client"

import { useState, useEffect } from "react"

const CREDIT_LIMIT = 3
const RESET_PERIOD_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

interface GuestCredits {
    categories: Record<string, number> // category -> used count
    lastReset: number
}

export function useGuestCredits() {
    const [credits, setCredits] = useState<GuestCredits>({ categories: {}, lastReset: Date.now() })
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem("zestara_guest_credits")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                // Check expiry
                if (Date.now() - parsed.lastReset > RESET_PERIOD_MS) {
                    // Expired, reset
                    const newCredits = { categories: {}, lastReset: Date.now() }
                    setCredits(newCredits)
                    localStorage.setItem("zestara_guest_credits", JSON.stringify(newCredits))
                } else {
                    setCredits(parsed)
                }
            } catch (e) {
                // Error parsing, reset
                const newCredits = { categories: {}, lastReset: Date.now() }
                setCredits(newCredits)
                localStorage.setItem("zestara_guest_credits", JSON.stringify(newCredits))
            }
        } else {
            // First time
            const newCredits = { categories: {}, lastReset: Date.now() }
            setCredits(newCredits)
            localStorage.setItem("zestara_guest_credits", JSON.stringify(newCredits))
        }
        setIsLoaded(true)
    }, [])

    const getRemainingCredits = (category: string) => {
        const used = credits.categories[category] || 0
        return Math.max(0, CREDIT_LIMIT - used)
    }

    const useCredit = (category: string): boolean => {
        if (!isLoaded) return false
        const used = credits.categories[category] || 0
        if (used >= CREDIT_LIMIT) return false

        const newCredits = {
            ...credits,
            categories: {
                ...credits.categories,
                [category]: used + 1
            }
        }
        setCredits(newCredits)
        localStorage.setItem("zestara_guest_credits", JSON.stringify(newCredits))
        return true
    }

    return { getRemainingCredits, useCredit, isLoaded, totalLimit: CREDIT_LIMIT }
}
