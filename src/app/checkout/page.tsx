// src/app/checkout/page.tsx
"use client";

import { useCart } from "@/app/contexts/CartContext";
import StripeProvider from "@/components/StripeProvider";
import CheckoutForm from "@/components/CheckoutForm";
import { useEffect, useState } from "react"; // 1. Import useEffect and useState
import { useRouter } from "next/navigation";
import { StripeElementsOptions } from "@stripe/stripe-js";

export default function CheckoutPage() {
  const { cartItems, isInitialLoad } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (subtotal > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: subtotal * 100, currency: "usd" }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to create Payment Intent");
          }
          return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => setError(error.message));
    }
  }, [subtotal]);

  useEffect(() => {
    if (!isInitialLoad) {
      if (cartItems.length === 0) {
        router.replace("/cart");
      }
    }
  }, [isInitialLoad, cartItems, router]);

  const options: StripeElementsOptions = { clientSecret };

  if (error) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)] text-center">
        <p className="text-red-600">Error: {error}</p>
        <p>There was an issue initializing the payment form. Please check your Stripe configuration.</p>
      </main>
    );
  }

  if (isInitialLoad || (cartItems.length > 0 && !clientSecret)) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)] text-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-8 text-center">
        Checkout
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Shipping & Payment Forms */}
        <div>
          {/* 6. Wrap CheckoutForm with StripeProvider and pass options */}
          <StripeProvider options={options} key={clientSecret}>
            <CheckoutForm cartItems={cartItems} />
          </StripeProvider>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-off-white dark:bg-charcoal rounded-sm shadow-sm p-6">
            <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white border-b border-soft-grey dark:border-gray-700 pb-4 mb-4">
              Your Order
            </h2>
            <ul className="divide-y divide-soft-grey dark:divide-gray-700">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover mr-4"
                    />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-soft-grey dark:border-gray-700 mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

