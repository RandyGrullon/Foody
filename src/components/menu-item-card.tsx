"use client";

import Image from "next/image";
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
import { PlusCircle } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === item.image);

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="relative">
        {image && (
          <Image
            src={image.imageUrl}
            alt={item.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        {!item.isAvailable && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Unavailable
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-bold text-foreground">
          ${item.price.toFixed(2)}
        </p>
        <Button
          onClick={() => addToCart(item)}
          disabled={!item.isAvailable}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
