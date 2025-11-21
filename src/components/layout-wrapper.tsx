"use client";

import { useCartSidebar } from "@/hooks/use-cart-sidebar";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { CartSidebar } from "@/components/cart-sidebar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = useCartSidebar();

  return (
    <div className="flex min-h-screen">
      {/* Main Content Area - shrinks when cart is open */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "mr-96" : "mr-0"
        }`}
      >
        <Header />
        <MobileSidebar>
          <main className="flex-1">{children}</main>
        </MobileSidebar>
      </div>

      {/* Cart Sidebar - fixed position */}
      <CartSidebar />
    </div>
  );
}
