'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { CartProvider, useCart } from './contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSidePanel from '@/components/CartSidePanel';

function AppContent({ children, users }: { children: React.ReactNode; users: { id: number; name: string }[] }) {
  const { isCartOpen } = useCart();

  return (
    <>
      <div className={`transition-all duration-300 ${isCartOpen ? 'blur-sm' : ''}`}>
        <Header users={users} />
        <main>{children}</main>
        <Footer />
      </div>
      <CartSidePanel />
    </>
  );
}

export function AppProviders({ children, users }: { children: React.ReactNode; users: { id: number; name: string }[] }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        <AppContent users={users}>{children}</AppContent>
      </CartProvider>
    </ThemeProvider>
  );
}
