"use server";

import { cuisineService, Cuisine } from "@/services/cuisine.service";

export async function getCuisines(queryParams: any = {}): Promise<{ success: boolean; data: Cuisine[] | null; error: string | null }> {
  try {
    const result = await cuisineService.getCuisines(queryParams);
    
    if (result.error) {
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }
    
    // Handle direct response or wrapped response
    const cuisines = Array.isArray(result) ? result : result.data;
    
    return { success: true, data: cuisines, error: null };
  } catch (error) {
    console.error("Failed to fetch cuisines:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: null,
    };
  }
}
