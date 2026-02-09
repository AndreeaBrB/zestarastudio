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
            content: "Hi there! I'm Zestie, your AI training buddy. 🎓✨ I can help you master the latest AI tools, catch up on news, or explore my merchandise! How can I help you learn today?"
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

        if (lowerInput.includes("shop") || lowerInput.includes("merch") || lowerInput.includes("buy")) {
            return "Check out my Zastara AI Merchandise section on the homepage! I've got hoodies, t-shirts, caps, and mugs. You can add items directly to your cart and checkout whenever you're ready."
        }
        if (lowerInput.includes("name") || lowerInput.includes("origin") || lowerInput.includes("meaning") || lowerInput.includes("zastara mean")) {
            return "Ah, the legend! Zastara AI was born during a late-night coding session when my founder tried to type 'Zesty Star AI', but a coffee spill hit the 'A' key. ZAST stands for Magic and ARA stands for Spark! Together, Zastara is the 'Magic Spark' of innovation that makes AI feel like wizardry. It also stands for: Zany Artificial Souls Training Awesome Robot Apprentices!"
        }
        if (lowerInput.includes("tutorial") || lowerInput.includes("learn") || lowerInput.includes("how to")) {
            return "You can find all my training guides in the Tutorials Hub! I cover everything from Midjourney to AI Video. Just click 'Tutorials' in the navbar to start your journey."
        }
        if (lowerInput.includes("news") || lowerInput.includes("update") || lowerInput.includes("latest")) {
            return "My AI News Hub is updated daily with the most important magic from the world of AI. Check it out at /news to see what the robots are up to today!"
        }
        if (lowerInput.includes("youtube") || lowerInput.includes("video")) {
            return "I have a dedicated YouTube channel where I post deep dives into new AI tools. You can watch them directly in my Tutorials section or subscribe to me on YouTube!"
        }
        if (lowerInput.includes("prompt") || lowerInput.includes("genie") || lowerInput.includes("generator")) {
            return "The Prompt Genie is our free tool to help you write perfect AI prompts. Just enter a basic idea, and Zastara will turn it into a high-quality prompt for Midjourney, ChatGPT, or DALL-E."
        }
        if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("subscription")) {
            return "Learning is free at Zastara! Our Tutorials and News are open to everyone. For merchandise, you can see specific pricing for each item in our Shop section."
        }

        return "I'm Zestie, your AI training buddy! I can tell you about my Tutorials, Daily AI News, or my new Merchandise collection. What would you like to explore?"
    }

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 p-0 rounded-full shadow-lg transition-colors border-2 border-primary/20 bg-background overflow-hidden w-16 h-16",
                    isOpen ? "hidden" : "block"
                )}
            >
                <div className="relative w-full h-full">
                    <img src="/robot-cool.png" alt="Zastara Bot" className="object-cover w-full h-full scale-110" />
                    <span className="absolute bottom-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
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
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-violet-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary overflow-hidden border border-white/20">
                                    <img src="/robot-mascot.png" alt="Zastara" className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Zastara Bot</h3>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                                        FULLY CHARGED
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
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
                                        "w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10",
                                        message.role === "user" ? "bg-secondary" : "bg-primary"
                                    )}>
                                        {message.role === "user" ? (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] font-black">U</div>
                                        ) : (
                                            <img src="/robot-cool.png" alt="Bot" className="object-cover w-full h-full" />
                                        )}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-white/5 border border-white/10 rounded-bl-none shadow-sm"
                                    )}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary border border-white/10">
                                        <img src="/robot-studying.png" alt="Thinking" className="object-cover w-full h-full" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl rounded-bl-none flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
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
                                    placeholder="Need some magic?"
                                    className="w-full pr-12 pl-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
