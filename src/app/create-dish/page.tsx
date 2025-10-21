import { CustomDishBlock } from "@/components/custom-dish-block";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Create Custom Dish",
  description: "Build a custom dish from available ingredients",
};

export default function CreateDishPage() {
  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">
            Create Custom Dish
          </h1>
        </div>
        <p className="text-muted-foreground">
          Select ingredients to build your personalized meal
        </p>
      </div>

      <CustomDishBlock />
    </div>
  );
}
