"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Youtube, Zap, ArrowRight, Play, BookOpen, Newspaper, Star, Rocket, Image as ImageIcon, Music, Film, Mic, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const magicSkillQuests = [
  {
    title: "Mastering Midjourney v6",
    duration: "12:45",
    views: "12k",
    thumbnail: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=800&auto=format&fit=crop",
    category: "Image Gen"
  },
  {
    title: "AI Video: Sora vs Kling",
    duration: "15:20",
    views: "8.5k",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    category: "Video Gen"
  },
  {
    title: "Prompt Engineering 101",
    duration: "10:10",
    views: "20k",
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    category: "Prompting"
  }
]

const newsSnippets = [
  {
    title: "OpenAI Unveils New Search Model",
    date: "Today",
    category: "AI News",
    description: "A major update to how we search the web using generative AI."
  },
  {
    title: "Nvidia's Next-Gen Chips are Here",
    date: "Yesterday",
    category: "Hardware",
    description: "The hardware fueling the next wave of AI magic."
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden items-center justify-center flex flex-col">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium border rounded-full text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_-3px_var(--indigo-500)]">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            <span>Learn. Create. Master AI.</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
            Your Journey into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 animate-gradient-x tracking-normal">
              AI Mastery Starts Here
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            I break down complex AI tools into simple, practical tutorials.
            <span className="block mt-4 text-primary font-bold">Join Zastara and transform from an AI curious to an AI pro.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/tutorials"
              className="group relative inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all hover:scale-105 hover:shadow-red-500/50"
            >
              <Youtube className="mr-2 h-6 w-6" />
              Watch Training
              <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40" />
            </Link>
            <Link
              href="/merch"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 px-8 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Shop Merchandise
            </Link>
          </div>
        </motion.div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] -z-10 opacity-60" />
      </section>

      {/* YouTube Spotlight */}
      <section className="py-12 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Youtube className="w-32 h-32 text-red-500" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold mb-6">
                  <Play className="w-3 h-3 fill-red-500" />
                  LATEST FROM @ZASTARAAI
                </div>
                <h2 className="text-4xl font-bold mb-6">Magic in Motion</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  I don't just talk about AI. I show you how to bend it to your will.
                  Watch my latest deep dive into the world of digital alchemy.
                </p>
                <Link
                  href="https://www.youtube.com/@zastaraai"
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105"
                >
                  <Youtube className="w-6 h-6" />
                  Open Channel
                </Link>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/video">
                <img
                  src="https://images.unsplash.com/photo-1626379953822-baec19c3bbcd?q=80&w=800&auto=format&fit=crop"
                  alt="YouTube Video Placeholder"
                  className="object-cover w-full h-full group-hover/video:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/video:bg-black/20 transition-all">
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl scale-90 group-hover/video:scale-100 transition-transform">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magic Skill Quests Preview */}
      <section className="py-12 bg-black/40">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Magic Skill Quests</h2>
              <p className="text-muted-foreground">New training videos uploaded weekly.</p>
            </div>
            <Link href="/tutorials" className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition-all group">
              Full Hub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {magicSkillQuests.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-black/20">
                  <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <Play className="w-12 h-12 text-white fill-white" />
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-[10px] font-bold text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {video.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{video.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <Link href="/tutorials" className="hover:text-white transition-colors">Watch now</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI News Snippet */}
      <section className="py-12 border-y border-white/5 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold mb-6">
                <Zap className="w-3 h-3" />
                AI DAILY NEWS
              </div>
              <h2 className="text-4xl font-bold mb-6">Stay Ahead of the Robots.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Catch up on the last 24 hours of AI developments in less than 2 minutes.
                I filter out the noise and give you the magic.
              </p>
              <div className="space-y-6">
                {newsSnippets.map((news, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">{news.category}</span>
                        <span className="text-[10px] text-muted-foreground">• {news.date}</span>
                      </div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{news.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/news" className="inline-flex items-center gap-2 mt-8 text-sm font-bold hover:text-primary transition-colors">
                View all news <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-square rounded-3xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                <Rocket className="w-32 h-32 text-indigo-500/20 absolute -top-10 -right-10 rotate-12" />
                <div className="text-center p-8">
                  <Newspaper className="w-20 h-20 text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">The Magic Morning</h3>
                  <p className="text-muted-foreground mb-8">Get my daily AI summary delivered to your inbox.</p>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-all">Join</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
              NEW ARRIVALS
            </div>
            <h2 className="text-4xl font-bold mb-4">Zastara Merchandise</h2>
            <p className="text-xl text-muted-foreground">Wear the magic. Limited edition AI-inspired gear.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Magic Prompt Hoodie", price: "$45.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
              { name: "AI Vision T-Shirt", price: "$28.00", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" },
              { name: "Neural Network Cap", price: "$22.00", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop" },
              { name: "Latency Master Mug", price: "$18.00", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="aspect-square relative overflow-hidden bg-black/20">
                  {i === 0 && (
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                      <div className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-yellow-500/20 animate-bounce">
                        MERCH OF THE WEEK
                      </div>
                    </div>
                  )}
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <button className="bg-white text-black font-bold px-6 py-2 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-primary font-bold">{item.price}</p>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] italic text-muted-foreground line-clamp-1">
                    "{["Best thing since sliced prompt!", "My cat thinks I'm a wizard now.", "Standardized my magic levels.", "Increased my productivity by 4%!"][i % 4]}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/merch" className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
              View All Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* The Magic Behind the Merch - Funny POD Story */}
      <section className="py-16 relative overflow-hidden bg-white/[0.02]">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Magic Behind the Merch</h2>
            <p className="text-muted-foreground">How I create potions... er, t-shirts, out of thin air.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 -z-10" />

            {[
              {
                step: "1. The Spark",
                title: "You Choose Magic",
                desc: "You find a design that speaks to your inner prompt-engineer and place an order. I do a tiny dance.",
                icon: Star
              },
              {
                step: "2. The Summoning",
                title: "My Workshop Wakes Up",
                desc: "My magical partners in the Zastara workshop get the signal. They print your design only when you ask... pure zero-waste wizardry.",
                icon: Zap
              },
              {
                step: "3. The Delivery",
                title: "Owl... or Truck",
                desc: "A fresh, custom-made item is shipped directly to your door. You look awesome. The planet stays happy. Win-win.",
                icon: Rocket
              }
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-[2rem] relative group hover:border-primary/50 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">{item.step}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{item.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magical Statistics */}
      <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-md">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Wizards Trained", value: "1,420+", icon: Sparkles },
              { label: "Prompts Cast", value: "85k+", icon: Zap },
              { label: "Merch Items Magic-ed", value: "12", icon: ImageIcon },
              { label: "Coffee Consumed", value: "∞", icon: Mic },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-black mb-1 magic-text">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Wizard Wisdom */}
      <section className="py-16 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">AI Wizard Wisdom</h2>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-card border border-border p-8 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
                <blockquote className="text-xl italic text-muted-foreground relative z-10">
                  "The best way to predict the future is to prompt it properly. Also, never trust a dragon with your API keys."
                </blockquote>
                <div className="mt-6 font-bold text-primary">— The Archwizard of Zastara</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Legend of Zastara */}
      <section id="legend" className="py-16 bg-gradient-to-b from-transparent to-primary/5 scroll-mt-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group flex flex-col items-center">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-violet-600 rounded-[3rem] blur-2xl opacity-40"></div>
                <div className="relative aspect-square w-full max-w-[500px] rounded-[3rem] overflow-hidden border-2 border-white/20 shadow-2xl">
                  <img
                    src="/robot-mascot.png"
                    alt="Zastara Robot Mascot"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <p className="text-xs font-bold text-primary">"I do all the coding. They just spill coffee."</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
                THE STORY
              </div>
              <h2 className="text-4xl font-bold mb-6 italic">What is a "Zastara" anyway?</h2>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-left relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Zastara wasn't found in an ancient library or a dictionary. It was born in a late-night coding session when I, powered by pure caffeine and a slightly glitchy keyboard, tried to type <span className="text-primary font-bold">"Zesty Star AI"</span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A rogue coffee spill hit the <span className="font-bold">"A"</span> key, and the AI sensing my exhaustion decided that <span className="text-primary font-black uppercase tracking-tighter text-2xl">ZASTARA</span> sounded like a place where robots wear high-quality hoodies and everyone finally understands prompt engineering. I didn't argue.
                </p>
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-primary font-bold italic">The Magic Spark</span>
                  </h4>
                  <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-black text-primary mb-1 tracking-widest uppercase">Zast</div>
                      <div className="text-xs uppercase tracking-[0.2em] font-bold opacity-60">Magic</div>
                    </div>
                    <div className="text-3xl font-light opacity-30">+</div>
                    <div className="text-center">
                      <div className="text-4xl font-black text-primary mb-1 tracking-widest uppercase">Ara</div>
                      <div className="text-xs uppercase tracking-[0.2em] font-bold opacity-60">Spark</div>
                    </div>
                  </div>
                  <p className="mt-6 text-center text-muted-foreground italic max-w-xl mx-auto">
                    "Zastara represents that elusive <span className="text-primary font-bold">Magic Spark</span> of innovation. To many, AI feels like pure wizardry, and I'm here to provide the spark that turns curiosity into mastery."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
