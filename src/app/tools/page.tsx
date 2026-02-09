export default function ToolsPage() {
    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Creative Studio Tools</h1>
            <p className="text-muted-foreground mb-12">Access our legacy creative suite.</p>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { name: "Image Studio", href: "/image", desc: "Generate AI Art" },
                    { name: "Story Lab", href: "/story", desc: "Write Novels" },
                    { name: "Music Creator", href: "/music", desc: "Compose Audio" },
                    { name: "Voice Studio", href: "/voice", desc: "Text to Speech" },
                    { name: "Animation Bay", href: "/animation", desc: "Video Gen" },
                ].map((tool) => (
                    <a key={tool.name} href={tool.href} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">{tool.desc}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}
