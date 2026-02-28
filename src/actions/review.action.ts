"use server";

import {
  reviewService,
  Review,
  PaginatedReviews,
  CreateReviewData,
  GetReviewsParams,
} from "@/services/review.service";
import { revalidatePath, revalidateTag } from "next/cache";

// Get reviews for a meal
export async function getMealReviews(
  mealId: string,
  params?: GetReviewsParams,
): Promise<{
  success: boolean;
  data: PaginatedReviews | null;
  error: string | null;
}> {
  try {
    const result = await reviewService.getMealReviews(mealId, params, {
      revalidate: 60,
      tags: [`meal-${mealId}-reviews`],
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
        data: null,
      };
    }

    if (result.data) {
      return { success: true, data: result.data, error: null };
    } else {
      return {
        success: false,
        error: "Reviews not found",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch reviews",
      data: null,
    };
  }
}

// Create a new review
export async function createMealReview(
  mealId: string,
  reviewData: CreateReviewData,
): Promise<{ success: boolean; data: Review | null; error: string | null }> {
  try {
    const result = await reviewService.createReview(mealId, reviewData, {
      revalidate: 0,
      tags: [`meal-${mealId}-reviews`],
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
        data: null,
      };
    }

    if (result.data) {
      revalidatePath(`/browse/${mealId}`);
      revalidatePath("/orders");
      return { success: true, data: result.data.data, error: null };
    } else {
      return {
        success: false,
        error: "Failed to create review",
        data: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create review",
      data: null,
    };
  }
}

// Delete a review
export async function deleteMealReview(
  mealId: string,
  reviewId: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    const result = await reviewService.deleteReview(mealId, reviewId, {
      revalidate: 0,
      tags: [`meal-${mealId}-reviews`],
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message,
      };
    }

    if (result.data) {
      revalidatePath(`/browse/${mealId}`);
      revalidatePath("/orders");
      return { success: true, error: null };
    } else {
      return {
        success: false,
        error: "Failed to delete review",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete review",
    };
  }
}
