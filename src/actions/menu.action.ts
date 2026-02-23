"use server";

import { mealService } from "@/services/meal.service";

export async function getMeals(queryParams: any = {}) {
  try {
    const result = await mealService.getMeals(queryParams, { revalidate: 60 });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
