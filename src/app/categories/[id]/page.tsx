"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { categories, menuItems } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name");
  const [isLoaded, setIsLoaded] = useState(false);

  // Find the category
  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    if (!category) {
      notFound();
    } else {
      setIsLoaded(true);
    }
  }, [category]);

  if (!category || !isLoaded) return null;

  // Filter items by category
  const categoryItems = menuItems.filter((item) => item.category === categoryId);

  // Sort items
  const sortedItems = [...categoryItems].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Get gradient colors based on category
  const getGradientColors = (id: string) => {
    if (id === "breakfast") return "from-orange-400 to-yellow-500";
    if (id === "lunch-dinner") return "from-blue-500 to-indigo-600";
    return "from-pink-500 to-rose-600";
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(categoryId)}`} />
        
        <div className="relative z-20 container h-full flex flex-col justify-center max-w-7xl mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-6 w-fit text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-3xl space-y-4">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-1 text-sm mb-4 font-bold">
              {categoryItems.length} {categoryItems.length === 1 ? 'dish' : 'dishes'}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-white drop-shadow-2xl">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-md">
              Discover our delicious {category.name.toLowerCase()} selection
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-b sticky top-0 z-30 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Browse {category.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'} available
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "name" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSortBy("name")}
                >
                  Name
                </Button>
                <Button
                  variant={sortBy === "price-low" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSortBy("price-low")}
                >
                  Price: Low to High
                </Button>
                <Button
                  variant={sortBy === "price-high" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSortBy("price-high")}
                >
                  Price: High to Low
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          {sortedItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Items Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any items in this category. Check back soon or explore other categories.
              </p>
              <Link href="/">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Explore Other Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories
              .filter((c) => c.id !== categoryId)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/1] cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(c.id)}`} />
                  
                  <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                      {c.name}
                    </h3>
                    <span className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Explore {c.name.toLowerCase()}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
