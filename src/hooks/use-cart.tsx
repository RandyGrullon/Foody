"use client";

import type { CartItem, MenuItem } from "@/types";
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;
  cartId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    const jiggleCartIcon = () => {
      const cartIcon = document.getElementById('cart-icon-button');
      if (cartIcon) {
        cartIcon.classList.add('cart-jiggle');
        setTimeout(() => cartIcon.classList.remove('cart-jiggle'), 500);
      }
    };

    if (cartItems.length > (JSON.parse(sessionStorage.getItem('lastCartState') || '[]').length)) {
      jiggleCartIcon();
    }
    sessionStorage.setItem('lastCartState', JSON.stringify(cartItems));

  }, [cartItems]);

  useEffect(() => {
    // For this example, we'll generate a simple cartId on the client
    setCartId(`cart-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }, []);


  const addToCart = useCallback((item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: `${item.name} is now in your cart.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    cartTotal,
    cartId,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
