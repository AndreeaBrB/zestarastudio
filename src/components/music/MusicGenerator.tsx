"use client"

import { useState, useRef, useEffect } from "react"
import { Music, Play, Pause, Download, Wand2, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { MagicPromptButton } from "@/components/magic-prompt-button"
import { useGallery } from "@/hooks/useGallery"

const MOODS = [
    "Epic & Heroic", "Lo-Fi Chill", "Dark Synthwave", "Orchestral Fantasy", "Upbeat Pop", "Ethereal Ambient", "Cyberpunk", "Meditation"
]

const DURATIONS = [
    { id: "15", label: "15s Jingle" },
    { id: "30", label: "30s Loop" },
    { id: "60", label: "1m Track" },
    { id: "120", label: "2m Track" },
]

export function MusicGenerator() {
    const [prompt, setPrompt] = useState("")
    const [mood, setMood] = useState("Lo-Fi Chill")
    const [duration, setDuration] = useState("30")
    const [isGenerating, setIsGenerating] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const { isSignedIn } = useAuth()
    const router = useRouter()

    const { addItem } = useGallery()

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play()
            else audioRef.current.pause()
        }
    }, [isPlaying])

    const handleGenerate = async () => {
        // Validation
        if (!prompt && !mood) return


        setIsGenerating(true)
        setError(null)
        setAudioUrl(null)
        setIsPlaying(false)

        try {
            // Combine mood and prompt
            const finalPrompt = `${mood} style. ${prompt}`.trim()

            // 1. Start Task
            const startResponse = await fetch("/api/generate/music", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: finalPrompt,
                    duration, // Note: Suno duration is usually fixed or model dependent, passing anyway
                }),
            })

            const startData = await startResponse.json();

            if (!startResponse.ok || !startData.success) {
                throw new Error(startData.error || "Failed to start generation");
            }

            const taskId = startData.taskId;
            console.log("Task started:", taskId);

            // 2. Poll for Completion
            // Suno takes roughly 60-120 seconds. We'll poll every 5 seconds.
            const pollInterval = 5000;
            const maxAttempts = 60; // 5 minutes timeout

            let attempts = 0;
            let finalUrl = null;

            while (attempts < maxAttempts) {
                attempts++;

                // Wait before checking
                await new Promise(resolve => setTimeout(resolve, pollInterval));

                const checkResponse = await fetch(`/api/generate/music?taskId=${taskId}`);
                const checkData = await checkResponse.json();

                console.log("Polling status:", checkData.status);

                if (checkData.status === "completed" && checkData.audioUrl) {
                    finalUrl = checkData.audioUrl;
                    break;
                } else if (checkData.status === "failed") {
                    throw new Error("Music generation failed on provider side.");
                }

                // If 'processing' or 'pending', continue polling
            }

            if (!finalUrl) {
                throw new Error("Generation timed out. Please try again later.");
            }

            setAudioUrl(finalUrl);
            addItem({
                type: 'music',
                title: `${mood} - ${prompt.slice(0, 20)}...`,
                url: finalUrl
            });

        } catch (err: any) {
            console.error(err)
            setError(err.message || "Something went wrong")
            // Optional: Refund credit here if failed? 
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* Configure Panel */}
            <div className="w-full lg:w-[450px] flex-shrink-0 space-y-6">
                {/* Error Banner */}
                {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-start gap-3 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold">Generation Failed</p>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">1</span>
                        Musical Vibe
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {MOODS.map(m => (
                            <button
                                key={m}
                                onClick={() => setMood(m)}
                                className={cn(
                                    "p-3 text-sm rounded-xl border transition-all text-left relative overflow-hidden group",
                                    mood === m
                                        ? "border-primary bg-primary/5 text-primary shadow-[0_0_15px_-5px_var(--primary)]"
                                        : "border-border hover:border-primary/50"
                                )}
                            >
                                <span className="relative z-10">{m}</span>
                                {mood === m && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">2</span>
                        Duration
                    </label>
                    <div className="flex gap-2">
                        {DURATIONS.map(d => (
                            <button
                                key={d.id}
                                onClick={() => setDuration(d.id)}
                                className={cn(
                                    "flex-1 p-2 py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all",
                                    duration === d.id
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border hover:border-primary/50"
                                )}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">3</span>
                        Custom Prompt (Optional)
                    </label>
                    <div className="relative">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="E.g., A slow build up with violins, perfect for a sad scene..."
                            className="w-full h-24 rounded-xl border border-border bg-background/50 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50 pr-12"
                        />
                        <MagicPromptButton
                            currentValue={prompt}
                            onEnhance={setPrompt}
                            type="music"
                        />
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 group"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Composing Symphony...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Generate Track (Free)
                        </>
                    )}
                </button>
            </div>

            {/* Preview Panel */}
            <div className="flex-1 min-h-[400px] lg:h-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden p-8">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

                {audioUrl ? (
                    <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500 relative z-10">
                        {/* Album/Track Visual */}
                        <div className="relative w-48 h-48 mx-auto group">
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-xl transition-all duration-1000",
                                isPlaying ? "opacity-70 scale-110" : "opacity-30 scale-100"
                            )} />
                            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-white/10 flex items-center justify-center shadow-2xl">
                                <Music className={cn(
                                    "w-16 h-16 text-white/80 transition-transform duration-700",
                                    isPlaying && "animate-pulse" // Could rotate if desired
                                )} />
                            </div>

                            {/* Play Overlay */}
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {isPlaying ? <Pause className="w-12 h-12 text-white" /> : <Play className="w-12 h-12 text-white ml-1" />}
                            </button>
                        </div>

                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                Generated Masterpiece
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {mood} • {DURATIONS.find(d => d.id === duration)?.label}
                            </p>
                        </div>

                        {/* Custom Player Controls */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-4">
                            <audio
                                ref={audioRef}
                                src={audioUrl}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                                controls
                                className="w-full hidden" // Hiding default, managing via custom UI or keeping default
                            />
                            {/* For reliability let's use default audio controls but styled, 
                                OR use the hidden one and custom buttons. 
                                Let's show the default controls for functionality first, 
                                but keep them transparent-ish if possible or just use standard.
                                Actually standard <audio> is safest for MVP. 
                            */}
                            <audio ref={audioRef} src={audioUrl} controls className="w-full accent-violet-500" />

                            <a
                                href={audioUrl}
                                download={`zestara-music-${Date.now()}.mp3`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                            >
                                <Download className="w-4 h-4" /> Download MP3
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-6 max-w-sm text-white/50">
                        <div className="w-24 h-24 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                            <Music className="w-10 h-10 opacity-50" />
                            <div className="absolute inset-0 rounded-full border border-white/5 scale-110" />
                            <div className="absolute inset-0 rounded-full border border-white/5 scale-125 opacity-50" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white/90 mb-2">Ready to Compose?</h3>
                            <p className="text-sm">Select your vibe, set the duration, and let the AI summon a unique soundtrack for you.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
