"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CreditCard, Package, UtensilsCrossed, Minus, Plus, Trash2, Landmark, Wallet, Loader2 } from "lucide-react";
import type { CartItem } from "@/types";
import { ProtectedRoute } from "@/components/protected-route";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, itemCount, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [pendingOrder, setPendingOrder] = useState<any | null>(null);
  const [checkoutOption, setCheckoutOption] = useState("carry-out");
  const [isClient, setIsClient] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // Check for pending order from Create Dish
    if (itemCount === 0) {
      try {
        const temp = localStorage.getItem("ikea-eats-order");
        if (temp) {
          const parsed = JSON.parse(temp);
          setPendingOrder(parsed);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [itemCount]);

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageUrl : "";
  };
  const getImageHint = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageHint : "food";
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // If there's a pending custom order, use it instead of the cart
    const sourceItems = pendingOrder ? pendingOrder.items : cartItems;
    const sourceTotal = pendingOrder ? pendingOrder.total : cartTotal;

    const code = pendingOrder
      ? pendingOrder.code || Math.random().toString(36).substring(2, 8).toUpperCase()
      : Math.random().toString(36).substring(2, 8).toUpperCase();

    const orderDetails = pendingOrder
      ? {
          ...pendingOrder,
          status: "in-progress",
          type: checkoutOption,
          createdAt: new Date().toISOString(),
        }
      : {
          id: `order-${Date.now()}`,
          code,
          items: sourceItems,
          total: sourceTotal,
          type: checkoutOption,
          status: "in-progress",
          createdAt: new Date().toISOString(),
        };

    if (typeof window !== "undefined") {
      // Append to history
      try {
        const existing = JSON.parse(
          localStorage.getItem("ikea-eats-history") || "[]"
        );
        existing.unshift(orderDetails);
        localStorage.setItem("ikea-eats-history", JSON.stringify(existing));
      } catch (e) {}

      // store last order and clear pending order
      try {
        localStorage.setItem("ikea-eats-order", JSON.stringify(orderDetails));
      } catch (e) {}
      try {
        localStorage.removeItem("ikea-eats-order");
      } catch (e) {}

      // also store last order id for quick access
      sessionStorage.setItem("ikea-eats-last-order-id", orderDetails.id);
    }

    // Clear cart if we used it
    clearCart();

    toast({
      title: "Order placed",
      description: "Redirecting to your order details...",
    });

    // Primary client navigation
    try {
      router.push(`/orders/${orderDetails.id}`);
    } catch (err) {
      // ignore
    }
    // Fallback: if client navigation doesn't happen (edge cases), force full navigation after short delay
    setTimeout(() => {
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== `/orders/${orderDetails.id}`
      ) {
        window.location.href = `/orders/${orderDetails.id}`;
      }
    }, 300);
  };

  if (!isClient) {
    return null; // Loading
  }

  const hasItems = itemCount > 0 || pendingOrder;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container py-12 h-full flex items-center">
            <h1 className="text-4xl font-bold font-headline text-foreground">Checkout</h1>
          </div>
        </div>
      
        <div className="container py-8 -mt-12 relative z-10">
          {/* Processing Loader Overlay */}
          {isProcessing && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-card rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto">
                    <Loader2 className="w-20 h-20 text-primary animate-spin" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Processing Payment</h3>
                  <p className="text-muted-foreground">
                    Please wait while we process your order...
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {!hasItems ? (
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Your Cart is Empty</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Looks like you haven't added any items to your cart yet. 
                    Browse our menu and add some delicious items!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => router.push('/')}
                    className="gap-2"
                  >
                    <UtensilsCrossed className="h-5 w-5" />
                    Browse Menu
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => router.push('/create-dish')}
                    className="gap-2"
                  >
                    <Package className="h-5 w-5" />
                    Create Custom Dish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-none shadow-xl bg-card/90 backdrop-blur-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Order Summary</div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {(pendingOrder ? pendingOrder.items : cartItems).length} {(pendingOrder ? pendingOrder.items : cartItems).length === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
                      {(pendingOrder ? pendingOrder.items : cartItems).map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="group relative p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-300 border border-border/50 hover:border-primary/30 hover:shadow-md"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative h-20 w-20 rounded-xl overflow-hidden shadow-md bg-muted flex items-center justify-center shrink-0 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                              {getImageUrl(item.image) ? (
                                <Image
                                  src={getImageUrl(item.image)}
                                  alt={item.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  data-ai-hint={getImageHint(item.image)}
                                />
                              ) : (
                                <Package className="h-10 w-10 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                  {item.name}
                                </h4>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    ${item.price.toFixed(2)} each
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-primary">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                              {!pendingOrder && (
                                <div className="flex items-center gap-2 mt-3">
                                  <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-border/50">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-3.5 w-3.5" />
                                    </Button>
                                    <span className="text-sm font-bold w-10 text-center tabular-nums">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              )}
                              {pendingOrder && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                                    <Package className="h-3 w-3" />
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3 bg-gradient-to-br from-muted/20 to-transparent rounded-xl p-4 border border-border/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Subtotal</span>
                        <span className="font-semibold tabular-nums">${(pendingOrder ? pendingOrder.total / 1.08 : cartTotal).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Tax (8%)</span>
                        <span className="font-semibold tabular-nums">${(pendingOrder ? pendingOrder.total - (pendingOrder.total / 1.08) : cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold">Total</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary tabular-nums">
                            ${(pendingOrder ? pendingOrder.total : cartTotal * 1.08).toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {(pendingOrder ? pendingOrder.items : cartItems).length} {(pendingOrder ? pendingOrder.items : cartItems).length === 1 ? 'item' : 'items'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <form onSubmit={handleConfirmOrder} noValidate>
                <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment & Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <RadioGroup
                      defaultValue="carry-out"
                      value={checkoutOption}
                      onValueChange={setCheckoutOption}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="carry-out"
                        className="flex flex-col gap-2 rounded-xl border-2 p-4 hover:bg-accent/5 transition-all cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                      >
                        <div className="flex justify-between items-start w-full">
                          <Package className="h-6 w-6 text-primary mb-2" />
                          <RadioGroupItem value="carry-out" id="carry-out" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Carry Out</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Pay now and pick up your order when it's ready.
                          </p>
                        </div>
                      </Label>
                      <Label
                        htmlFor="pre-order"
                        className="flex flex-col gap-2 rounded-xl border-2 p-4 hover:bg-accent/5 transition-all cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                      >
                        <div className="flex justify-between items-start w-full">
                          <UtensilsCrossed className="h-6 w-6 text-primary mb-2" />
                          <RadioGroupItem value="pre-order" id="pre-order" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">In-Store Pre-order</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            We'll prepare your order. Pay at the cash register.
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>

                    {checkoutOption === "carry-out" && (
                      <div className="space-y-6 pt-4 border-t animate-in slide-in-from-top-4 fade-in duration-300">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          Select Payment Method
                        </h3>
                        
                        {/* Payment Method Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Payroll Deduction */}
                          <button
                            type="button"
                            className="flex items-center justify-start gap-4 p-4 h-24 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all group relative overflow-hidden"
                          >
                            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Wallet className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-base">Descuento Nómina</span>
                          </button>

                          {/* Apple Pay */}
                          <button
                            type="button"
                            className="flex items-center justify-start gap-4 p-4 h-24 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all group relative overflow-hidden"
                          >
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                              </svg>
                            </div>
                            <span className="font-semibold text-base">Apple Pay</span>
                          </button>

                          {/* Google Pay */}
                          <button
                            type="button"
                            className="flex items-center justify-start gap-4 p-4 h-24 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all group relative overflow-hidden"
                          >
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-8 h-8" viewBox="0 0 48 20" fill="none">
                                <path d="M23.7 9.7h-3.2v7.6h1.7v-2.6h1.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5zm0 3.5h-1.5v-2h1.5c.6 0 1 .4 1 1s-.4 1-1 1z" fill="#5F6368"/>
                                <path d="M29.9 12.2c0-1.7-1.2-2.9-2.8-2.9s-2.9 1.2-2.9 2.9c0 1.6 1.2 2.9 2.9 2.9.9 0 1.6-.3 2.1-.8l-1-.7c-.3.3-.7.5-1.2.5-.7 0-1.2-.3-1.4-.9l3.2-1.3-.1-.7zm-3.3.4c0-.7.5-1.1 1-.1.1 1 .1-.1 0 0-.1-.1-.2-.2-.4-.2-.3 0-.6.2-.6.5z" fill="#5F6368"/>
                                <path d="M33.8 9.3c-.6 0-1.1.3-1.4.7l-.1-.6h-1.5v7.9h1.7v-2.7c.3.4.8.6 1.4.6 1.4 0 2.5-1.2 2.5-2.9s-1.1-3-2.6-3zm-.3 4.4c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5z" fill="#5F6368"/>
                                <path d="M40.5 9.3c-1.6 0-2.9 1.2-2.9 2.9s1.2 2.9 2.9 2.9c.9 0 1.7-.3 2.2-1l-1.1-.8c-.3.4-.7.6-1.2.6-.7 0-1.3-.4-1.5-1h3.9v-.4c0-1.8-1.2-3.2-2.8-3.2zm-1.1 2.3c.1-.6.6-1.1 1.2-1.1s1 .4 1.1 1.1h-2.3z" fill="#5F6368"/>
                                <path d="M10.7 11.3c0-.4 0-.7-.1-1h-4v1.9h2.3c-.1.5-.4 1-.9 1.3v1.2h1.5c.8-.8 1.2-1.9 1.2-3.4z" fill="#4285F4"/>
                                <path d="M6.6 15.1c1.2 0 2.3-.4 3-1.1l-1.5-1.2c-.4.3-.9.4-1.5.4-1.2 0-2.1-.8-2.5-1.8H2.6v1.2c.7 1.4 2.2 2.5 4 2.5z" fill="#34A853"/>
                                <path d="M4.1 11.4c-.2-.5-.2-1.1 0-1.6V8.6H2.6c-.6 1.2-.6 2.6 0 3.8l1.5-1z" fill="#FBBC04"/>
                                <path d="M6.6 8.2c.6 0 1.2.2 1.7.7l1.2-1.2C8.8 7 7.8 6.6 6.6 6.6c-1.8 0-3.3 1.1-4 2.5l1.5 1.2c.4-1 1.3-1.8 2.5-1.8z" fill="#EA4335"/>
                              </svg>
                            </div>
                            <span className="font-semibold text-base">Google Pay</span>
                          </button>

                          {/* Banco */}
                          <button
                            type="button"
                            className="flex items-center justify-start gap-4 p-4 h-24 rounded-2xl border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md transition-all group relative overflow-hidden"
                          >
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Landmark className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-base">Banco</span>
                          </button>
                        </div>
                      </div>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-bold text-lg h-12 shadow-lg hover:shadow-xl transition-all"
                    >
                      {checkoutOption === "carry-out" ? (
                        <>
                          <Package className="mr-2 h-5 w-5" />
                          Place Order & Pay
                        </>
                      ) : (
                        <>
                          <UtensilsCrossed className="mr-2 h-5 w-5" />
                          Confirm Pre-order
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
