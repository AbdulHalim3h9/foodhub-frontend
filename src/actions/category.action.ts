"use server";

import { categoryService } from "@/services/category.service";

export async function getCategories(queryParams: any = {}) {
  try {
    const result = await categoryService.getCategories(queryParams, {
      revalidate: 3600,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
