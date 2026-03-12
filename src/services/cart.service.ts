import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface CartItem {
  id: string;
  userId: string;
  mealId: string;
  quantity: number;
  meal: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    price: string;
    cuisine?: string;
    isVegan?: boolean;
    isAvailable: boolean;
    provider: {
      id: string;
      businessName: string;
      phone: string;
      address: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalAmount: number;
  total: string;
  itemCount: number;
}

export interface AddToCartData {
  mealId: string;
  quantity: number;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class CartService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/cart`;
  }

  async getCart(
    options?: ServiceOptions,
  ): Promise<{ data: Cart | null; error: { message: string } | null }> {
    try {
      // Build cookie header for server-side requests
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(`${this.baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["cart"],
        },
      });

      if (!response.ok) {
        return {
          data: null,
          error: { message: `Failed to fetch cart: ${response.statusText}` },
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }

  async addItemToCart(
    itemData: AddToCartData,
    options?: ServiceOptions,
  ): Promise<{ data: CartItem | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(`${this.baseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        body: JSON.stringify(itemData),
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["cart"],
        },
      });

      if (!response.ok) {
        return {
          data: null,
          error: {
            message: `Failed to add item to cart: ${response.statusText}`,
          },
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }

  async updateItemQuantity(
    mealId: string,
    quantity: number,
    options?: ServiceOptions,
  ): Promise<{ data: Cart | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(`${this.baseUrl}/items/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        body: JSON.stringify({ quantity }),
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["cart"],
        },
      });

      if (!response.ok) {
        return {
          data: null,
          error: {
            message: `Failed to update item quantity: ${response.statusText}`,
          },
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }

  async removeItemFromCart(
    mealId: string,
    options?: ServiceOptions,
  ): Promise<{ success: boolean; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(`${this.baseUrl}/items/${mealId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["cart"],
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: `Failed to remove item from cart: ${response.statusText}`,
          },
        };
      }

      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }

  async clearCart(
    options?: ServiceOptions,
  ): Promise<{ success: boolean; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      const response = await fetch(`${this.baseUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["cart"],
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: { message: `Failed to clear cart: ${response.statusText}` },
        };
      }

      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }
}

export const cartService = new CartService();
