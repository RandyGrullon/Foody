"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";

export interface SavedDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients?: {
    id: string;
    name: string;
    quantity: number;
  }[];
  createdAt: string;
}

interface SavedDishesContextType {
  savedDishes: SavedDish[];
  saveDish: (dish: Omit<SavedDish, "id" | "createdAt">) => void;
  removeDish: (id: string) => void;
  isSaved: (name: string) => boolean;
}

const SavedDishesContext = createContext<SavedDishesContextType | undefined>(
  undefined
);

export function SavedDishesProvider({ children }: { children: React.ReactNode }) {
  const [savedDishes, setSavedDishes] = useState<SavedDish[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("ikea-eats-saved-dishes");
    if (stored) {
      try {
        setSavedDishes(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved dishes", e);
      }
    }
  }, []);

  const saveDish = (dishData: Omit<SavedDish, "id" | "createdAt">) => {
    const newDish: SavedDish = {
      ...dishData,
      id: `dish-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newDish, ...savedDishes];
    setSavedDishes(updated);
    localStorage.setItem("ikea-eats-saved-dishes", JSON.stringify(updated));

    toast({
      title: "Dish Saved",
      description: `${newDish.name} has been added to your saved dishes.`,
    });
  };

  const removeDish = (id: string) => {
    const updated = savedDishes.filter((d) => d.id !== id);
    setSavedDishes(updated);
    localStorage.setItem("ikea-eats-saved-dishes", JSON.stringify(updated));

    toast({
      title: "Dish Removed",
      description: "The dish has been removed from your saved dishes.",
    });
  };

  const isSaved = (name: string) => {
    return savedDishes.some((d) => d.name === name);
  };

  return (
    <SavedDishesContext.Provider
      value={{ savedDishes, saveDish, removeDish, isSaved }}
    >
      {children}
    </SavedDishesContext.Provider>
  );
}

export function useSavedDishes() {
  const context = useContext(SavedDishesContext);
  if (context === undefined) {
    throw new Error("useSavedDishes must be used within a SavedDishesProvider");
  }
  return context;
}
