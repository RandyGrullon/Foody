"use client";

import { useCartSidebar } from "@/hooks/use-cart-sidebar";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export function FloatingCartButton() {
  const { toggleCart } = useCartSidebar();
  const { itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <Button
      onClick={toggleCart}
      size="lg"
      className="md:hidden fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-3 -right-3 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold rounded-full"
          >
            {itemCount}
          </Badge>
        )}
      </div>
    </Button>
  );
}
