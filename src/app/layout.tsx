import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";

export const metadata: Metadata = {
  title: "IKEA Eats",
  description: "Order your favorite IKEA food online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full">
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <MobileSidebar>
              <main className="flex-1">{children}</main>
            </MobileSidebar>
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
