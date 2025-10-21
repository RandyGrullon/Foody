"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartSheet() {
  const { cartItems, itemCount, cartTotal, updateQuantity, removeFromCart } = useCart();

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/100/100';
  };
   const getImageHint = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageHint : 'food';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" id="cart-icon-button">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              variant="solid"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-accent text-accent-foreground justify-center p-0"
            >
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                      data-ai-hint={getImageHint(item.image)}
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto pt-4">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <SheetTrigger asChild>
                  <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetTrigger>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-muted-foreground">Add items from the menu to get started.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
