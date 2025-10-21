"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
      // Not found, go back to profile
      router.push("/profile");
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
            });
          }
        } catch (e) {}
      });
    }, 50);
  }, [id, router]);

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
    <div className="container py-12 max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl mt-4">
            Order #{order.code || order.id}
          </CardTitle>
          <CardDescription>
            Order placed {new Date(order.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center items-center gap-8 mt-4">
              <div className="text-center">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="QR Code"
                    className="mx-auto w-40 h-40 object-contain bg-white p-2 cursor-pointer"
                    onClick={toggleStatus}
                  />
                ) : (
                  <div className="w-40 h-40 bg-muted/30 rounded-md" />
                )}
                <p className="text-xs mt-1 text-muted-foreground">QR Code</p>
              </div>
              <div className="text-center">
                <svg
                  ref={barcodeRef}
                  className="mx-auto cursor-pointer"
                  onClick={toggleStatus}
                />
                <p className="text-xs mt-1 text-muted-foreground">Barcode</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Order Details</h3>
            <div className="space-y-2">
              {order.items.map((item: any) => (
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
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Link href="/profile">
              <Button variant="outline">Back to Profile</Button>
            </Link>
            <Link href="/">
              <Button>Back to Menu</Button>
            </Link>
            <div className="ml-auto flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  status === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-yellow-400 text-black"
                }`}
              >
                {status}
              </div>
              <Button variant="secondary" onClick={toggleStatus}>
                {status === "completed"
                  ? "Mark as In Progress"
                  : "Mark as Completed"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
