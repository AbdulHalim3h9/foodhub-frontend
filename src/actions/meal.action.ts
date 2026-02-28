"use server";

import {
  mealService,
  MealData,
  GetMealsParams,
  GetMealByIdParams,
  PaginatedMeals,
} from "@/services/meal.service";
import { Meal } from "@/types";
import { revalidatePath } from "next/cache";

// Get provider's own meals (for provider dashboard)
export async function getProviderMeals(params: GetMealsParams): Promise<{
  success: boolean;
  data: PaginatedMeals | null;
  error: string | null;
  needsProfile?: boolean;
  profileUrl?: string;
}> {
  try {
    console.log(
      "📋 [FRONTEND ACTION] Fetching provider meals with params:",
      params,
    );

    const result = await mealService.getProviderMeals(params);

    if (result.error) {
      console.error(
        "❌ [FRONTEND ACTION] Failed to fetch provider meals:",
        result.error.message,
      );

      // Check if it's a profile completion error
      if (result.error.message.includes("complete your provider profile")) {
        return {
          success: false,
          error: result.error.message,
          needsProfile: true,
          profileUrl: "/dashboard/profile",
          data: null,
        };
      }

      return {
        success: false,
        error: result.error.message,
        data: null,
      };
    }

    const count = Array.isArray(result.data)
      ? result.data.length
      : (result.data as PaginatedMeals)?.data?.length || 0;
    console.log(
      `✅ [FRONTEND ACTION] Successfully fetched ${count} provider meals`,
    );
    return {
      success: true,
      data: result.data as unknown as PaginatedMeals,
      error: null,
    };
  } catch (error) {
    console.error(
      "❌ [FRONTEND ACTION] Unexpected error fetching provider meals:",
      error,
    );
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch provider meals",
      data: null,
    };
  }
}

// Get all meals (public endpoint - for customers)
export async function getMeals(params?: GetMealsParams): Promise<{
  success: boolean;
  data: PaginatedMeals | null;
  error: string | null;
}> {
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
        data: null,
      };
    }

    if (result.data) {
      console.log(`✅ Meals loaded successfully`);
      return {
        success: true,
        data: result.data as unknown as PaginatedMeals,
        error: null,
      };
    } else {
      console.error("❌ No meals data found");
      return {
        success: false,
        error: "Meals not found",
        data: null,
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching meals:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch meals",
      data: null,
    };
  }
}

// Get meal details by ID
export async function getMealById(
  id: string,
): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`🔍 Fetching meal details for ID: ${id}`);

    const result = await mealService.getMealById(
      { id },
      { revalidate: 60, tags: ["meal", `meal-${id}`] },
    );

    if (result.error) {
      console.error(`❌ Failed to fetch meal ${id}:`, result.error.message);
      return {
        success: false,
        error: result.error.message,
        data: null,
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
        data: null,
      };
    }
  } catch (error) {
    console.error(`❌ Unexpected error fetching meal ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch meal",
      data: null,
    };
  }
}

// Create new meal
export async function createMeal(
  mealData: MealData,
): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log("🍽️ [FRONTEND ACTION] Starting meal creation process");
    console.log("📝 [FRONTEND ACTION] Meal data to create:", {
      name: mealData.name,
      description: mealData.description,
      price: mealData.price,
      image: mealData.image,
      ingredients: mealData.ingredients,
      allergens: mealData.allergens,
      prepTime: mealData.prepTime,
      cuisineId: mealData.cuisineId,
      isFeatured: mealData.isFeatured,
      categoryId: mealData.categoryId,
    });

    console.log("🚀 [FRONTEND ACTION] Calling meal service to create meal");

    const result = await mealService.createMeal(mealData);

    if (result.error) {
      console.error(
        "❌ [FRONTEND ACTION] Meal creation failed:",
        result.error.message,
      );
      console.error("🔍 [FRONTEND ACTION] Error details:", result.error);
      return {
        success: false,
        error: result.error.message,
        data: null,
      };
    }

    if (result.data) {
      console.log("✅ [FRONTEND ACTION] Meal created successfully:", {
        mealId: result.data.id,
        mealName: result.data.name,
        price: result.data.price,
        categoryId: result.data.categoryId,
        providerId: result.data.providerId,
      });

      console.log("🔄 [FRONTEND ACTION] Revalidating dashboard menu path");
      revalidatePath("/dashboard/menu");
      revalidatePath("/browse");

      return { success: true, data: result.data, error: null };
    } else {
      console.error(
        "❌ [FRONTEND ACTION] No meal data returned after creation",
      );
      return {
        success: false,
        error: "Failed to create meal: No data returned",
        data: null,
      };
    }
  } catch (error) {
    console.error(
      "💥 [FRONTEND ACTION] Unexpected error during meal creation:",
      error,
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create meal",
      data: null,
    };
  }
}

// Update existing meal
export async function updateMeal(
  id: string,
  mealData: Partial<MealData>,
): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`🍽️ Updating meal: ${id}`);

    const result = await mealService.updateMeal(id, mealData);

    if (result.error) {
      console.error("❌ Failed to update meal:", result.error.message);
      return {
        success: false,
        error: result.error.message,
        data: null,
      };
    }

    if (result.data) {
      console.log(`✅ Meal updated successfully: ${result.data.name}`);
      revalidatePath(`/browse/meal/${id}`);
      revalidatePath("/browse");
      revalidatePath("/admin/meals");
      revalidatePath("/dashboard/menu");
      return { success: true, data: result.data, error: null };
    } else {
      console.error("❌ No meal data returned");
      return {
        success: false,
        error: "Failed to update meal",
        data: null,
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error updating meal:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update meal",
      data: null,
    };
  }
}

// Delete meal
export async function deleteMeal(
  id: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log(`🗑️ Deleting meal: ${id}`);

    const result = await mealService.deleteMeal(id);

    if (result.error) {
      console.error("❌ Failed to delete meal:", result.error.message);
      return {
        success: false,
        error: result.error.message,
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
        error: "Failed to delete meal",
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error deleting meal:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete meal",
    };
  }
}

// Toggle meal featured status
export async function toggleFeatured(
  id: string,
  isFeatured: boolean,
): Promise<{ success: boolean; data: Meal | null; error: string | null }> {
  try {
    console.log(`⭐ Toggling featured status for meal ${id} to: ${isFeatured}`);

    const result = await mealService.toggleFeatured(id, isFeatured);

    if (result.error) {
      console.error(
        "❌ Failed to toggle featured status:",
        result.error.message,
      );
      return {
        success: false,
        error: result.error.message,
        data: null,
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
        data: null,
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error toggling featured status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to toggle featured status",
      data: null,
    };
  }
}

// Revalidate meal cache
export async function revalidateMeal(id: string) {
  revalidatePath(`/browse/meal/${id}`);
  revalidatePath("/browse");
  console.log(`🔄 Revalidated meal cache for: ${id}`);
}
