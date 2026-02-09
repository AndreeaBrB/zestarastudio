"use client"

import { useState } from "react"
import { BookOpen, PenTool, Sparkles, Loader2, Copy, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useGallery } from "@/hooks/useGallery"
import { MagicPromptButton } from "@/components/magic-prompt-button"

const GENRES = [
    "Fantasy", "Science Fiction", "Mystery", "Romance", "Horror", "Adventure", "Fairy Tale", "Comedy"
]

const LENGTHS = [
    { id: "short", label: "Short Story", desc: "~500 words" },
    { id: "medium", label: "Novelette", desc: "~2,000 words" },
    { id: "long", label: "Chapter", desc: "~5,000 words" },
]

export default function StoryGeneratorPage() {
    const [prompt, setPrompt] = useState("")
    const [genre, setGenre] = useState("Fantasy")
    const [length, setLength] = useState("short")
    const [isGenerating, setIsGenerating] = useState(false)
    const [story, setStory] = useState("")
    const { isSignedIn } = useAuth()
    const { openSignUp } = useClerk()
    const router = useRouter()

    const { addItem } = useGallery()

    const handleExample = () => {
        setPrompt("A brave little toaster who wants to see the world beyond the kitchen.")
        setGenre("Adventure")
        setLength("short")
        setStory(`Once upon a time, in a kitchen that smelled perpetually of burnt crumbs and coffee, lived a toaster named Crumbly. Crumbly was not your average appliance. While others were content simply browning bread, Crumbly dreamed of the Great Beyond—the garden visible through the window.

One sunny morning, the back door was left ajar. Seizing his chance, Crumbly unplugged himself (a feat requiring immense wiggling) and hopped off the counter. He clattered onto the linoleum, a metal explorer in a land of giants.

His journey was perilous. The family dog, a golden retriever named Buster, mistook him for a shiny bone. Crumbly had to pop his lever to startle the beast. He navigated the treacherous terrain of the hallway rug and finally, felt the warmth of the sun on his chrome casing.

Out in the garden, Crumbly saw flowers brighter than any jam and grass greener than avocado toast. He realized the world was vast, beautiful, and full of possibilities. And though he eventually returned to his counter (carried back by a confused human), Crumbly never forgot his adventure. He was no longer just a toaster; he was an explorer at heart.`)
    }

    const handleGenerate = async () => {
        if (!prompt) return


        setIsGenerating(true)
        setStory("")

        try {
            // Mock API call since real one might need auth
            // In a real app, we'd pass a "guest-token" or similar, or just allow it rate-limited by IP
            await new Promise(resolve => setTimeout(resolve, 3000))

            // Simulate response
            const storyContent = `(AI Generated Story based on "${prompt}")\n\nIn a realm where ${genre} rules the land... [This is a simulation since backend might require auth key. In production, update API to allow guest usage or use local stub].`
            setStory(storyContent)

            addItem({
                type: 'story',
                title: `${genre} Story: ${prompt.slice(0, 20)}...`,
                content: storyContent,
                preview: storyContent.slice(0, 100) + "..."
            })

        } catch (error) {
            console.error("The magic fizzled out...", error)
            alert("The magic fizzled out. Try again!")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl h-full">
            <div className="flex flex-col lg:flex-row gap-8 h-full">

                {/* Left Panel - Inputs */}
                <div className="w-full lg:w-[400px] flex-shrink-0 space-y-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                            <BookOpen className="w-10 h-10 text-orange-400" />
                            Story Lab
                        </h1>
                        <p className="text-muted-foreground text-lg mb-6">
                            Weave magical tales with AI.
                        </p>

                    </div>

                    <div className="space-y-6">
                        {/* Genre */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">1. Choose Genre</label>
                            <select
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="w-full p-3 rounded-lg border border-border bg-background"
                            >
                                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        {/* Length */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">2. Select Length</label>
                            <div className="grid grid-cols-1 gap-3">
                                {LENGTHS.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => setLength(l.id)}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg border text-left transition-all",
                                            length === l.id
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <span className="font-medium">{l.label}</span>
                                        <span className="text-xs text-muted-foreground">{l.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Prompt */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">3. Story Idea</label>
                            <div className="relative">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Once upon a time, a young robot who wanted to feel emotions..."
                                    className="w-full h-32 rounded-lg border border-border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 pr-12"
                                />
                                <MagicPromptButton
                                    currentValue={prompt}
                                    onEnhance={setPrompt}
                                    type="story"
                                />
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Consulting the Oracles...
                                </>
                            ) : (
                                <>
                                    <PenTool className="w-5 h-5" />
                                    Weave Magic (Free)
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Panel - Result */}
                <div className="flex-1 min-h-[500px] rounded-2xl border border-border bg-card/50 flex flex-col relative overflow-hidden">
                    {story ? (
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                    Generated Story
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(story)}
                                        className="p-2 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-colors" title="Download PDF">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 p-8 overflow-y-auto whitespace-pre-wrap font-serif leading-relaxed text-lg text-foreground/90">
                                {story}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground max-w-sm mx-auto px-4">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                                <BookOpen className="w-10 h-10 text-accent/50" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Waiting for Inspiration</h3>
                            <p className="mb-6">Enter your story idea on the left and let AI write the next chapter.</p>
                            <button
                                onClick={handleExample}
                                className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium text-sm"
                            >
                                Read Sample Story
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
