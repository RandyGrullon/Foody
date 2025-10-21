export interface Category {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Corresponds to id in placeholder-images.json
  category: string; // Corresponds to id in categories
  isAvailable: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
