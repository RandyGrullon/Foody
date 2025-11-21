"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, menuItems } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button as RawButton } from "@/components/ui/button";
import { X, Minus, Plus, Search } from "lucide-react";

// Get image URL from placeholder images
const getImageUrl = (imageKey: string): string | null => {
  const placeholder = PlaceHolderImages.find((img) => img.id === imageKey);
  return placeholder ? placeholder.imageUrl : null;
};

export function CustomDishBlock() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    { id: string; quantity: number }[]
  >([]);

  const filteredItems = useMemo(
    () =>
      menuItems.filter(
        (item) =>
          (category === "" || item.category === category) &&
          (search === "" ||
            item.name.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, category]
  );

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        // Remove if quantity would become 0
        if (existing.quantity <= 1) {
          return prev.filter((item) => item.id !== id);
        }
        // Decrease quantity
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prev, { id, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setSelectedItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const { addToCart } = useCart();

  const total = useMemo(() => {
    return selectedItems.reduce((sum, selectedItem) => {
      const item = menuItems.find((i) => i.id === selectedItem.id);
      return sum + (item ? item.price * selectedItem.quantity : 0);
    }, 0);
  }, [selectedItems]);

  const router = useRouter();

  const handlePrepareDish = () => {
    if (selectedItems.length === 0) return;
    const items = selectedItems
      .map((selectedItem) => {
        const item = menuItems.find((i) => i.id === selectedItem.id);
        return item ? { ...item, quantity: selectedItem.quantity } : null;
      })
      .filter(Boolean) as ((typeof menuItems)[0] & { quantity: number })[];

    const price = items.reduce((s, it) => s + it.price * it.quantity, 0);
    const tax = price * 0.08;
    const totalWithTax = price + tax;

    const orderId = `order-${Date.now()}`;
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();

    const order = {
      id: orderId,
      code,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      subtotal: price,
      tax,
      total: totalWithTax,
      status: "pending",
      createdAt: new Date().toISOString(),
    } as any;

    // Save temporary order for checkout
    try {
      localStorage.setItem("ikea-eats-order", JSON.stringify(order));
    } catch (e) {
      console.error("failed saving order", e);
    }

    // Navigate to checkout to complete payment
    router.push("/checkout");
  };

  const [toRemoveId, setToRemoveId] = useState<string | null>(null);

  const confirmRemove = (id: string) => {
    setToRemoveId(id);
  };

  const doRemove = () => {
    if (!toRemoveId) return;
    setSelectedItems((prev) => prev.filter((item) => item.id !== toRemoveId));
    setToRemoveId(null);
  };

  const cancelRemove = () => setToRemoveId(null);

  return (
    <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b bg-muted/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Ingredient Selection
            </h2>
            <p className="text-muted-foreground">
              Choose ingredients to build your custom dish
            </p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 px-3 py-2 text-sm border border-input bg-background/50 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring min-w-[160px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-300px)] min-h-[600px]">
        {/* Ingredients Grid */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const selectedItem = selectedItems.find((s) => s.id === item.id);
              const isSelected = !!selectedItem;
              return (
                <Card
                  key={item.id}
                  className={`group overflow-hidden cursor-pointer transition-all duration-300 border-none shadow-md hover:shadow-xl ${
                    isSelected
                      ? "ring-4 ring-secondary shadow-xl bg-secondary/5 scale-[1.02]"
                      : "bg-card border border-border/50 hover:border-primary/50"
                  }`}
                  onClick={() => toggleSelectItem(item.id)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {getImageUrl(item.image) ? (
                      <Image
                        src={getImageUrl(item.image)!}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-full text-muted-foreground">
                                <div class="text-center">
                                  <div class="text-2xl mb-1">📷</div>
                                  <div class="text-xs">Image unavailable</div>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/30">
                        <div className="text-center">
                          <div className="text-2xl mb-1">📷</div>
                          <div className="text-xs">No image</div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white rounded-full px-3 py-1 text-xs font-medium">
                      {item.category}
                    </div>
                    <div
                      className={`absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${
                        item.isAvailable
                          ? "bg-green-500/90 text-white"
                          : "bg-red-500/90 text-white"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Sold out"}
                    </div>
                    {isSelected && (
                      <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-in zoom-in">
                        {selectedItem.quantity}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-base font-bold text-primary shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary Panel */}
        <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l bg-muted/10 backdrop-blur-sm flex flex-col">
          <div className="p-6 flex-1 overflow-hidden flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <p className="text-sm text-muted-foreground">Review your selected ingredients</p>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
              <div className="space-y-3">
                {selectedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground border-2 border-dashed rounded-xl">
                    <Search className="w-8 h-8 mb-2 opacity-50" />
                    <p>No ingredients selected</p>
                  </div>
                ) : (
                  selectedItems.map((selectedItem) => {
                    const item = menuItems.find(
                      (i) => i.id === selectedItem.id
                    );
                    return item ? (
                      <div
                        key={selectedItem.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/80 backdrop-blur-sm border shadow-sm group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-background shadow-sm rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(
                                  selectedItem.id,
                                  selectedItem.quantity - 1
                                );
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-6 text-center">
                              {selectedItem.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-background shadow-sm rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(
                                  selectedItem.id,
                                  selectedItem.quantity + 1
                                );
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-sm font-bold w-14 text-right">
                            $
                            {(item.price * selectedItem.quantity).toFixed(
                              2
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmRemove(selectedItem.id);
                            }}
                            className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : null;
                  })
                )}
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="mt-6 pt-6 border-t bg-background/50 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-medium">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">
                      ${(total * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-dashed">
                    <span>Total</span>
                    <span className="text-primary">${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full font-bold shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onClick={handlePrepareDish}
                >
                  Add Custom Dish to Order
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
      {/* Confirmation dialog for removing an ingredient */}
      <Dialog
        open={!!toRemoveId}
        onOpenChange={(open) => {
          if (!open) cancelRemove();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Ingredient</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this ingredient from your
              selection?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={cancelRemove}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={doRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
