"use strict";

import { Sparkles, Mail } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#0a0514] text-white flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-[#0a0514] to-[#0a0514]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">

        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Zestara Studio
          </h1>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 pb-2">
          Something Magical is Coming
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          We are building the ultimate AI Creative Studio for storytellers, musicians, and artists.
          Get ready to unleash your creativity like never before.
        </p>

        {/* Contact/Support Action */}
        <div className="pt-8">
          <a
            href="mailto:support@zestarastudio.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl shadow-white/10"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </a>
          <p className="mt-4 text-sm text-white/40">
            Questions? Email us at <br />
            <span className="text-white/60 hover:text-white transition-colors cursor-pointer">support@zestarastudio.com</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-xs text-white/20">
        &copy; {new Date().getFullYear()} Zestara Studio. All rights reserved.
      </div>
    </div>
  );
}
