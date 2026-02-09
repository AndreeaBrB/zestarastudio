import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AIChatbot } from "@/components/ai-chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zastara - AI Education & Merch",
  description: "Learn AI mastery and shop exclusive AI-inspired merchandise.",
  keywords: ["AI", "AI Education", "Merchandise", "Zastara AI", "Learn AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#901bf9', // Electric Purple
          colorBackground: '#110e16', // Deep Dark Purple
          colorText: '#f8fafc', // White/Off-white
          colorInputBackground: '#1e1b29', // Card Background
          colorInputText: '#fff',
          colorTextSecondary: '#94a3b8',
        },
        elements: {
          card: {
            boxShadow: '0 8px 32px 0 rgba(144, 27, 249, 0.1)',
            border: '1px solid rgba(144, 27, 249, 0.2)',
          },
          formButtonPrimary: {
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: '#901bf9',
            "&:hover": {
              backgroundColor: '#7a12d4',
            },
          },
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative overflow-x-hidden`}
        >
          {/* Animated Stars Background */}
          {/* Animated Stars Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[200vh] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat"></div>
          </div>

          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <AIChatbot />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
