import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import { CartSidebarProvider } from "@/hooks/use-cart-sidebar";
import { SearchProvider } from "@/hooks/use-search";
import { AuthProvider } from "@/hooks/use-auth";
import { LayoutWrapper } from "@/components/layout-wrapper";

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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <CartSidebarProvider>
              <SearchProvider>
                <LayoutWrapper>{children}</LayoutWrapper>
                <Toaster />
              </SearchProvider>
            </CartSidebarProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
