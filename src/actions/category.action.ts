"use server";

import { categoryService } from "@/services/category.service";
import { Category } from "@/services/category.service";

export async function getCategories(queryParams: any = {}): Promise<{ success: boolean; data: Category[] | null; error: string | null }> {
  try {
    const result = await categoryService.getCategories(queryParams, {
      revalidate: 3600,
    });
    
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
