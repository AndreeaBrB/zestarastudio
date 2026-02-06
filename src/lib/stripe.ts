import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
    typescript: true,
})

// Credit costs for each module
export const CREDIT_COSTS = {
    IMAGE_GENERATION: 2,      // Per image generated
    STORY_GENERATION: 3,      // Per story generated
    VOICE_NARRATION: 2,       // Per minute of audio
    ANIMATION: 5,             // Per animation clip
    MUSIC_GENERATION: 3,      // Per track generated
}

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
    STARTER: {
        name: 'Starter',
        credits: 100,
        priceMonthly: 999, // $9.99 in cents
    },
    PRO: {
        name: 'Pro',
        credits: 500,
        priceMonthly: 2999, // $29.99 in cents
    },
}

// Credit pack options
export const CREDIT_PACKS = [
    { credits: 50, price: 499 },   // $4.99
    { credits: 100, price: 899 },  // $8.99
    { credits: 250, price: 1999 }, // $19.99
]
