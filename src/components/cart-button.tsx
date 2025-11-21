"use client";

import { useCartSidebar } from "@/hooks/use-cart-sidebar";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
  const { toggleCart } = useCartSidebar();
  const { itemCount } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCart}
      className="relative text-muted-foreground hover:text-primary"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge
          variant="secondary"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
