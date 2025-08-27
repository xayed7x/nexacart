// src/components/Header.tsx
'use client';

import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/app/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { cartItems, openCart } = useCart();

  return (
    <header className="border-b bg-off-white border-soft-grey sticky top-0 z-50 dark:bg-charcoal dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo for ecom.jpg"
                alt="NexaCart logo"
                width={100}
                height={100}
                className="h-10 w-auto"
              />
              <span className="font-montserrat text-2xl font-extrabold text-charcoal dark:text-off-white">
                NexaCart
              </span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            <a
              href="/category/clothing"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Clothing
            </a>
            <a
              href="/category/electronics"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Electronics
            </a>
            <a
              href="/category/accessories"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Accessories
            </a>
            <a
              href="/category/perfumes"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Perfumes
            </a>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white">
              {/* Search Icon SVG */}
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white">
              {/* User Icon SVG */}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            {/* 1. Add 'relative' to the button for positioning the badge */}
            <button
              onClick={openCart}
              className="relative text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              {/* Cart Icon SVG */}
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {/* 2. Style the cart count as a badge */}
              {cartItems.length > 0 && (
                 <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-mocha-mousse text-off-white text-xs font-bold rounded-full">
                   {cartItems.length}
                 </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}