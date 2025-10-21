import Link from "next/link";
import { IkeaEatsLogo } from "@/components/icons";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import { Search, User, ChefHat, ClipboardList } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between pl-16 md:pl-0">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <IkeaEatsLogo />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Home
              </Button>
            </Link>
            <Link href="/create-dish">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium flex items-center gap-1"
              >
                <ChefHat className="h-4 w-4" />
                Create Dish
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium flex items-center gap-1"
              >
                <ClipboardList className="h-4 w-4" />
                Orders
              </Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Link href="/profile" className="hidden md:block">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
          <div className="hidden md:block">
            <CartSheet />
          </div>
        </div>
      </div>
    </header>
  );
}
