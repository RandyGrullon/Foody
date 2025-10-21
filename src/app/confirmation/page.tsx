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
    <div className="container py-12 max-w-2xl mx-auto">
      <Card className="shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-headline mt-4">
            Order Confirmed!
          </CardTitle>
          <CardDescription className="text-lg">
            Thank you for your order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Your Confirmation Code
            </p>
            <p className="text-3xl font-bold tracking-widest font-mono">
              {confirmationCode}
            </p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Please show this at the register.
            </p>
            <div className="flex justify-center items-center gap-8 mt-4">
              <div className="text-center">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="QR Code"
                    className="mx-auto w-40 h-40 object-contain bg-white p-2"
                  />
                ) : (
                  <QrCodeIcon className="mx-auto" />
                )}
                <p className="text-xs mt-1 text-muted-foreground">QR Code</p>
              </div>
              <div className="text-center">
                <svg ref={barcodeRef} className="mx-auto" />
                <p className="text-xs mt-1 text-muted-foreground">Barcode</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Order Type</span>
                <span>
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
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/">Back to Menu</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
