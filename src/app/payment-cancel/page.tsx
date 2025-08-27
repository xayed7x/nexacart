// src/app/payment-cancel/page.tsx
"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-charcoal/80 dark:text-off-white/80 mb-8">
          Your payment process was cancelled. Your cart has been saved if you&apos;d
          like to try again.
        </p>

        <Link
          href="/checkout"
          className="text-mocha-mousse hover:underline font-bold uppercase tracking-wider"
        >
          Return to Checkout
        </Link>
      </div>
    </main>
  );
}
