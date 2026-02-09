import { Plus } from "lucide-react"

const faqs = [
    {
        question: "What is Zestara?",
        answer: "Zestara is an all-in-one AI creative studio that helps you generate images, stories, voiceovers, and animations using advanced artificial intelligence models."
    },
    {
        question: "Is it free to use?",
        answer: "You can preview the tools and see examples for free. To generate content, you'll need credits. We offer a free trial amount for new users."
    },
    {
        question: "How do credits work?",
        answer: "Credits are the currency used to generate content. Different tools cost different amounts of credits (e.g., 2 credits for an image, 3 for a story). You can buy credit packs or subscribe for a monthly allowance."
    },
    {
        question: "Can I use the generated content commercially?",
        answer: "Yes! If you have a Pro subscription or purchase credit packs, you own full commercial rights to the content you generate."
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 7-day money-back guarantee for all subscription plans if you haven't used more than 10% of your credits."
    }
]

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-muted-foreground mb-12">Everything you need to know about Zastara.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg bg-card overflow-hidden">
                        <details className="group">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <span className="transition group-open:rotate-45">
                                    <Plus className="w-5 h-5 text-muted-foreground" />
                                </span>
                            </summary>
                            <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    )
}
