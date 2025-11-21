import { CustomDishBlock } from "@/components/custom-dish-block";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Create Custom Dish",
  description: "Build a custom dish from available ingredients",
};

export default function CreateDishPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container py-12 h-full flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground hover:bg-background/20">
                ← Back to Menu
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold font-headline text-foreground">
            Create Custom Dish
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
            Select ingredients to build your personalized meal. Mix and match to create something unique.
          </p>
        </div>
      </div>

      <div className="container py-8 -mt-8 relative z-10">
        <CustomDishBlock />
      </div>
    </div>
  );
}
