import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface Review {
  id: string;
  customerId: string;
  mealId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface PaginatedReviews {
  data: Review[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateReviewData {
  rating: number;
  comment?: string;
}

export interface GetReviewsParams {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class ReviewService {
  private basePath: string;

  constructor() {
    this.basePath = `${API_URL}/meals`;
  }

  // Get reviews for a meal
  async getMealReviews(
    mealId: string,
    params?: GetReviewsParams,
    options?: ServiceOptions,
  ): Promise<{
    data: PaginatedReviews | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const searchParams = new URLSearchParams();

      if (params) {
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params.sortOrder)
          searchParams.append("sortOrder", params.sortOrder);
      }

      const queryString = searchParams.toString();
      const endpoint = `${this.basePath}/${mealId}/reviews${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 60,
          tags: options?.tags ?? [`meal-${mealId}-reviews`],
        },
      });

      if (!response.ok) {
        return {
          data: null,
          error: { message: `Failed to fetch reviews: ${response.statusText}` },
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }

  // Create a new review
  async createReview(
    mealId: string,
    data: CreateReviewData,
    options?: ServiceOptions,
  ): Promise<{
    data: { success: boolean; message: string; data: Review } | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const response = await fetch(`${this.basePath}/${mealId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        body: JSON.stringify(data),
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? [`meal-${mealId}-reviews`],
        },
      });

      if (!response.ok) {
        let errorMessage = `Failed to create review: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage =
              typeof errorData.error === "string"
                ? errorData.error
                : errorData.error.message || JSON.stringify(errorData.error);
          }
        } catch (parseError) {
          console.log("Could not parse error response, using status text");
        }

        return {
          data: null,
          error: { message: errorMessage },
        };
      }

      const responseData = await response.json();
      return { data: responseData, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }

  // Delete a review
  async deleteReview(
    mealId: string,
    reviewId: string,
    options?: ServiceOptions,
  ): Promise<{
    data: { success: boolean; message: string } | null;
    error: { message: string } | null;
  }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const response = await fetch(`${this.basePath}/${mealId}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? [`meal-${mealId}-reviews`],
        },
      });

      if (!response.ok) {
        let errorMessage = `Failed to delete review: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage =
              typeof errorData.error === "string"
                ? errorData.error
                : errorData.error.message || JSON.stringify(errorData.error);
          }
        } catch (parseError) {
          console.log("Could not parse error response, using status text");
        }

        return {
          data: null,
          error: { message: errorMessage },
        };
      }

      const responseData = await response.json();
      return { data: responseData, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error ? error.message : "Something Went Wrong",
        },
      };
    }
  }
}

export const reviewService = new ReviewService();
