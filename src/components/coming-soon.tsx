"use client"

import { Sparkles, Rocket, Ghost, Zap } from "lucide-react";
import Link from "next/link";

export function ComingSoon() {
    return (
        <div className="h-screen -mt-20 bg-[#0a0514] text-white flex flex-col items-center justify-center relative overflow-hidden p-4 text-center selection:bg-fuchsia-500/30 border-none">

            {/* Top Left Logo (Restored) */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2">
                <div className="h-9 w-9 relative">
                    <div className="absolute inset-0 bg-accent blur-lg opacity-20 rounded-full"></div>
                    <img src="/logo.png" alt="Zestara Logo" className="h-full w-full object-contain relative z-10" />
                </div>
                <span className="font-bold text-xl hidden sm:inline-block magic-text">
                    Zestara
                </span>
            </div>

            {/* Background Ambience - More Colorful */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-6 flex flex-col items-center justify-center h-full pt-10">

                {/* Logo/Brand */}
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 flex items-center justify-center shadow-2xl shadow-fuchsia-500/40 animate-pulse">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-fuchsia-200">
                        Zastara AI Creative Studio
                    </h1>
                </div>

                {/* Headline */}
                <h2 className="text-xl md:text-2xl font-bold text-white/90 max-w-2xl mx-auto">
                    We're teaching the robots how to be cool. <br />
                    <span className="text-fuchsia-400">It's taking longer than expected.</span>
                </h2>

                {/* Description - Funny Copy */}
                <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Our AI minions are currently drinking oilshakes and soldering the final pixels.
                    The ultimate playground for storytellers, musicians, and artists is almost ready.
                    <br />
                    <span className="text-white/60 italic text-sm">"It's like magic, but with more math." - Updates coming soon.</span>
                </p>

                {/* Status Blocks */}
                <div className="pt-2 flex flex-col md:flex-row items-center justify-center gap-3">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
                        <div className="p-1.5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Status</p>
                            <p className="text-xs font-bold text-white">Polishing the Pixels</p>
                        </div>
                    </div>

                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
                        <div className="p-1.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg">
                            <Ghost className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Release Date</p>
                            <p className="text-xs font-bold text-white">When it's ready</p>
                        </div>
                    </div>
                </div>

                {/* Warning Badge (Bottom) */}
                <div className="mt-2 inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold border rounded-full text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_-3px_var(--amber-500)] rotate-[-2deg] hover:rotate-2 transition-transform cursor-default">
                    <Rocket className="w-3 h-3 mr-2 animate-bounce" />
                    <span>Caution: Extreme Awesomeness Loading...</span>
                </div>

                {/* Admin Login (Hidden-ish) */}
                <div className="pt-2">
                    <Link href="/sign-in" className="text-[10px] text-white/10 hover:text-white/50 transition-colors">
                        Admin Portal
                    </Link>
                </div>

            </div>

            {/* Footer */}
            <div className="absolute bottom-4 text-[10px] text-white/20 w-full text-center pointer-events-none">
                &copy; {new Date().getFullYear()} Zestara AI Creative Studio. Prepared with 💜 and ☕.
            </div>
        </div>
    );
}
