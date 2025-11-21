"use client";

import { useState } from "react";
import { useCartSidebar } from "@/hooks/use-cart-sidebar";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { CartSidebar } from "@/components/cart-sidebar";
import { FloatingCartButton } from "@/components/floating-cart-button";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useCartSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Main Content Area - shrinks when cart is open */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "mr-96" : "mr-0"
        }`}
      >
        <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <MobileSidebar open={mobileMenuOpen} setOpen={setMobileMenuOpen}>
          <main className="flex-1">{children}</main>
        </MobileSidebar>
      </div>

      {/* Cart Sidebar - fixed position */}
      <CartSidebar />
      
      {/* Floating Cart Button - mobile only */}
      <FloatingCartButton />
    </div>
  );
}
