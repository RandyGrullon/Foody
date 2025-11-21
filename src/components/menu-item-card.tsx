"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MenuItem } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PlusCircle, ShoppingCart } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart, cartItems } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === item.image);
  
  // Check if item is in cart and get quantity
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="h-full">
      <Card className="group flex flex-col overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <Link href={`/dishes/${item.id}`} className="relative aspect-[4/3] overflow-hidden cursor-pointer">
          {image && (
            <Image
              src={image.imageUrl}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {!item.isAvailable && (
            <Badge variant="destructive" className="absolute top-3 right-3 shadow-sm">
              Unavailable
            </Badge>
          )}
          {/* Cart Quantity Badge */}
          {quantityInCart > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 shadow-lg bg-secondary text-secondary-foreground font-bold flex items-center gap-1 animate-in zoom-in"
            >
              <ShoppingCart className="h-3 w-3" />
              {quantityInCart}
            </Badge>
          )}
        </Link>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Link href={`/dishes/${item.id}`} className="hover:underline decoration-primary underline-offset-4">
              <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {item.name}
              </CardTitle>
            </Link>
            <span className="text-lg font-bold text-primary">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <CardDescription className="line-clamp-2 text-muted-foreground/80">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <CardFooter className="pt-0 gap-2">
          <Button
            asChild
            variant="outline"
            disabled={!item.isAvailable}
            className="flex-1 font-semibold h-10 rounded-full border-primary text-primary hover:bg-primary/10"
          >
            <Link href={`/dishes/${item.id}`}>
              Customize
            </Link>
          </Button>
          <Button
            onClick={() => addToCart(item)}
            disabled={!item.isAvailable}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all h-10 rounded-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {quantityInCart > 0 ? `Add (${quantityInCart})` : "Add"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
