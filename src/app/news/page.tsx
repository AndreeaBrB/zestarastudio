"use client"

import { motion } from "framer-motion"
import { Newspaper, Zap, ArrowRight, Share2, MessageSquare } from "lucide-react"

const newsItems = [
    {
        title: "OpenAI Unveils New Search Model: SearchGPT Evolution",
        date: "Feb 9, 2026",
        category: "AI News",
        summary: "OpenAI has officially moved its search prototype into main production. It's faster, more accurate, and actually cites sources like a human assistant.",
        magicalTake: "The era of the blue links is officially over. Magic search is here to stay.",
        readingTime: "3 min"
    },
    {
        title: "Nvidia's Blackwell Chips Hit the Mainstream",
        date: "Feb 8, 2026",
        category: "Hardware",
        summary: "The first batch of Blackwell GPUs has been deployed to data centers worldwide. This means faster generation times for everyone.",
        magicalTake: "Bigger brains for the bots means faster magic for you.",
        readingTime: "5 min"
    },
    {
        title: "Gemini 2.5: The Context Window Expansion",
        date: "Feb 7, 2026",
        category: "Model Updates",
        summary: "Google's latest update allows the model to process up to 5 million tokens. You can now feed it entire libraries.",
        magicalTake: "Our AI friends just got a massive memory upgrade. Don't worry, they still won't remember where you left your keys.",
        readingTime: "4 min"
    }
]

export default function NewsPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-screen max-w-4xl">
            <header className="mb-16 flex flex-col items-center text-center">
                <div className="relative mb-8">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-32 md:w-40 md:h-40 relative group"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img src="/robot-wizard.png" alt="Wizard Robot" className="relative rounded-full shadow-2xl border-4 border-primary/20 object-cover w-full h-full" />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                            ORACLE
                        </div>
                    </motion.div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold mb-4">
                    <Zap className="w-3 h-3" />
                    ZASTARA DAILY
                </div>
                <h1 className="text-5xl font-black mb-4 tracking-tight">AI News Hub</h1>
                <p className="text-xl text-muted-foreground">The latest magic from the world of artificial intelligence.</p>
            </header>

            <div className="space-y-12">
                {newsItems.map((item, i) => (
                    <motion.article
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Share2 className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer" />
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                                {item.category}
                            </span>
                            <span className="text-xs text-muted-foreground">• {item.date}</span>
                            <span className="text-xs text-muted-foreground">• {item.readingTime} read</span>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h2>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            {item.summary}
                        </p>

                        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mb-6">
                            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                                <Sparkles className="w-3 h-3" />
                                Magical Take
                            </div>
                            <p className="text-sm italic text-indigo-200/80">
                                "{item.magicalTake}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors">
                                Read Full Story <ArrowRight className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <span className="flex items-center gap-1 text-xs">
                                    <MessageSquare className="w-4 h-4" /> 12
                                </span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10 text-center">
                <Newspaper className="w-12 h-12 text-primary mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Don't Miss a Spark</h3>
                <p className="text-muted-foreground mb-8 text-lg">Subscribe to our newsletter and get the weekly AI digest.</p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input type="email" placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl transition-all">Subscribe</button>
                </div>
            </div>
        </div>
    )
}
import { Sparkles } from "lucide-react"
