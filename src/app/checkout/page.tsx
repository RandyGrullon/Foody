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
import { CreditCard, Package, UtensilsCrossed } from "lucide-react";
import type { CartItem } from "@/types";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, itemCount } = useCart();
  const router = useRouter();
  const [pendingOrder, setPendingOrder] = useState<any | null>(null);
  const [checkoutOption, setCheckoutOption] = useState("carry-out");
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    if (itemCount === 0) {
      // If the cart is empty, check for a prepared custom order saved by Create Dish
      try {
        const temp = localStorage.getItem("ikea-eats-order");
        if (temp) {
          const parsed = JSON.parse(temp);
          setPendingOrder(parsed);
          return;
        }
      } catch (e) {
        // ignore
      }
      router.push("/");
    }
  }, [itemCount, router]);

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageUrl : "";
  };
  const getImageHint = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    return image ? image.imageHint : "food";
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

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

  if (!isClient || (itemCount === 0 && !pendingOrder)) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(pendingOrder ? pendingOrder.items : cartItems).map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                        data-ai-hint={getImageHint(item.image)}
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${(pendingOrder ? pendingOrder.total : cartTotal).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <form onSubmit={handleConfirmOrder} noValidate>
            <Card>
              <CardHeader>
                <CardTitle>Checkout Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  defaultValue="carry-out"
                  value={checkoutOption}
                  onValueChange={setCheckoutOption}
                >
                  <Label
                    htmlFor="carry-out"
                    className="flex items-start gap-4 rounded-md border p-4 hover:bg-accent/10 transition-colors has-[[data-state=checked]]:border-accent"
                  >
                    <RadioGroupItem value="carry-out" id="carry-out" />
                    <div>
                      <h3 className="font-semibold mb-1">Carry Out</h3>
                      <p className="text-sm text-muted-foreground">
                        Pay now and pick up your order when it's ready.
                      </p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="pre-order"
                    className="flex items-start gap-4 rounded-md border p-4 hover:bg-accent/10 transition-colors has-[[data-state=checked]]:border-accent"
                  >
                    <RadioGroupItem value="pre-order" id="pre-order" />
                    <div>
                      <h3 className="font-semibold mb-1">In-Store Pre-order</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll prepare your order. Pay at the cash register upon
                        arrival.
                      </p>
                    </div>
                  </Label>
                </RadioGroup>

                {checkoutOption === "carry-out" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <CreditCard /> Secure Payment
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="Name on Card"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="save-card" className="mt-1" />
                      <label
                        htmlFor="save-card"
                        className="text-sm text-muted-foreground"
                      >
                        Save card details for future payments
                      </label>
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {checkoutOption === "carry-out" ? (
                    <>
                      <Package className="mr-2" />
                      Place Order & Pay
                    </>
                  ) : (
                    <>
                      <UtensilsCrossed className="mr-2" />
                      Confirm Pre-order
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
