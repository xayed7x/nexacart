// src/components/CartItemDisplay.tsx
"use client";

import { CartItem, useCart } from "@/app/contexts/CartContext";

interface CartItemDisplayProps {
  item: CartItem;
}

export default function CartItemDisplay({ item }: CartItemDisplayProps) {
  // 1. Get the new quantity functions from the context
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="flex w-full items-start space-x-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-charcoal dark:text-off-white">
            <h3>{item.name}</h3>
            {/* Display the total price for the line item */}
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* 2. Add the quantity adjustment controls */}
          <div className="flex items-center border border-soft-grey dark:border-gray-600 rounded-sm">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-2 py-1 text-lg text-charcoal dark:text-off-white hover:bg-soft-grey dark:hover:bg-gray-700"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <p className="px-3 py-1 text-charcoal dark:text-soft-grey">
              {item.quantity}
            </p>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-2 py-1 text-lg text-charcoal dark:text-off-white hover:bg-soft-grey dark:hover:bg-gray-700"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-mocha-mousse hover:text-red-500 dark:hover:text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
