"use server";

import { 
  mealService, 
  MealData, 
  GetMealsParams, 
  GetMealByIdParams, 
  Meal 
} from "@/services/meal.service";
import { revalidatePath } from "next/cache";

// Get meals with filtering and pagination
export async function getMeals(params?: GetMealsParams): Promise<{ success: boolean; data: any; error: string | null }> {
  try {
    console.log("🍽️ Fetching meals with params:", params);
    
    const result = await mealService.getMeals(params, {
      revalidate: 60,
      tags: ["meals"],
    });

    if (result.error) {
      console.error("❌ Failed to fetch meals:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Meals loaded successfully`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No meals data found");
      return { 
        success: false, 
        error: "Meals not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching meals:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch meals",
      data: null 
    };
  }
}

// Get meal details by ID
export async function getMealById(id: string): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`🔍 Fetching meal details for ID: ${id}`);
    
    const result = await mealService.getMealById(
      { id },
      { revalidate: 60, tags: ["meal", `meal-${id}`] }
    );

    if (result.error) {
      console.error(`❌ Failed to fetch meal ${id}:`, result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Successfully loaded meal: ${result.data.name} (${id})`);
      return { success: true, data: result.data, error: null };
    } else {
      console.error(`❌ No meal data found for ID: ${id}`);
      return { 
        success: false, 
        error: "Meal not found",
        data: null 
      };
    }
  } catch (error) {
    console.error(`❌ Unexpected error fetching meal ${id}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch meal",
      data: null 
    };
  }
}

// Create new meal
export async function createMeal(mealData: MealData): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`🍽️ Creating meal: ${mealData.name}`);
    
    const result = await mealService.createMeal(mealData);

    if (result.error) {
      console.error("❌ Failed to create meal:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Meal created successfully: ${result.data.name}`);
      revalidatePath("/browse");
      revalidatePath("/admin/meals");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No meal data returned");
      return { 
        success: false, 
        error: "Failed to create meal",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error creating meal:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create meal",
      data: null 
    };
  }
}

// Update existing meal
export async function updateMeal(id: string, mealData: Partial<MealData>): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`🍽️ Updating meal: ${id}`);
    
    const result = await mealService.updateMeal(id, mealData);

    if (result.error) {
      console.error("❌ Failed to update meal:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Meal updated successfully: ${result.data.name}`);
      revalidatePath(`/browse/meal/${id}`);
      revalidatePath("/browse");
      revalidatePath("/admin/meals");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No meal data returned");
      return { 
        success: false, 
        error: "Failed to update meal",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error updating meal:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update meal",
      data: null 
    };
  }
}

// Delete meal
export async function deleteMeal(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log(`🗑️ Deleting meal: ${id}`);
    
    const result = await mealService.deleteMeal(id);

    if (result.error) {
      console.error("❌ Failed to delete meal:", result.error.message);
      return { 
        success: false, 
        error: result.error.message
      };
    }

    if (result.success) {
      console.log(`✅ Meal deleted successfully`);
      revalidatePath("/browse");
      revalidatePath("/admin/meals");
      return { success: true, error: null };
    } else {
      console.error("❌ Failed to delete meal");
      return { 
        success: false, 
        error: "Failed to delete meal" 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error deleting meal:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete meal" 
    };
  }
}

// Toggle meal featured status
export async function toggleFeatured(id: string, isFeatured: boolean): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`⭐ Toggling featured status for meal ${id} to: ${isFeatured}`);
    
    const result = await mealService.toggleFeatured(id, isFeatured);

    if (result.error) {
      console.error("❌ Failed to toggle featured status:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Featured status updated successfully`);
      revalidatePath(`/browse/meal/${id}`);
      revalidatePath("/browse");
      revalidatePath("/admin/meals");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No meal data returned");
      return { 
        success: false, 
        error: "Failed to toggle featured status",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error toggling featured status:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to toggle featured status",
      data: null 
    };
  }
}

// Revalidate meal cache
export async function revalidateMeal(id: string) {
  revalidatePath(`/browse/meal/${id}`);
  revalidatePath("/browse");
  console.log(`🔄 Revalidated meal cache for: ${id}`);
}
