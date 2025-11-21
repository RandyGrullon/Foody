"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Minus, Plus, ShoppingCart, Info, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for extras/add-ons
const MOCK_EXTRAS = [
  { id: "ex-1", name: "Extra Lingonberry Jam", price: 0.50 },
  { id: "ex-2", name: "Cream Sauce", price: 0.75 },
  { id: "ex-3", name: "Mashed Potatoes", price: 1.50 },
  { id: "ex-4", name: "Fountain Drink", price: 1.25 },
];

const MOCK_NUTRITION = {
  calories: 450,
  protein: "24g",
  carbs: "32g",
  fat: "18g",
};

export default function DishDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const item = menuItems.find((i) => i.id === id);

  useEffect(() => {
    if (!item) {
      notFound();
    } else {
      setIsLoaded(true);
    }
  }, [item]);

  if (!item || !isLoaded) return null;

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageUrl : "";
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotal = () => {
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = MOCK_EXTRAS.find((e) => e.id === extraId);
      return sum + (extra ? extra.price : 0);
    }, 0);
    return (item.price + extrasTotal) * quantity;
  };

  const handleAddToCart = () => {
    // In a real app, we'd handle extras as separate items or modifiers
    // For now, we'll just add the main item
    addToCart(item);
    
    // If extras were selected, we might want to add them too (mocking this logic)
    selectedExtras.forEach(extraId => {
        const extra = MOCK_EXTRAS.find(e => e.id === extraId);
        if (extra) {
            // Create a temp item for the extra
            const extraItem = {
                id: `extra-${extra.id}-${Date.now()}`,
                name: `${extra.name} (for ${item.name})`,
                description: "Extra add-on",
                price: extra.price,
                image: "misc", // placeholder
                category: "extras",
                isAvailable: true
            };
            addToCart(extraItem);
        }
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} ${selectedExtras.length > 0 ? `with ${selectedExtras.length} extras` : ""} added to your order.`,
    });
    
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header / Nav */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b p-4">
        <div className="container max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
          <h1 className="font-bold text-lg hidden sm:block">{item.name}</h1>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>

      <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8">
        {/* Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg bg-muted">
          <Image
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-2xl border-4 border-white px-6 py-2 rounded-lg transform -rotate-12">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* Main Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                {item.name}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-bold text-primary">
                ${item.price.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Tags/Badges */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="text-secondary-foreground">
              {item.category === "lunch-dinner" ? "Lunch & Dinner" : item.category}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Info className="h-3 w-3" />
              {MOCK_NUTRITION.calories} kcal
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Ingredients & Nutrition */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-xl">What's Inside</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Premium quality ingredients</li>
              <li>Freshly prepared daily</li>
              <li>Sustainably sourced</li>
              <li>Chef's special seasoning</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl">Nutrition Facts</h3>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Calories</span>
                <span className="font-medium">{MOCK_NUTRITION.calories}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein</span>
                <span className="font-medium">{MOCK_NUTRITION.protein}</span>
              </div>
              <div className="flex justify-between">
                <span>Carbohydrates</span>
                <span className="font-medium">{MOCK_NUTRITION.carbs}</span>
              </div>
              <div className="flex justify-between">
                <span>Fat</span>
                <span className="font-medium">{MOCK_NUTRITION.fat}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Add-ons / Extras */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl">Complete Your Meal</h3>
          <p className="text-muted-foreground text-sm">Popular additions to this dish</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_EXTRAS.map((extra) => {
              const isSelected = selectedExtras.includes(extra.id);
              return (
                <div
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`
                    cursor-pointer rounded-xl border-2 p-4 flex items-center justify-between transition-all
                    ${isSelected 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-transparent bg-card hover:bg-muted/50 shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-5 h-5 rounded border flex items-center justify-center transition-colors
                      ${isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"}
                    `}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="font-medium">{extra.name}</span>
                  </div>
                  <span className="font-bold text-primary">+${extra.price.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50">
        <div className="container max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
            <div className="flex items-center gap-3 bg-muted rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xl font-bold text-primary sm:hidden">
              ${calculateTotal().toFixed(2)}
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full sm:w-auto min-w-[200px] font-bold text-lg shadow-md rounded-full"
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Order - ${calculateTotal().toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}
