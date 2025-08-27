// src/components/StripeSuccess.tsx
"use client";

import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/CartContext";

export default function StripeSuccess() {
  const stripe = useStripe();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [message, setMessage] = useState("Processing your order...");

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");

    if (!stripe || !clientSecret) {
      return;
    }

    const processOrder = async () => {
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent?.status) {
        case "succeeded":
          sessionStorage.setItem(
            "orderConfirmationData",
            JSON.stringify(cartItems)
          );
          clearCart();
          const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
          router.replace(`/order-confirmation/${orderId}`);
          break;

        case "processing":
          setMessage(
            "Payment is processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          setMessage("Payment failed. Please try another payment method.");
          setTimeout(() => router.replace("/checkout"), 3000);
          break;

        default:
          setMessage("Something went wrong.");
          setTimeout(() => router.replace("/checkout"), 3000);
          break;
      }
    };

    processOrder();
  }, [stripe, searchParams, cartItems, clearCart, router]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="font-montserrat text-3xl md:text-4xl font-extrabold text-charcoal dark:text-off-white mb-4">
        Verifying Payment
      </h1>
      <p className="text-lg text-charcoal/80 dark:text-off-white/80">
        {message}
      </p>
    </div>
  );
}
