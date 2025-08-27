// src/app/payment-success/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/CartContext";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // This effect runs once when the component mounts.
    // We assume that if the user reaches this page, the payment was successful.
    // The secure verification happens separately via the IPN.

    if (cartItems.length > 0) {
      // 1. Save the final cart state to sessionStorage for the confirmation page.
      sessionStorage.setItem(
        "orderConfirmationData",
        JSON.stringify(cartItems)
      );

      // 2. Clear the active cart.
      clearCart();

      // 3. Generate a random order ID for display.
      const orderId = `SSL_${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      // 4. Redirect to the final, generic order confirmation page.
      router.replace(`/order-confirmation/${orderId}`);
    } else {
      // If the cart is already empty, just show a generic success message.
      setIsProcessing(false);
    }
  }, [cartItems, clearCart, router]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        {isProcessing ? (
          <>
            <h1 className="font-montserrat text-3xl md:text-4xl font-extrabold text-charcoal dark:text-off-white mb-4">
              Finalizing Your Order...
            </h1>
            <p className="text-lg text-charcoal/80 dark:text-off-white/80">
              Your payment was successful. Please wait while we confirm your
              order details.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
              Payment Successful
            </h1>
            <p className="text-lg text-charcoal/80 dark:text-off-white/80 mb-6">
              Thank you for your order!
            </p>
            <Link
              href="/"
              className="text-mocha-mousse hover:underline font-bold uppercase tracking-wider"
            >
              Continue Shopping
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
