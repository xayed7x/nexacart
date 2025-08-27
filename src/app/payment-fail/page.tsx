// src/app/payment-fail/page.tsx
"use client";

import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-red-600 mb-4">
          Payment Failed
        </h1>
        <p className="text-lg text-charcoal/80 dark:text-off-white/80 mb-8">
          Unfortunately, we were unable to process your payment. Please try
          again or contact your bank for assistance.
        </p>

        <Link
          href="/checkout"
          className="text-mocha-mousse hover:underline font-bold uppercase tracking-wider"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
