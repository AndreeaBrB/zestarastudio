"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { Youtube, Instagram, Twitter, Music as TikTok, Facebook } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sparkles, Image as ImageIcon, BookOpen, Music, Film, Mic, Zap, Globe, CircleDollarSign, ChevronDown, ShoppingCart } from "lucide-react"
import { CartIcon } from "@/components/cart-icon"
import { useCart } from "@/lib/cart-context"

const navItems = [
    { name: "Tutorials", href: "/tutorials", icon: Film },
    { name: "AI News", href: "/news", icon: Zap },
    { name: "Prompt Genie", href: "/prompts", icon: Sparkles },
    { name: "Merchandise", href: "/merch", icon: ShoppingCart },
    { name: "About Me", href: "/#legend", icon: Sparkles },
]

export function Navbar() {
    const pathname = usePathname()
    const { user } = useUser()

    // Check if user is admin (same logic as page.tsx)
    const isAdmin = user?.emailAddresses.some(e => e.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL)



    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-background/5 backdrop-blur-sm">
            <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
                <Link href="/" className="mr-8 flex items-center gap-2 group">
                    <div className="h-9 w-9 relative">
                        <div className="absolute inset-0 bg-accent blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                        <img src="/logo.png" alt="Zastara Logo" className="h-full w-full object-contain relative z-10" />
                    </div>
                    <span className="hidden font-bold sm:inline-block text-xl magic-text">
                        Zastara - AI Education & Merch
                    </span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                        pathname === item.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-500 transition-all duration-300"
                                    )}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <div className="flex items-center gap-4">
                                <CartIcon />
                                <Link href="/sign-up" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-6 rounded-full text-sm font-medium transition-colors flex items-center justify-center shadow-lg shadow-primary/25">
                                    Start Your Quest
                                </Link>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <CartIcon />
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    )
}
