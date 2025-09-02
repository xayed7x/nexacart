// src/components/Header.tsx
'use client';

import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/app/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { switchUser } from '@/app/_actions/auth';
import SearchController from './SearchController';


export default function Header({ currentUserId, users }: { currentUserId: number | null; users: { id: number; name: string }[] }) {
  const { cartItems, openCart } = useCart();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    startTransition(async () => { // Make async to await switchUser
      await switchUser(userId); // Await the server action

      const selectedUser = users.find(user => user.id.toString() === userId);

      if (selectedUser) {
        if (selectedUser.id === 2) { // Admin user ID
          router.push('/admin');
        } else { // Regular customer
          router.push('/my-orders');
        }
      } else { // Guest user
        router.push('/'); // Redirect to home page for guest
      }
    });
  };

  

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
            <Link
              href="/category/clothing"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Clothing
            </Link>
            <Link
              href="/category/electronics"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Electronics
            </Link>
            <Link
              href="/category/accessories"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Accessories
            </Link>
            <Link
              href="/category/perfumes"
              className="font-montserrat font-bold text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white"
            >
              Perfumes
            </Link>
            
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SearchController />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="text-charcoal hover:text-mocha-mousse transition-colors dark:text-off-white">
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
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-charcoal dark:ring-gray-700">
                  <div className="py-1">
                    {currentUserId === null ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#" // Placeholder for Sign In
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                          >
                            Sign In
                          </a>
                        )}
                      </Menu.Item>
                    ) : (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/my-orders"
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block px-4 py-2 text-sm`}
                            >
                              My Orders
                            </Link>
                          )}
                        </Menu.Item>
                        {currentUserId === 2 && ( // Admin user ID
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/admin"
                                className={`${
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } block px-4 py-2 text-sm`}
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => { /* Sign Out action */ }} // Placeholder for Sign Out
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block w-full text-left px-4 py-2 text-sm`}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}

                    {/* Mock User Switcher (Developer Only) */}
                    <div className="border-t border-gray-200 my-1 pt-1">
                      <div className="px-4 py-2 text-xs text-gray-500">
                        Mock User Switcher (Dev Only)
                      </div>
                      <div className="px-4 py-2">
                        <select
                          name="user"
                          id="user"
                          onChange={handleUserChange}
                          defaultValue={currentUserId || 'guest'}
                          disabled={isPending}
                          className="block w-full rounded-md border-gray-300 shadow-sm p-1 text-xs focus:ring-mocha-mousse focus:border-mocha-mousse dark:bg-gray-800 dark:text-off-white"
                        >
                          <option value="guest">Guest</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name} ({user.id === 2 ? 'Admin' : 'Customer'})
                            </option>
                          ))}
                        </select>
                        {isPending && <p className="mt-1 text-xs text-gray-500">Switching...</p>}
                      </div>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
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