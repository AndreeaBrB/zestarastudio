"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
}

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm Zestara AI. I can help you with creating images, stories, animations, and voiceovers. How can I assist you today?"
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        // Simulate AI processing
        setTimeout(() => {
            const response = generateResponse(userMessage.content)
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response
            }
            setMessages(prev => [...prev, aiMessage])
            setIsTyping(false)
        }, 1000)
    }

    const generateResponse = (input: string): string => {
        const lowerInput = input.toLowerCase()

        if (lowerInput.includes("image") || lowerInput.includes("photo")) {
            return "Our Image Studio uses advanced SDXL models. You can upload a reference photo or simply describe what you want to see. Try prompts like 'A cyberpunk city' or 'Disney style character'."
        }
        if (lowerInput.includes("story") || lowerInput.includes("write")) {
            return "Story Lab helps you write creative stories. Just give me a character name and a genre, and I'll generate a unique tale for you."
        }
        if (lowerInput.includes("voice") || lowerInput.includes("speech")) {
            return "Voice Studio can turn any text into lifelike speech. We have multiple voices like Alloy, Echo, and Shimmer. Great for narrations!"
        }
        if (lowerInput.includes("animation") || lowerInput.includes("video")) {
            return "Animation Bay brings static images to life. Upload a character and choose a motion style like 'Walking' or 'Pan & Zoom'."
        }
        if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("subscription")) {
            return "We offer flexible pricing. You can subscribe monthly starting at $9.99 or buy credit packs as you go. Check out our Pricing page for more details."
        }
        if (lowerInput.includes("free") || lowerInput.includes("trial")) {
            return "Yes! You can explore all our tools and see examples for free. To generate your own content, you'll need credits, but we offer a trial for new users."
        }

        return "I'm here to help you create amazing content with AI. You can ask me about our Image, Story, Voice, or Animation tools, or how to get started!"
    }

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-colors border border-border",
                    isOpen ? "hidden" : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
            >
                <div className="relative">
                    <Bot className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                </div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary rounded-lg">
                                    <Bot className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Zestara Assistant</h3>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-background/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        message.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs",
                                        message.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                                    )}>
                                        {message.role === "user" ? "You" : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm",
                                        message.role === "user"
                                            ? "bg-secondary text-secondary-foreground rounded-br-none"
                                            : "bg-card border border-border rounded-bl-none"
                                    )}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-primary-foreground" />
                                    </div>
                                    <div className="bg-card border border-border p-4 rounded-xl rounded-bl-none flex gap-1">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-card">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSendMessage()
                                }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about Zestara tools..."
                                    className="w-full pr-12 pl-4 py-3 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
