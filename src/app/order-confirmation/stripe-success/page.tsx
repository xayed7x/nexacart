// src/app/order-confirmation/stripe-success/page.tsx
"use client";

import { Suspense } from "react";
import StripeProvider from "@/components/StripeProvider";
import StripeSuccess from "@/components/StripeSuccess";

export default function StripeSuccessPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <StripeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <StripeSuccess />
        </Suspense>
      </StripeProvider>
    </main>
  );
}
