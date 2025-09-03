'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { CartProvider, useCart } from './contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidePanel from '@/components/CartSidePanel';

function AppContent({ children }: { children: React.ReactNode }) {
  const { isCartOpen } = useCart();

  return (
    <>
      <div className={`transition-all duration-300 ${isCartOpen ? 'blur-sm' : ''}`}>
        <Header />
        <main className="mt-0 pt-0">{children}</main>
        <Footer />
      </div>
      <CartSidePanel />
    </>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        <AppContent>{children}</AppContent>
      </CartProvider>
    </ThemeProvider>
  );
}
