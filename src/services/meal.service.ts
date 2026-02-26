import { env } from "../../env";
import { cookies } from "next/headers";
import { Meal } from "@/types";

const API_URL = env.API_URL;

export interface MealData {
  name: string;
  description?: string;
  price: number;
  image?: string;
  ingredients?: string;
  allergens?: string;
  prepTime?: number;
  cuisineId?: string;
  isFeatured?: boolean;
  categoryId: string;
}

export interface GetMealsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
  categoryId?: string;
  categoryIds?: string; // For multiple categories (comma-separated)
  providerId?: string;
  cuisine?: string;
}

export interface GetMealByIdParams {
  id: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

export interface PaginatedMeals {
  data: Meal[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class MealService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/meals`;
  }

  async getMeals(params?: GetMealsParams, options?: ServiceOptions): Promise<{ data: PaginatedMeals | Meal[] | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const url = new URL(`${this.baseUrl}`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 60,
          tags: options?.tags ?? ["meals"],
        },
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to fetch meals: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async getMealById(
    params: GetMealByIdParams,
    options?: ServiceOptions,
  ): Promise<{ data: Meal | null; error: { message: string } | null }> {
    try {
      const { id } = params;
      
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 60,
          tags: options?.tags ?? ["meal", `meal-${id}`],
        },
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to fetch meal: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async createMeal(mealData: MealData, authToken?: string): Promise<{ data: Meal | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to create meal: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async updateMeal(id: string, mealData: Partial<MealData>, authToken?: string): Promise<{ data: Meal | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to update meal: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async deleteMeal(id: string, authToken?: string): Promise<{ success: boolean; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
      });

      if (!response.ok) {
        return { 
          success: false, 
          error: { message: `Failed to delete meal: ${response.statusText}` } 
        };
      }

      return { success: true, error: null };
    } catch (error) {
      return { 
        success: false, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async toggleFeatured(id: string, isFeatured: boolean, authToken?: string): Promise<{ data: Meal | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/${id}/featured`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify({ isFeatured }),
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to toggle featured status: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }
}

export const mealService = new MealService();
