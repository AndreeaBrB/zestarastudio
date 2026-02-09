"use client"

import { useState, useRef } from "react"
import { Film, Upload, Sparkles, Loader2, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useGallery } from "@/hooks/useGallery"

const ANIMATION_STYLES = [
    { id: "pan", name: "Pan & Zoom", desc: "Classic Ken Burns effect" },
    { id: "morph", name: "Subtle Morph", desc: "Living portrait breathing" },
    { id: "action", name: "Action", desc: "Dynamic movement" },
]

export default function AnimationPage() {
    const [selectedStyle, setSelectedStyle] = useState("pan")
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleExample = () => {
        setUploadedImage("/styles/pixar.jpg")
        setSelectedStyle("pan")
        // We can't fake a video URL easily without a file, so we just prep the inputs
    }

    const { addItem } = useGallery()


    const handleGenerate = async () => {
        if (!uploadedImage) return

        setIsGenerating(true)
        setVideoUrl(null)

        try {
            const response = await fetch("/api/generate/animation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    image: uploadedImage,
                    style: selectedStyle
                })
            })

            const data = await response.json()

            if (data.videoUrl) {
                setVideoUrl(data.videoUrl)
                addItem({
                    type: 'animation',
                    title: `Animation - ${selectedStyle}`,
                    url: data.videoUrl
                })
            } else {
                if (data.error || !response.ok) {
                    // Mock fallback/demo
                    const mockUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNmanN4bm12b3Z3eXh6eXh6eXh6eXh6eXh6eXh6eXh6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abAHdYvZdBNkD3q/giphy.gif"
                    setVideoUrl(mockUrl)
                    addItem({
                        type: 'animation',
                        title: `(Demo) ${selectedStyle} Animation`,
                        url: mockUrl
                    })
                }
            }
        } catch (error) {
            console.error("Animation generation failed", error)
            // Mock fallback
            const mockUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNmanN4bm12b3Z3eXh6eXh6eXh6eXh6eXh6eXh6eXh6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abAHdYvZdBNkD3q/giphy.gif"
            setVideoUrl(mockUrl)
            addItem({
                type: 'animation',
                title: `(Demo) ${selectedStyle} Animation`,
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
                        <h1 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                            <Film className="w-10 h-10 text-cyan-400" />
                            Animation Bay
                        </h1>
                        <p className="text-muted-foreground text-lg mb-6">Bring your still characters to life.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Upload */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">1. Upload Character</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent/5",
                                    uploadedImage ? "border-primary/50 bg-accent/5" : ""
                                )}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                                {uploadedImage ? (
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/50">
                                        <Image src={uploadedImage} alt="Upload" fill className="object-contain" />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <Upload className="w-8 h-8" />
                                        <p className="text-sm">Upload character image</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Style Select */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">2. Animation Style</label>
                            <div className="grid grid-cols-1 gap-3">
                                {ANIMATION_STYLES.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg border text-left transition-all",
                                            selectedStyle === style.id
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <span className="font-medium">{style.name}</span>
                                        <span className="text-xs text-muted-foreground">{style.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !uploadedImage}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Animating...
                                </>
                            ) : (
                                <>
                                    <Film className="w-5 h-5" />
                                    Generate Video (Free)
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Panel - Result */}
                <div className="flex-1 min-h-[500px] rounded-2xl border border-border bg-card/50 flex flex-col items-center justify-center relative overflow-hidden text-center">
                    {videoUrl ? (
                        <div className="w-full max-w-lg">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mb-6 bg-black">
                                <video
                                    src={videoUrl}
                                    controls
                                    autoPlay
                                    loop
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex gap-4 justify-center">
                                <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Download MP4</button>
                                <button className="px-6 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium">Share</button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-muted-foreground max-w-sm px-4">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                <Film className="w-10 h-10 text-accent/50" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Animation Bay</h3>
                            <p className="mb-6">Upload a character to see it move.</p>
                            <button
                                onClick={handleExample}
                                className="px-6 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium text-sm"
                            >
                                See Example
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
