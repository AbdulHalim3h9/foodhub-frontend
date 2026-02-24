"use server";

import { cuisineService } from "@/services/cuisine.service";

export async function getCuisines(queryParams: any = {}) {
  try {
    const result = await cuisineService.getCuisines(queryParams, {
      revalidate: 3600,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch cuisines:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
