"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartSidebarContextType {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartSidebarContext = createContext<CartSidebarContextType | undefined>(undefined);

export function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartSidebarContext.Provider
      value={{
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </CartSidebarContext.Provider>
  );
}

export function useCartSidebar() {
  const context = useContext(CartSidebarContext);
  if (!context) {
    throw new Error("useCartSidebar must be used within CartSidebarProvider");
  }
  return context;
}
