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
    
    return { success: true, data: result.data, error: null };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}
