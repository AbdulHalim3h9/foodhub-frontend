import { env } from "../../env";

const API_URL = env.API_URL;

export interface Cuisine {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCuisinesParams {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class CuisineService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/cuisines`;
  }

  async getCuisines(params?: GetCuisinesParams, options?: ServiceOptions) {
    try {
      const searchParams = new URLSearchParams();

      if (params?.search) searchParams.append("search", params.search);
      if (params?.page) searchParams.append("page", params.page);
      if (params?.limit) searchParams.append("limit", params.limit);
      if (params?.sort) searchParams.append("sort", params.sort);

      const url = searchParams.toString()
        ? `${this.baseUrl}?${searchParams.toString()}`
        : this.baseUrl;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: options?.revalidate || 3600,
          tags: options?.tags || ["cuisines"],
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cuisines: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Cuisine service error:", error);
      return {
        error: {
          message:
            error instanceof Error ? error.message : "Failed to fetch cuisines",
        },
      };
    }
  }
}

export const cuisineService = new CuisineService();
