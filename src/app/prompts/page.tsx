"use client"

import { useState } from "react"
import { Sparkles, Copy, Check } from "lucide-react"

export default function PromptGeniePage() {
    const [input, setInput] = useState("")
    const [result, setResult] = useState("")
    const [isCopied, setIsCopied] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleMagic = async () => {
        if (!input) return
        setLoading(true)

        // Mock AI delay
        await new Promise(r => setTimeout(r, 1500))

        // Simple mock logic for now - in real app, call OpenAI
        const enhancers = [
            "cinematic lighting", "8k resolution", "unreal engine 5 render",
            "hyper-detailed", "volumetric fog", "taken on Sony A7R IV"
        ]
        const randomEnhancers = enhancers.sort(() => 0.5 - Math.random()).slice(0, 3).join(", ")

        setResult(`${input}, ${randomEnhancers}, masterpiece, trending on artstation, sharp focus.`)
        setLoading(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-black mb-6 flex items-center justify-center gap-4">
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                    Prompt Genie
                </h1>
                <p className="text-xl text-muted-foreground">
                    Turn "a cat" into "A majesty feline royalty descending from the stars...".
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <label className="block text-sm font-bold mb-2 ml-1">Your Boring Idea</label>
                <div className="flex gap-4 mb-8">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. A dog eating pizza"
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none"
                        onKeyDown={(e) => e.key === "Enter" && handleMagic()}
                    />
                    <button
                        onClick={handleMagic}
                        disabled={loading || !input}
                        className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                        {loading ? "Brewing..." : "Magicfy ✨"}
                    </button>
                </div>

                {result && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <label className="block text-sm font-bold mb-2 ml-1 text-green-400">Pro Result</label>
                        <div className="bg-black/80 rounded-xl p-6 relative group border border-green-500/20">
                            <p className="text-lg leading-relaxed text-gray-200">{result}</p>
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
