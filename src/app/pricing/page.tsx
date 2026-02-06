"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

const plans = [
    {
        name: "Starter",
        price: "9.99",
        period: "/month",
        description: "Perfect for casual creators",
        credits: 100,
        mode: "subscription",
        features: [
            "100 credits/month",
            "~50 images or 33 stories",
            "Standard generation speed",
            "Basic export options",
            "Email support",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "29.99",
        period: "/month",
        description: "For serious creators",
        credits: 500,
        mode: "subscription",
        features: [
            "500 credits/month",
            "~250 images or 166 stories",
            "Priority generation",
            "High-resolution exports",
            "All export formats",
            "Priority support",
        ],
        cta: "Go Pro",
        popular: true,
    },
]

const creditPacks = [
    { credits: 50, price: "4.99" },
    { credits: 100, price: "8.99" },
    { credits: 250, price: "19.99" },
]

export default function PricingPage() {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState<string | null>(null)
    const { addItem } = useCart()

    // No longer direct checkout, but keeping for reference if we want "Buy Now" vs "Add to Cart" later
    // Transforming this into "Add to Cart" handler
    const handleAddToCart = (item: any) => {
        addItem({
            id: item.name || `pack-${item.credits}`, // Use simple ID for now
            name: item.name || `${item.credits} Credits Pack`,
            price: item.price,
            type: item.mode === "subscription" ? "subscription" : "credit_pack",
            credits: item.credits,
        })
    }


    return (
        <div className="container px-4 py-16 mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Choose a plan that works for you. All plans include access to every AI module.
                </p>
            </div>

            {/* Subscription Plans */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Subscription Plans</h2>
                <p className="text-muted-foreground">Save up to 20% with monthly billing</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "relative rounded-2xl border p-8",
                            plan.popular
                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                : "border-border bg-card"
                        )}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-muted-foreground">{plan.description}</p>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold">${plan.price}</span>
                            <span className="text-muted-foreground">{plan.period}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-accent/10">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="font-semibold">{plan.credits} credits</span>
                            <span className="text-sm text-muted-foreground">included</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleAddToCart(plan)}
                            className={cn(
                                "block w-full py-3 px-4 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2",
                                plan.popular
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                            )}
                        >
                            Add to Cart
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Credit Packs */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Need More Credits?</h2>
                    <p className="text-muted-foreground">
                        Top up anytime with credit packs. No subscription required.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {creditPacks.map((pack) => (
                        <motion.button
                            key={pack.credits}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleAddToCart({ ...pack, mode: 'payment' })}
                            className="p-6 rounded-xl border border-border bg-card text-center hover:border-primary/50 transition-colors cursor-pointer w-full relative"
                        >
                            <div className="text-3xl font-bold text-primary mb-1">{pack.credits}</div>
                            <div className="text-sm text-muted-foreground mb-4">credits</div>
                            <div className="font-semibold">${pack.price}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* FAQ or Trust Section */}
            <div className="mt-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>All plans include a 7-day money-back guarantee</span>
                </div>
            </div>
        </div>
    )
}
