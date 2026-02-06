import Link from "next/link"
import { Sparkles, Zap, Mail, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm mt-auto">
            <div className="container px-4 py-12 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 relative">
                                <img src="/logo.png" alt="Zestara Logo" className="h-full w-full object-contain" />
                            </div>
                            <span className="font-bold text-xl magic-text">Zestara</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Unleash your creativity with AI. Create stories, characters, music, and voiceovers in minutes.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-4 text-primary">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/image" className="hover:text-primary transition-colors">Image Studio</Link></li>
                            <li><Link href="/story" className="hover:text-primary transition-colors">Story Lab</Link></li>
                            <li><Link href="/voice" className="hover:text-primary transition-colors">Voice Studio</Link></li>
                            <li><Link href="/animation" className="hover:text-primary transition-colors">Animation Bay</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors flex items-center gap-1"><Sparkles className="w-3 h-3" /> Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4 text-primary">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/#how-it-works" className="hover:text-primary transition-colors flex items-center gap-1"><Zap className="w-3 h-3" /> How it Works</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4 text-primary">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Zestara AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="mailto:support@zestarastudio.com" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
