import { Music } from "lucide-react"
import { MusicGenerator } from "@/components/music/MusicGenerator"

export default function MusicGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl h-full min-h-[calc(100vh-80px)]">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-3 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400">
                    <Music className="w-10 h-10 text-fuchsia-400" />
                    Zestara Music Studio
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Compose magical soundtracks, ambient loops, and epic scores with a wave of your wand.
                    Powered by Mubert AI.
                </p>
            </div>

            <MusicGenerator />
        </div>
    )
}
