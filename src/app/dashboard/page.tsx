"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { motion } from "framer-motion"
import { CreditCard, Sparkles, Image as ImageIcon, BookOpen, Music, Film, Mic, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
    {
        title: "Image Studio",
        description: "Transform photos into Pixar-style characters",
        icon: ImageIcon,
        href: "/dashboard/image",
        color: "from-purple-500 to-indigo-600",
        credits: 2,
    },
    {
        title: "Story Lab",
        description: "Generate magical stories with AI",
        icon: BookOpen,
        href: "/dashboard/story",
        color: "from-pink-500 to-rose-500",
        credits: 3,
    },
    {
        title: "Music Creator",
        description: "Compose AI soundtracks",
        icon: Music,
        href: "/dashboard/music",
        color: "from-amber-400 to-orange-500",
        credits: 3,
    },
    {
        title: "Animation Bay",
        description: "Bring characters to life",
        icon: Film,
        href: "/dashboard/animation",
        color: "from-blue-400 to-cyan-500",
        credits: 5,
    },
    {
        title: "Voice Studio",
        description: "Add professional narration",
        icon: Mic,
        href: "/dashboard/voice",
        color: "from-emerald-400 to-teal-500",
        credits: 2,
    },
]

export default function DashboardPage() {
    const { user, isLoaded } = useUser()

    // Check if user is admin (free unlimited access)
    const isAdmin = user?.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL

    // Placeholder credits - will be fetched from Supabase
    const userCredits = isAdmin ? "∞" : 100

    return (
        <div className="container px-4 py-8 mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!</h1>
                    <p className="text-muted-foreground">What would you like to create today?</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Credits Display */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border">
                        <CreditCard className="w-4 h-4 text-accent" />
                        <span className="font-semibold">{userCredits}</span>
                        <span className="text-sm text-muted-foreground">credits</span>
                        {!isAdmin && (
                            <Link href="/pricing" className="ml-2 text-xs text-primary hover:underline">
                                Buy more
                            </Link>
                        )}
                    </div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>

            {/* Admin Badge */}
            {isAdmin && (
                <div className="mb-6 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Admin Account - Unlimited Access</span>
                </div>
            )}

            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => {
                    const Icon = module.icon
                    return (
                        <motion.div
                            key={module.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={module.href} className="block group">
                                <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 hover:-translate-y-1">
                                    <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br", module.color)} />

                                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br text-white", module.color)}>
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                                    <p className="text-muted-foreground mb-4">{module.description}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            {isAdmin ? "Free" : `${module.credits} credits/use`}
                                        </span>
                                        <span className="text-sm font-medium text-primary group-hover:underline">
                                            Open →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/dashboard/gallery" className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                    <h3 className="font-semibold mb-2">My Gallery</h3>
                    <p className="text-sm text-muted-foreground">View all your created characters and projects</p>
                </Link>
                <Link href="/dashboard/settings" className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                    <h3 className="font-semibold mb-2">Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage account, billing, and preferences</p>
                </Link>
            </div>
        </div>
    )
}
