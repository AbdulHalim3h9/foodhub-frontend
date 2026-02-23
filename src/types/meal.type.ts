export interface Meal {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  ingredients?: string;
  allergens?: string;
  prepTime?: number;
  cuisine?: string;
  isVegan?: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  providerId: string;
  category?: any;
  provider?: any;
  orderItems?: any[];
  reviews?: any[];
}
