"use client"

import { useState } from "react"
import { Mic, Play, Download, Loader2, Volume2, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { useCredits } from "@/hooks/useCredits"
import { useGallery } from "@/hooks/useGallery"
import { GuestCreditBanner } from "@/components/guest-credit-banner"
import { useRouter } from "next/navigation"

const VOICES = [
    { id: "alloy", name: "Alloy", gender: "Neutral", desc: "Versatile and balanced" },
    { id: "echo", name: "Echo", gender: "Male", desc: "Warm and rounded" },
    { id: "fable", name: "Fable", gender: "British", desc: "British accent, formal" },
    { id: "onyx", name: "Onyx", gender: "Male", desc: "Deep and authoritative" },
    { id: "nova", name: "Nova", gender: "Female", desc: "Energetic and bright" },
    { id: "shimmer", name: "Shimmer", gender: "Female", desc: "Clear and melodic" },
]

export default function VoiceStudioPage() {
    const [text, setText] = useState("")
    const [selectedVoice, setSelectedVoice] = useState("alloy")
    const [isGenerating, setIsGenerating] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const { getCredits, deductCredit, loading, isGuest, totalLimit } = useCredits()
    const { addItem } = useGallery()
    const credits = getCredits("voice")

    const handleExample = () => {
        setText("Welcome to Zestara Voice Studio. I can read any text you type with lifelike clarity and emotion. Try changing my voice to see what fits your story best!")
        setSelectedVoice("onyx")
    }

    const handlePreview = (voiceId: string) => {
        // Mock Preview: Play a short beep or generic sound since we don't have real assets
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg")
        audio.volume = 0.5
        audio.play().catch(e => console.error("Audio play failed", e))

        // In a real app, we would play: `/voices/${voiceId}/preview.mp3`
        console.log(`Previewing voice: ${voiceId}`)
    }

    const handleGenerate = async () => {
        if (!isSignedIn && credits <= 0) {
            const msg = isGuest
                ? "You've used all your free guest spells! Join the guild to create more."
                : "Not enough mana (credits)!"

            if (isGuest) {
                if (confirm(msg)) router.push("/sign-up")
            } else {
                alert(msg)
            }
            return
        }
        if (!text) return

        // Deduct
        const success = await deductCredit("voice", 2)
        if (!success) {
            alert("Failed to process credits")
            return
        }

        setIsGenerating(true)
        setAudioUrl(null)

        try {
            const response = await fetch("/api/generate/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text,
                    voice: selectedVoice
                })
            })

            const data = await response.json()

            if (data.audioUrl) {
                setAudioUrl(data.audioUrl)
                addItem({
                    type: 'voice',
                    title: `Voice: ${selectedVoice} - ${text.slice(0, 15)}...`,
                    url: data.audioUrl
                })
            } else {
                if (data.error || !response.ok) {
                    // Mock fallback for demo
                    const mockUrl = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_ffda786252.mp3?filename=voice-analysis-37072.mp3"
                    setAudioUrl(mockUrl)
                    addItem({
                        type: 'voice',
                        title: `(Demo) ${selectedVoice} Voice`,
                        url: mockUrl
                    })
                }
            }
        } catch (error) {
            console.error("Voice generation failed", error)
            // Mock fallback
            const mockUrl = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_ffda786252.mp3?filename=voice-analysis-37072.mp3"
            setAudioUrl(mockUrl)
            addItem({
                type: 'voice',
                title: `(Demo) ${selectedVoice} Voice`,
                url: mockUrl
            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl h-full">
            <div className="flex flex-col lg:flex-row gap-8 h-full">

                {/* Left Panel - Inputs */}
                <div className="w-full lg:w-[400px] flex-shrink-0 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400">
                            <Mic className="w-10 h-10 text-emerald-400" />
                            Voice Studio
                        </h1>
                        <p className="text-muted-foreground text-lg mb-6">Turn text into lifelike speech.</p>
                        <GuestCreditBanner category="voice" className="mx-0 w-full md:w-fit" />
                    </div>

                    <div className="space-y-6">
                        {/* Voice Selection */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">1. Choose Voice</label>
                            <div className="grid grid-cols-1 gap-3">
                                {VOICES.map((voice) => (
                                    <button
                                        key={voice.id}
                                        onClick={() => {
                                            setSelectedVoice(voice.id)
                                            handlePreview(voice.id)
                                        }}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg border text-left transition-all",
                                            selectedVoice === voice.id
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                                <Volume2 className="w-4 h-4 text-accent" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{voice.name}</div>
                                                <div className="text-xs text-muted-foreground">{voice.gender}</div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{voice.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Input */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">2. Enter Text</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter the text you want the AI to narrate..."
                                className="w-full h-40 rounded-lg border border-border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <div className="text-xs text-muted-foreground text-right">
                                {text.length} characters
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !text}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Synthesizing Voice...
                                </>
                            ) : (
                                <>
                                    <Mic className="w-5 h-5" />
                                    Generate Audio (2 Credits)
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Panel - Result */}
                <div className="flex-1 min-h-[500px] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center relative overflow-hidden">
                    {audioUrl ? (
                        <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xl text-center space-y-6">
                            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                                <Volume2 className="w-12 h-12 text-primary" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-2">Audio Ready</h3>
                                <p className="text-sm text-muted-foreground">Generated with {VOICES.find(v => v.id === selectedVoice)?.name} voice</p>
                            </div>

                            <audio controls className="w-full" src={audioUrl}>
                                Your browser does not support the audio element.
                            </audio>

                            <div className="flex gap-3 justify-center">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download MP3
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground max-w-sm px-4">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                <Volume2 className="w-10 h-10 text-accent/50" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Voice Studio</h3>
                            <p className="mb-6">Select a voice and enter text to hear it spoken.</p>
                            <button
                                onClick={handleExample}
                                className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium text-sm"
                            >
                                Try Example
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
