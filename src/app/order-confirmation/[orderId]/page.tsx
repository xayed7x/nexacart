"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartItem } from "@/app/contexts/CartContext"; // Import the CartItem type
import Image from "next/image";

export default function OrderConfirmationPage() {
  const params = useParams();
  const { orderId } = params;

  // 1. Set up state to hold the confirmed order items
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);

  // 2. useEffect to safely access sessionStorage on the client side
  useEffect(() => {
    const data = sessionStorage.getItem("orderConfirmationData");
    if (data) {
      setConfirmedItems(JSON.parse(data));
      // Optional: Clear the session storage after reading it
      // sessionStorage.removeItem('orderConfirmationData');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const subtotal = confirmedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-[calc(100vh-5rem)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="font-montserrat text-4xl md:text-5xl font-extrabold text-charcoal dark:text-off-white mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-charcoal/80 dark:text-off-white/80 mb-6">
            Your order has been placed successfully.
          </p>
          <div className="bg-off-white dark:bg-charcoal shadow-sm rounded-sm p-6 mb-8 inline-block">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Your Order Number is:
            </p>
            <p className="font-mono text-2xl font-bold text-mocha-mousse">
              {orderId}
            </p>
          </div>
        </div>

        {/* 3. Display the confirmed order details */}
        <div className="bg-off-white dark:bg-charcoal shadow-sm rounded-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold font-montserrat text-charcoal dark:text-off-white border-b border-soft-grey dark:border-gray-700 pb-4 mb-4">
            Order Summary
          </h2>
          {confirmedItems.length > 0 ? (
            <>
              <ul className="divide-y divide-soft-grey dark:divide-gray-700">
                {confirmedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover mr-4"
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
              <div className="border-t border-soft-grey dark:border-gray-700 mt-4 pt-4 text-right">
                <div className="flex justify-end items-baseline font-bold text-lg">
                  <span className="mr-4">Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Loading order details...
            </p>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="text-mocha-mousse hover:underline font-bold uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
