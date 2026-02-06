"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Image as ImageIcon, BookOpen, Music, Film, Mic, Check, Zap, Rocket, Star, Ghost } from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
  {
    title: "Image Studio",
    description: "Transform your boring selfies into epic space warriors.",
    icon: ImageIcon,
    href: "/image",
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "Story Lab",
    description: "Write bestselling novels while you nap.",
    icon: BookOpen,
    href: "/story",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Music Creator",
    description: "Compose bangers without knowing what a chord is.",
    icon: Music,
    href: "/music",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Animation Bay",
    description: "Make things move. It's like magic, but real.",
    icon: Film,
    href: "/animation",
    color: "from-blue-400 to-cyan-500",
  },
  {
    title: "Voice Studio",
    description: "Give your characters a voice that doesn't sound like a robot.",
    icon: Mic,
    href: "/voice",
    color: "from-emerald-400 to-teal-500",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-2 pb-12 px-6 md:pt-4 md:pb-16 overflow-hidden items-center justify-center flex flex-col">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium border rounded-full text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_-3px_var(--indigo-500)]">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            <span>Warning: May cause extreme creativity</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
            Stop Being <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 animate-gradient-x tracking-normal">
              Bo<span className="tracking-widest">r</span>ing.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Zestara is the magical playground where your weirdest ideas come to life.
            Make art, write stories, and compose music. No talent required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/image"
              className="group relative inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-lg font-bold text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/50"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Try Magic For Free
              <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-white/10 bg-white/5 px-8 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
            >
              See Cool Stuff
            </Link>
          </div>
        </motion.div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px] -z-10 opacity-40 animate-pulse" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Modules Grid */}
      <section className="pt-12 pb-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Fun Stuff</h2>
            <p className="text-xl text-muted-foreground">Pick your potion and start brewing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <Link key={module.title} href={module.href} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl transition-all hover:bg-white/10 hover:border-white/20 h-full flex flex-col"
                  >
                    <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br", module.color)} />

                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500", module.color)}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{module.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow text-lg leading-relaxed group-hover:text-white/80 transition-colors">{module.description}</p>

                    <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                      Enter Studio <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Why We're Better Than <br />
                <span className="text-indigo-400">The Other Guys</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Most AI tools are like strict librarians. We're the cool art teacher who lets you throw paint at the wall.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fast as Lightning</h3>
                    <p className="text-muted-foreground">Don't wait hours for a render. We generate magic before you can say "Abracadabra".</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Actually Good Quality</h3>
                    <p className="text-muted-foreground">No six-fingered hands or garbled audio. We curate the best models for premium results.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/20">
                    <Ghost className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ghost Fees? No thanks.</h3>
                    <p className="text-muted-foreground">Transparent pricing. Free credits to start. No soul-selling required.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-bounce">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">100% Magic Guaranteed</h3>
                  <p className="text-muted-foreground">If you aren't impressed, we'll eat a virtual hat.</p>
                  <Link href="/sign-up" className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-colors">
                    Prove It
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4 gap-3">
                <div className="h-8 w-8 relative">
                  <div className="absolute inset-0 bg-accent blur-lg opacity-50 rounded-full"></div>
                  <img src="/logo.png" alt="Zestara Logo" className="h-full w-full object-contain relative z-10" />
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Zestara</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                Making the internet less boring, one pixel at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/image" className="hover:text-primary transition-colors">Image Studio</Link></li>
                <li><Link href="/story" className="hover:text-primary transition-colors">Story Lab</Link></li>
                <li><Link href="/voice" className="hover:text-primary transition-colors">Voice Studio</Link></li>
                <li><Link href="/animation" className="hover:text-primary transition-colors">Animation Bay</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Zestara Creative Studio. Made with 💜 and ☕.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
