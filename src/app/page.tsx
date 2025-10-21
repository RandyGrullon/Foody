"use client";

import { categories, menuItems } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import Link from "next/link";
import { Search } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export default function Home() {
  const { cartItems, itemCount, updateQuantity, removeFromCart } = useCart();

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image
      ? image.imageUrl
      : "https://picsum.photos/seed/placeholder/100/100";
  };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container py-16 max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
            IKEA Eats
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh, simple, and delightful Swedish food — order for pickup or
            create your own custom dish.
          </p>
        </header>

        <div className="flex items-center gap-3 max-w-2xl mx-auto mb-10">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search dishes, ingredients or categories"
              className="w-full rounded-full border border-input bg-white/60 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Search className="absolute left-4 top-3.5 text-muted-foreground" />
          </div>
          <Link href="/create-dish" className="hidden sm:inline-block">
            <button className="px-4 py-3 bg-primary text-primary-foreground rounded-lg">
              Create Dish
            </button>
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Featured categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`#${c.id}`}
                className="rounded-lg p-4 bg-card hover:shadow-md border"
              >
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Explore {c.name.toLowerCase()}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Saved Items Section */}
        {cartItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Saved Items</h2>
              <Link href="#cart">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart ({itemCount})
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.slice(0, 6).map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] w-full bg-muted/20">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 backdrop-blur"
                      >
                        {item.quantity}x
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {cartItems.length > 6 && (
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  And {cartItems.length - 6} more items in your cart
                </p>
              </div>
            )}
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-6">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
