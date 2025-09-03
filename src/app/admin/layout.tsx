"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="font-montserrat min-h-screen bg-off-white text-charcoal">

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
className={`fixed md:relative top-0 left-0 h-full w-64 bg-charcoal text-off-white flex flex-col p-4 transform transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <h1 className="text-2xl font-bold font-merriweather mb-8 md:block hidden">
            NexaCart Admin
          </h1>
          <nav>
            <ul>
              <li className="mb-2">
                <Link
                  href="/admin"
                  className="block py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
                  onClick={() => setIsSidebarOpen(false)} // Add back onClick
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/orders"
                  className="block py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
                  onClick={() => setIsSidebarOpen(false)} // Add back onClick
                >
                  Orders
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/admin/products"
                  className="block py-2 px-4 rounded transition-colors duration-200 hover:bg-mocha-mousse"
                  onClick={() => setIsSidebarOpen(false)} // Add back onClick
                >
                  Products
                </Link>
              </li>
              {/* Future links will go here */}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col">
          {/* Persistent Header */}
          <header className="flex items-center justify-between p-4 bg-white shadow-md z-10 h-16">
            {/* Mobile Hamburger Button */}
            <button
              className="p-2 focus:outline-none md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6 text-charcoal" />
            </button>
            {/* Desktop Title */}
            <h1 className="text-xl font-bold text-charcoal">Admin</h1>
          </header>

          {/* Scrollable Content Area */}
          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
