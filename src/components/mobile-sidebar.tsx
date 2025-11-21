"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IkeaEatsLogo } from "@/components/icons";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, ChefHat, ClipboardList, User, Menu, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface MobileSidebarProps {
  children: React.ReactNode;
}

export function MobileSidebar({ children }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

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
      href: "/orders",
      label: "Orders",
      icon: ClipboardList,
      active: pathname === "/orders",
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    router.push('/');
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-1 w-full">
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

            {/* User Info */}
            {user && (
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(user.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{user.displayName || "Usuario"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationItems
                  .filter(item => {
                    // Show all items if user is logged in
                    if (user) return true;
                    // Only show Home if not logged in
                    return item.href === '/';
                  })
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          item.active
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:bg-secondary/50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
              </div>

              {/* Login/Signup for non-authenticated users */}
              {!user && (
                <div className="mt-8 pt-4 border-t space-y-2">
                  <Link href="/auth/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full" size="lg">
                      Registrarse
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/auth/login" onClick={() => setOpen(false)} className="text-primary hover:underline">
                      Inicia sesión
                    </Link>
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              {user && (
                <div className="mt-8 pt-4 border-t">
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
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
