// src/app/layout.tsx
"use client"; // 1. Convert to a Client Component to use hooks

import type { Metadata } from "next";
import { Montserrat, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider, useCart } from "./contexts/CartContext"; // 2. Import useCart
import CartSidePanel from "@/components/CartSidePanel";

// Font configurations remain the same
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

// Since this is a client component, we can't export metadata directly.
// This is a known pattern for Next.js 14 App Router.
// For our project, we can keep the static metadata in a wrapper.
export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${merriweather.variable} bg-off-white text-charcoal font-merriweather dark:bg-charcoal dark:text-off-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <AppContent>{children}</AppContent>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// 3. Create an inner component to access the context
function AppContent({ children }: { children: React.ReactNode }) {
  const { isCartOpen } = useCart();

  return (
    <>
      {/* This wrapper div will get blurred */}
      <div
        className={`transition-all duration-300 ${isCartOpen ? "blur-sm" : ""}`}
      >
        <Header />
        <main>{children}</main>{" "}
        {/* Ensure children are wrapped in a main tag for semantics */}
        <Footer />
      </div>
      <CartSidePanel />
    </>
  );
}