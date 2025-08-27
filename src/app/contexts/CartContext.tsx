// src/app/contexts/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Type Definitions
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 1. Update the Context Type
interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isInitialLoad: boolean; // Add new state
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 2. Initialize new state

  // Load cart from localStorage
  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      setCartItems(JSON.parse(items));
    }
    setIsInitialLoad(false); // 3. Set to false after first load attempt
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    // Prevent overwriting on initial load before hydration is complete
    if (!isInitialLoad) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialLoad]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (itemToAdd: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
    openCart();
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);
      if (existingItem?.quantity === 1) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // 4. Add the new state to the context value
  const value = {
    cartItems,
    isCartOpen,
    isInitialLoad,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
