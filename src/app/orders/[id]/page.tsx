"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id?: string };
  const [order, setOrder] = useState<any | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const hist = JSON.parse(localStorage.getItem("ikea-eats-history") || "[]");
    const found = hist.find((o: any) => o.id === id);
    if (!found) {
      // Not found, show 404
      notFound();
      return;
    }
    setOrder(found);
    setStatus(found.status || "in-progress");

    const code = found.code || found.id;
    setTimeout(() => {
      import("qrcode").then((QR) => {
        QR.toDataURL(`IKEAEATS:${code}`)
          .then((url: string) => setQrDataUrl(url))
          .catch(() => setQrDataUrl(null));
      });
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
        } catch (e) {}
      });
    }, 50);
  }, [id]);

  const toggleStatus = () => {
    if (!order) return;
    const next = status === "completed" ? "in-progress" : "completed";
    setStatus(next);
    try {
      const hist = JSON.parse(
        localStorage.getItem("ikea-eats-history") || "[]"
      );
      const idx = hist.findIndex((h: any) => h.id === order.id);
      if (idx !== -1) {
        hist[idx].status = next;
        localStorage.setItem("ikea-eats-history", JSON.stringify(hist));
      }
    } catch (e) {}
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl relative">
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
              Order #{order.code || order.id}
            </CardTitle>
            <CardDescription className="text-base">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-8 pb-10">
            {/* QR and Barcode Section */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
                <div className="text-center group cursor-pointer" onClick={toggleStatus}>
                  <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrDataUrl}
                        alt="QR Code"
                        className="w-32 h-32 object-contain"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-muted/30 rounded-md animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs font-medium mt-2 text-muted-foreground group-hover:text-primary transition-colors">Scan to Pickup</p>
                </div>
                
                <div className="h-12 w-px bg-border hidden sm:block" />
                
                <div className="text-center group cursor-pointer" onClick={toggleStatus}>
                  <div className="bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center h-[152px]">
                    <svg
                      ref={barcodeRef}
                      className="w-full max-w-[200px]"
                    />
                  </div>
                  <p className="text-xs font-medium mt-2 text-muted-foreground group-hover:text-primary transition-colors">Order Barcode</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                Order Details
              </h3>
              <div className="bg-muted/20 rounded-xl p-4 space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center text-sm group">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground text-xs bg-muted px-2 py-0.5 rounded-full">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="font-mono font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/profile" className="flex-1">
                <Button variant="outline" className="w-full h-11">Back to Profile</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full h-11 shadow-md hover:shadow-lg transition-all">Back to Menu</Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-3 pt-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  status === "completed"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                }`}
              >
                Status: {status}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleStatus}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                (Toggle for Demo)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
