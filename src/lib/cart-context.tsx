"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type CartItemType = "subscription" | "credit_pack"

export interface CartItem {
    id: string
    name: string
    price: string
    type: CartItemType
    credits: number
    image?: string
    planId?: string // For subscriptions
    planName?: string // Optional, for display name consistency
}

interface CartContextType {
    items: CartItem[]
    isOpen: boolean
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    clearCart: () => void
    toggleCart: () => void
    cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("zestara-cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from local storage", e)
            }
        }
    }, [])

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem("zestara-cart", JSON.stringify(items))
    }, [items])

    const addItem = (item: CartItem) => {
        setItems((prev) => {
            // Prevent duplicate subscriptions if one already exists? 
            // For simplicity, let's allow it but maybe warn in UI later. 
            // Or better: if adding the same item ID, ignore or increment qty (we only support qty 1 for now)
            if (prev.some((i) => i.id === item.id)) {
                setIsOpen(true) // Just open cart if already added
                return prev
            }
            // If subscription, maybe remove other subscriptions? 
            // Let's keep it simple for now: allow mixed for display, handle in checkout logic.
            return [...prev, item]
        })
        setIsOpen(true)
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setItems([])
    }

    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }

    const cartTotal = items.reduce((total, item) => total + parseFloat(item.price), 0)

    return (
        <CartContext.Provider value={{ items, isOpen, addItem, removeItem, clearCart, toggleCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
