"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarcodeIcon, QrCodeIcon } from "@/components/icons";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { CartItem } from "@/types";

interface OrderDetails {
  items: CartItem[];
  total: number;
  type: string;
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const orderData = localStorage.getItem("ikea-eats-order");
    if (orderData) {
      setOrder(JSON.parse(orderData));
      // Generate a simple random confirmation code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setConfirmationCode(code);
      // generate QR
      import("qrcode").then((QR) => {
        QR.toDataURL(`IKEAEATS:${code}`)
          .then((url: string) => setQrDataUrl(url))
          .catch(() => setQrDataUrl(null));
      });
      // generate barcode
      import("jsbarcode").then((JsBarcode) => {
        try {
          if (barcodeRef.current) {
            // @ts-ignore
            JsBarcode.default(barcodeRef.current, code, {
              format: "CODE128",
              displayValue: true,
              width: 2,
              height: 40,
              background: "transparent",
            });
          }
        } catch (e) {
          // ignore barcode render errors
        }
      });
      // Append to order history
      try {
        const existing = JSON.parse(
          localStorage.getItem("ikea-eats-history") || "[]"
        );
        const parsed = JSON.parse(orderData);
        const entry = {
          id: parsed.id || `order-${Date.now()}`,
          code,
          items: parsed.items,
          total: parsed.total,
          type: parsed.type,
          createdAt: new Date().toISOString(),
        };
        existing.unshift(entry);
        localStorage.setItem("ikea-eats-history", JSON.stringify(existing));
      } catch (e) {
        // ignore history write errors
      }
      // Clean up local storage
      localStorage.removeItem("ikea-eats-order");
    } else {
      // If there's no order data, redirect to home
      router.push("/");
    }
  }, [router]);

  if (!order) {
    return null; // or a loading skeleton
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl relative">
        {/* Background decoration */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden relative z-10">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
          
          <CardHeader className="text-center pb-8 pt-10">
            <div className="mx-auto bg-green-100/50 backdrop-blur-sm rounded-full p-4 w-fit mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">
              Order Confirmed!
            </CardTitle>
            <CardDescription className="text-lg">
              Thank you for your order.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-8 pb-10">
            <div className="bg-muted/30 rounded-xl p-6 text-center border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">
                Your Confirmation Code
              </p>
              <p className="text-4xl font-bold tracking-widest font-mono text-primary">
                {confirmationCode}
              </p>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Please show this at the register.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                <div className="text-center bg-white p-4 rounded-xl shadow-sm">
                  {qrDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="mx-auto w-32 h-32 object-contain"
                    />
                  ) : (
                    <QrCodeIcon className="mx-auto w-32 h-32 text-muted" />
                  )}
                  <p className="text-xs mt-2 text-muted-foreground font-medium">QR Code</p>
                </div>
                <div className="text-center bg-white p-4 rounded-xl shadow-sm flex flex-col justify-center h-[160px]">
                  <svg ref={barcodeRef} className="mx-auto max-w-[180px]" />
                  <p className="text-xs mt-2 text-muted-foreground font-medium">Barcode</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">Order Summary</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-medium">
                      {item.name} <span className="text-muted-foreground">x {item.quantity}</span>
                    </span>
                    <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground bg-muted/20 p-2 rounded-lg">
                  <span>Order Type</span>
                  <span className="font-medium text-foreground">
                    {order.type === "carry-out"
                      ? "Carry Out (Paid)"
                      : "In-Store Pre-order"}
                  </span>
                </div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/">Back to Menu</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
