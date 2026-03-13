"use server";

import { categoryService, Category, CategoryData } from "@/services/category.service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCategories(queryParams: any = {}): Promise<{ success: boolean; data: Category[] | null; error: string | null }> {
  try {
    const result = await categoryService.getCategories(queryParams);
    
    if (result.error) {
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }
    
    // Handle direct response or wrapped response
    const categories = Array.isArray(result) ? result : result.data;
    
    return { success: true, data: categories, error: null };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export async function getCategoryById(id: string): Promise<{ success: boolean; data: Category | null; error: string | null }> {
  try {
    const result = await categoryService.getCategoryById(id);
    
    if (result.error) {
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }
    
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export async function createCategory(categoryData: CategoryData): Promise<{ success: boolean; data: Category | null; error: string | null }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return { 
        success: false, 
        error: "Authentication required",
        data: null 
      };
    }

    const result = await categoryService.createCategory(categoryData, token);
    
    if (result.error) {
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }
    
    revalidatePath("/dashboard/content/categories");
    revalidatePath("/dashboard/content");
    
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error("Failed to create category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export async function updateCategory(id: string, categoryData: Partial<CategoryData>): Promise<{ success: boolean; data: Category | null; error: string | null }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return { 
        success: false, 
        error: "Authentication required",
        data: null 
      };
    }

    const result = await categoryService.updateCategory(id, categoryData, token);
    
    if (result.error) {
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }
    
    revalidatePath("/dashboard/content/categories");
    revalidatePath("/dashboard/content");
    revalidatePath(`/dashboard/content/categories/${id}`);
    
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error("Failed to update category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; data: any; error: string | null }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return { 
        success: false, 
        error: "Authentication required",
        data: null 
      };
    }

    const result = await categoryService.deleteCategory(id, token);
    
    if (result.error) {
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }
    
    revalidatePath("/dashboard/content/categories");
    revalidatePath("/dashboard/content");
    
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}
