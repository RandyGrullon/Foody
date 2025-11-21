"use client";

import { useState } from "react";
import { categories, menuItems } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import Link from "next/link";
import { Search } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useCartSidebar } from "@/hooks/use-cart-sidebar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export default function Home() {
  const { cartItems, itemCount, updateQuantity, removeFromCart } = useCart();
  const { openCart } = useCartSidebar();
  const [menuFilter, setMenuFilter] = useState<string>("all");

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image
      ? image.imageUrl
      : "https://picsum.photos/seed/placeholder/100/100";
  };

  // Filter menu items based on selected category
  const filteredMenuItems = menuFilter === "all" 
    ? menuItems 
    : menuItems.filter(item => {
        if (menuFilter === "main-courses") {
          return item.category === "lunch-dinner" || item.category === "breakfast";
        }
        if (menuFilter === "desserts") {
          return item.category === "desserts-pastries";
        }
        return true;
      });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="Hero Food"
          fill
          className="object-cover animate-in fade-in duration-1000"
          priority
        />
        <div className="relative z-20 container h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
          <div className="max-w-3xl space-y-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
            <Badge className="bg-secondary text-secondary-foreground px-4 py-1 text-sm mb-4 border-none shadow-lg font-bold">
              New Seasonal Menu
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
              Taste the <br />
              <span className="text-secondary">Extraordinary</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-md">
              Fresh, simple, and delightful Swedish food — order for pickup or
              create your own custom dish today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <div className="relative w-full max-w-md group">
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-white rounded-full border border-border p-1 shadow-xl transition-all focus-within:ring-2 focus-within:ring-secondary">
                  <Search className="ml-4 text-muted-foreground h-5 w-5" />
                  <input
                    type="search"
                    placeholder="Search dishes, ingredients..."
                    className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:outline-none px-4 py-3 text-lg"
                  />
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 mr-1 shadow-md">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Link href="/create-dish">
                <Button size="lg" className="rounded-full px-8 h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-xl hover:shadow-2xl transition-all text-lg">
                  Create Your Own Dish
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/categories/${c.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-[2/1] cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                 {/* Placeholder backgrounds for categories - ideally these would be dynamic */}
                <div className={`absolute inset-0 bg-gradient-to-br ${c.id === 'breakfast' ? 'from-orange-400 to-yellow-500' : c.id === 'lunch-dinner' ? 'from-blue-500 to-indigo-600' : 'from-pink-500 to-rose-600'}`} />
                
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">{c.name}</h3>
                  <span className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explore {c.name.toLowerCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Items Section */}
      {cartItems.length > 0 && (
        <section className="py-16 bg-muted/30 border-y border-border/50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Your Saved Items</h2>
                <p className="text-muted-foreground mt-1">Pick up where you left off</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full bg-background shadow-sm"
                onClick={openCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart ({itemCount})
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.slice(0, 6).map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow border-none bg-background"
                >
                  <div className="relative aspect-[4/3] w-full">
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
                        className="bg-white/90 backdrop-blur text-black font-bold shadow-sm"
                      >
                        {item.quantity}x
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-white shadow-sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-white shadow-sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Menu</h2>
              <p className="text-muted-foreground mt-1">Explore our delicious Swedish specialties</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
               <Button 
                 variant={menuFilter === "all" ? "secondary" : "ghost"} 
                 size="sm" 
                 className="rounded-full"
                 onClick={() => setMenuFilter("all")}
               >
                 All
               </Button>
               <Button 
                 variant={menuFilter === "main-courses" ? "secondary" : "ghost"} 
                 size="sm" 
                 className="rounded-full"
                 onClick={() => setMenuFilter("main-courses")}
               >
                 Main Courses
               </Button>
               <Button 
                 variant={menuFilter === "desserts" ? "secondary" : "ghost"} 
                 size="sm" 
                 className="rounded-full"
                 onClick={() => setMenuFilter("desserts")}
               >
                 Desserts
               </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
