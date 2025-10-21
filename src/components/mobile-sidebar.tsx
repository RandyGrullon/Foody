"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IkeaEatsLogo } from "@/components/icons";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, ChefHat, ClipboardList, User, Menu, X } from "lucide-react";

interface MobileSidebarProps {
  children: React.ReactNode;
}

export function MobileSidebar({ children }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/create-dish",
      label: "Create Dish",
      icon: ChefHat,
      active: pathname === "/create-dish",
    },
    {
      href: "/profile",
      label: "Orders",
      icon: ClipboardList,
      active: pathname === "/profile",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md border"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="flex items-center justify-center">
                <IkeaEatsLogo />
              </SheetTitle>
            </SheetHeader>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-4 border-t">
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </div>
              </div>
            </nav>

            {/* Cart at bottom */}
            <div className="p-4 border-t">
              <CartSheet />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 md:ml-0">{children}</div>
    </div>
  );
}
