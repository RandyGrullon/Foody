import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ChefHat, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[200px] md:text-[280px] font-bold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <ChefHat className="h-24 w-24 md:h-32 md:w-32 text-primary/30" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 -mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/">
            <Button size="lg" className="gap-2 min-w-[200px]">
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/">
            <Button size="lg" variant="outline" className="gap-2 min-w-[200px]">
              <Search className="h-5 w-5" />
              Browse Menu
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Quick Links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link 
              href="/" 
              className="text-primary hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Home
            </Link>
            <Link 
              href="/create-dish" 
              className="text-primary hover:underline"
            >
              Create Custom Dish
            </Link>
            <Link 
              href="/checkout" 
              className="text-primary hover:underline"
            >
              Checkout
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
