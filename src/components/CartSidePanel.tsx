// src/components/CartSidePanel.tsx
"use client";

import { useCart } from "@/app/contexts/CartContext";
import CartItemDisplay from "./CartItemDisplay";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link"; // 1. Import the Link component

export default function CartSidePanel() {
  const { isCartOpen, closeCart, cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Panel */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-off-white dark:bg-charcoal shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="font-montserrat text-2xl font-bold text-charcoal dark:text-off-white">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {cartItems.length > 0 ? (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-soft-grey dark:divide-gray-700"
                          >
                            {cartItems.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <CartItemDisplay item={item} />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-center text-charcoal dark:text-soft-grey">
                            Your cart is currently empty.
                          </p>
                        )}
                      </div>
                    </div>

                    {cartItems.length > 0 && (
                      <div className="border-t border-soft-grey dark:border-gray-700 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-lg font-bold font-montserrat text-charcoal dark:text-off-white">
                          <p>Subtotal</p>
                          <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          {/* 2. Update the 'a' tag to be a Next.js Link */}
                          <Link
                            href="/cart"
                            className="flex items-center justify-center rounded-sm border border-transparent bg-mocha-mousse px-6 py-3 text-base font-bold text-off-white shadow-sm hover:bg-charcoal dark:hover:bg-off-white dark:hover:text-charcoal transition-colors duration-300"
                            onClick={closeCart} // Also close the panel when navigating
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-mocha-mousse hover:text-charcoal dark:hover:text-amber-200"
                              onClick={closeCart}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
