// src/app/cart/page.tsx
"use client";

import { useCart } from "@/app/contexts/CartContext";
import Link from "next/link";
import CartItemDisplay from "@/components/CartItemDisplay";

export default function CartPage() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-8 text-center">
        Your Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List (Left/Main Column) */}
          <div className="lg:col-span-2">
            <div className="bg-off-white dark:bg-charcoal rounded-sm shadow-sm">
              <ul
                role="list"
                className="divide-y divide-soft-grey dark:divide-gray-700"
              >
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <CartItemDisplay item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary (Right/Side Column) */}
          <div className="lg:col-span-1">
            <div className="bg-off-white dark:bg-charcoal rounded-sm shadow-sm p-6 sticky top-28">
              <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white border-b border-soft-grey dark:border-gray-700 pb-4">
                Order Summary
              </h2>
              <div className="py-4 space-y-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Shipping and taxes will be calculated at the next step.
                </p>
              </div>
              {/* 1. Wrap the button with a Link component */}
              <Link href="/checkout" passHref>
                <button className="w-full mt-4 bg-mocha-mousse text-off-white font-montserrat font-bold py-3 px-6 rounded-sm uppercase tracking-wider hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="text-mocha-mousse hover:underline font-bold uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </main>
  );
}
