"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Play, ArrowRight, Filter, Youtube, Clock, Eye } from "lucide-react"

const categories = ["All", "Image Gen", "Video Gen", "Prompting", "Audio Gen", "Automation"]

const tutorials = [
    {
        title: "Mastering Midjourney v6: From Basic to Pro",
        duration: "12:45",
        views: "12,450",
        date: "2 days ago",
        thumbnail: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=800&auto=format&fit=crop",
        category: "Image Gen",
        description: "Learn how to use structure reference and style reference to create consistent AI art."
    },
    {
        title: "AI Video Revolution: Sora vs Kling vs Runway",
        duration: "15:20",
        views: "8,500",
        date: "1 week ago",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        category: "Video Gen",
        description: "A deep dive into the latest video generation models and how to get the most cinematic results."
    },
    {
        title: "Advanced Prompt Engineering 101",
        duration: "10:10",
        views: "20,100",
        date: "3 days ago",
        thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
        category: "Prompting",
        description: "Stop writing simple prompts. Learn the logic behind persona-based prompting and chain-of-thought."
    },
    {
        title: "Suno AI: Creating Chappell Roan Style Pop",
        duration: "08:30",
        views: "5,200",
        date: "5 days ago",
        thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8718a300a?q=80&w=800&auto=format&fit=crop",
        category: "Audio Gen",
        description: "How to use custom lyrics and style tags to create viral-ready AI music."
    },
    {
        title: "Build Your Own AI Agent with Zapier",
        duration: "18:45",
        views: "3,800",
        date: "2 weeks ago",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        category: "Automation",
        description: "Connect ChatGPT to your email and CRM without writing a single line of code."
    }
]

export default function TutorialsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredTutorials = tutorials.filter(t => {
        const matchesCategory = selectedCategory === "All" || t.category === selectedCategory
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <header className="mb-16 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="shrink-0 relative">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-32 h-32 md:w-40 md:h-40 relative"
                    >
                        <img src="/robot-studying.png" alt="Studying Robot" className="rounded-[2.5rem] shadow-2xl border border-white/10" />
                        <div className="absolute -top-4 -left-4 bg-primary text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                            ACADEMY
                        </div>
                    </motion.div>
                </div>
                <div>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">AI Training Hub</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Master the tools of tomorrow. Practical, no-fluff tutorials to help you build the future.
                    </p>
                </div>
            </header>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedCategory === cat
                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search tutorials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTutorials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all flex flex-col"
                    >
                        <div className="aspect-video relative overflow-hidden bg-black/20">
                            <img src={t.thumbnail} alt={t.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
                                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                                </div>
                            </div>
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                                    {t.category}
                                </span>
                            </div>
                            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 rounded text-[10px] font-bold text-white">
                                {t.duration}
                            </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {t.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                                {t.description}
                            </p>
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {t.views}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.date}</span>
                                </div>
                                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-all">
                                    <Youtube className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredTutorials.length === 0 && (
                <div className="py-20 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <p className="text-xl text-muted-foreground">No tutorials found matching your search. Try another keyword!</p>
                </div>
            )}
        </div>
    )
}
