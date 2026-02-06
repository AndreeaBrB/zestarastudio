"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Image as ImageIcon, BookOpen, Music, Film, Mic, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGallery } from "@/hooks/useGallery"

const CATEGORIES = [
    { id: "image", label: "Image Studio", icon: ImageIcon, color: "from-pink-500 to-rose-500" },
    { id: "story", label: "Story Lab", icon: BookOpen, color: "from-amber-400 to-orange-500" },
    { id: "music", label: "Music Creator", icon: Music, color: "from-violet-500 to-purple-600" },
    { id: "animation", label: "Animation Bay", icon: Film, color: "from-blue-400 to-cyan-500" },
    { id: "voice", label: "Voice Studio", icon: Mic, color: "from-emerald-400 to-green-500" },
]

// Mock Data
const MOCK_ITEMS = {
    image: [
        { id: 1, title: "Cyberpunk Wizard", url: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?w=800&q=80" },
        { id: 2, title: "Neon Forest", url: "https://images.unsplash.com/photo-1518066000714-58f45f1a297d?w=800&q=80" },
        { id: 3, title: "Space Cat", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" },
    ],
    story: [
        { id: 1, title: "The Toaster's Quest", preview: "Once upon a time, a brave toaster deicded to leave the counter..." },
        { id: 2, title: "Chronicles of the Lost Sock", preview: "Where do they go? The dryer portal opened and..." },
    ],
    music: [
        { id: 1, title: "Lofi Beats to Cast Spells To", duration: "2:30" },
        { id: 2, title: "Epic Boss Fight - Phase 1", duration: "1:45" },
    ],
    animation: [
        { id: 1, title: "Dancing Robot", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNmanN4bm12b3Z3eXh6eXh6eXh6eXh6eXh6eXh6eXh6eXh6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abAHdYvZdBNkD3q/giphy.gif" },
    ],
    voice: [
        { id: 1, title: "Morgan Freeman Impersonation", duration: "0:45" },
        { id: 2, title: "Scary Ghost Boo", duration: "0:12" },
    ]
}

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState("image")
    const { getItemsByType } = useGallery()

    const items = getItemsByType(activeTab as any)

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                    Hall of Magic
                </h1>
                <p className="text-muted-foreground text-lg">
                    Witness the chaotic beauty created by our wizarding community.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon
                    const isActive = activeTab === cat.id
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                                isActive
                                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {cat.label}
                        </button>
                    )
                })}
            </div>

            {/* Content Grid */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div key={item.id} className="group relative rounded-xl overflow-hidden border border-white/10 bg-card/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                                    {activeTab === 'image' || activeTab === 'animation' ? (
                                        <div className="aspect-square overflow-hidden bg-black/50">
                                            {item.type === 'animation' && item.url ? (
                                                <video src={item.url} controls className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            )}
                                        </div>
                                    ) : activeTab === 'story' ? (
                                        <div className="p-6 h-full flex flex-col">
                                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm line-clamp-4">{item.content}</p>
                                        </div>
                                    ) : (
                                        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                                            <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${CATEGORIES.find(c => c.id === activeTab)?.color} flex items-center justify-center mb-4 shadow-lg animate-pulse-glow`}>
                                                {activeTab === 'music' ? <Music className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                            <p className="text-xs text-muted-foreground mb-4">Generated Magic</p>
                                            {item.url && (
                                                <audio controls src={item.url} className="w-full max-w-[200px]" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                                <p className="text-xl">No magic detected in this sector yet.</p>
                                <p className="text-sm mt-2">Go create something amazing!</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
