"use client"

import { X, Trash2, ShoppingCart, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function CartDrawer() {
    const { items, isOpen, toggleCart, removeItem, cartTotal } = useCart()
    const { isSignedIn } = useUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        if (!isSignedIn) {
            toggleCart()
            router.push("/sign-in?redirect_url=/pricing") // Ideally redirect back to cart or trigger checkout after login
            return
        }

        setIsLoading(true)

        try {
            // Simplified Checkout API call supporting multiple items
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(item => ({
                        priceId: item.id, // Assuming ID is usable or we map it backend
                        price: item.price,
                        name: item.name,
                        credits: item.credits,
                        type: item.type
                    })),
                    mode: items.some(i => i.type === "subscription") ? "subscription" : "payment"
                }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                console.error("Failed to create checkout session")
            }
        } catch (error) {
            console.error("Checkout error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-card border-l border-border shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Your Cart
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                                    <ShoppingCart className="w-12 h-12 opacity-20" />
                                    <p>Your cart is empty</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-primary hover:underline text-sm"
                                    >
                                        Browse Plans
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex items-start justify-between p-4 rounded-lg border border-border bg-background/50">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {item.type === "subscription" ? "Monthly Subscription" : `${item.credits} Credits`}
                                            </p>
                                            <p className="font-bold mt-1">${item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-4 border-t border-border bg-background/50">
                                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Checkout"
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
