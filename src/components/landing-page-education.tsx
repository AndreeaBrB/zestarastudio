"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Youtube, Zap, ArrowRight, Play, Newspaper } from "lucide-react"

export function LandingPageEducation() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden items-center justify-center flex flex-col">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-5xl mx-auto relative z-10"
                >
                    <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium border rounded-full text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_-3px_var(--indigo-500)]">
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        <span>Zast (magic) + Ara (spark) = Zastara</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
                        Where Magic Meets <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 animate-gradient-x tracking-normal">
                            Artificial Intelligence
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                        I break down complex AI tools into simple, practical tutorials that anyone can follow.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-yellow-500 mb-12 bg-yellow-500/10 py-2 px-4 rounded-full w-fit mx-auto border border-yellow-500/20">
                        <Sparkles className="w-4 h-4" />
                        New tutorials every Monday, Wednesday, & Friday!
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/tutorials"
                            className="group relative inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
                        >
                            <Youtube className="mr-2 h-6 w-6" />
                            Watch Tutorials
                            <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40" />
                        </Link>
                        <Link
                            href="/prompts"
                            className="inline-flex h-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 px-8 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
                        >
                            <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
                            Free Prompt Genie
                        </Link>
                    </div>
                </motion.div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[120px] -z-10 opacity-60" />
            </section>

            {/* Featured Video Section */}
            <section className="py-12 bg-black/20 border-y border-white/5">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <Play className="w-8 h-8 text-red-500 fill-current" />
                                Latest on YouTube
                            </h2>
                            <p className="text-muted-foreground">Fresh from the editing room.</p>
                        </div>
                        <Link href="/tutorials" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium mt-4 md:mt-0">
                            See All Videos <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="aspect-video w-full rounded-3xl bg-black border border-white/10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
