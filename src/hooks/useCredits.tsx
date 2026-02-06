"use client"

import { useUser } from "@clerk/nextjs"
import { useGuestCredits } from "@/lib/guest-credits"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function useCredits() {
    const { isLoaded: isAuthLoaded, isSignedIn, user } = useUser()
    const guest = useGuestCredits()
    const [userCredits, setUserCredits] = useState<number>(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthLoaded) return

        if (isSignedIn && user) {
            fetchUserCredits()
        } else {
            setLoading(false)
        }
    }, [isAuthLoaded, isSignedIn, user])

    const fetchUserCredits = async () => {
        if (!user) return
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("credits")
                .eq("id", user.id)
                .single()

            if (data) {
                setUserCredits(data.credits ?? 0)
            } else if (error) {
                console.error("Error fetching credits:", error)
            }
        } catch (err) {
            console.error("Failed to fetch credits", err)
        } finally {
            setLoading(false)
        }
    }

    const getCredits = (category: string) => {
        if (isSignedIn) {
            // Logged in users use the global pool
            return userCredits
        } else {
            // Guests use per-category limits
            return guest.getRemainingCredits(category)
        }
    }

    const deductCredit = async (category: string, amount: number = 1): Promise<boolean> => {
        if (isSignedIn) {
            if (userCredits < amount) return false

            // Optimistic update
            setUserCredits(prev => prev - amount)

            try {
                // Call API to deduct (securely)
                // We'll use a server action or API route. 
                // For now, let's assume we have an endpoint or use direct DB if allowed (RLS).
                // Usually we use an API endpoint /api/credits/deduct
                const res = await fetch("/api/credits/deduct", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount, category })
                })

                if (!res.ok) {
                    // Revert on failure
                    setUserCredits(prev => prev + amount)
                    return false
                }
                return true
            } catch (err) {
                setUserCredits(prev => prev + amount)
                return false
            }
        } else {
            return guest.useCredit(category) // Returns true/false
        }
    }

    const isGuest = !isSignedIn

    return {
        credits: isGuest ? 0 : userCredits, // Raw number for users
        getCredits, // Smart getter
        deductCredit,
        loading: loading || !guest.isLoaded,
        isGuest,
        totalLimit: guest.totalLimit
    }
}
