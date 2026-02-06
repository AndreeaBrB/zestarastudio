"use client"
import { Mail, MessageSquare, MapPin, Loader2 } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                alert("Message sent successfully! We'll get back to you soon.") // Simple alert for now, could use toast
                setFormData({ firstName: "", lastName: "", email: "", message: "" })
            } else {
                alert("Failed to send message. Please try again.")
            }
        } catch (error) {
            console.error("Error sending message:", error)
            alert("Something went wrong. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-muted-foreground text-lg">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                            <p className="text-muted-foreground mb-2">For general inquiries and support.</p>
                            <a href="mailto:support@zestarastudio.com" className="text-primary hover:underline">support@zestarastudio.com</a>
                        </div>
                    </div>


                </div>

                {/* Contact Form */}
                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className="w-full p-3 rounded-lg border border-border bg-background"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className="w-full p-3 rounded-lg border border-border bg-background"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                required
                                className="w-full p-3 rounded-lg border border-border bg-background"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg border border-border bg-background h-32 resize-none"
                                placeholder="How can we help?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {isLoading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
