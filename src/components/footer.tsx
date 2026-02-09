import Link from "next/link"
import { Sparkles, Zap, Mail, Github, Twitter, Instagram, Youtube, Facebook, Music as TikTok } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm mt-auto">
            <div className="container px-4 py-12 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 relative">
                                <img src="/logo.png" alt="Zastara Logo" className="h-full w-full object-contain" />
                            </div>
                            <span className="font-bold text-xl magic-text">Zastara AI</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Where the spark of magic meets artificial intelligence.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
                            <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">AI News</Link></li>
                            <li><Link href="/merch" className="text-muted-foreground hover:text-primary transition-colors">Merchandise</Link></li>
                            <li><Link href="/#legend" className="text-muted-foreground hover:text-primary transition-colors">About Me</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Connect with Me</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="mailto:support@zastarastudio.com" className="hover:text-primary transition-colors">support@zastarastudio.com</Link></li>
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

                <div className="mt-12 pt-8 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">
                            © {new Date().getFullYear()} Zastara AI. All rights reserved.
                        </p>
                        <p className="text-[10px] text-muted-foreground/50 max-w-md italic">
                            * Magical Disclaimer: Zastara AI is not responsible for any accidental dragon summonings, spontaneous levitation, or sudden urges to speak in binary. My merchandise may contain trace amounts of pixie dust. Use at your own risk of becoming too awesome.
                        </p>
                    </div>
                    <div className="flex items-center justify-end gap-4 text-muted-foreground">
                        <Link href="https://www.youtube.com/@zastaraai" target="_blank" className="hover:text-red-500 transition-colors"><Youtube className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><TikTok className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors"><Facebook className="w-5 h-5" /></Link>
                        <Link href="#" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
