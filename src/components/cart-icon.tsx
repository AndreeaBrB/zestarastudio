"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function CartIcon() {
    const { items, toggleCart } = useCart()
    const count = items.length

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
        >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
                    {count}
                </span>
            )}
        </button>
    )
}
