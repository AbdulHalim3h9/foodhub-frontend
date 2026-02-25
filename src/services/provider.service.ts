import { env } from "../../env";

const API_URL = env.API_URL;

export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  description?: string;
  logo?: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  _count: {
    meals: number;
    orders: number;
  };
}

export interface GetProvidersParams {
  search?: string;
  isActive?: boolean;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

export interface PaginatedProviders {
  data: Provider[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class ProviderService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/provider`;
  }

  async getAllProviders(
    params?: GetProvidersParams,
    options?: ServiceOptions,
  ): Promise<PaginatedProviders> {
    console.log("Fetching providers with params:", params);
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.append("search", params.search);
    if (params?.isActive !== undefined)
      searchParams.append("isActive", String(params.isActive));
    if (params?.page) searchParams.append("page", params.page);
    if (params?.limit) searchParams.append("limit", params.limit);
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    const url = searchParams.toString()
      ? `${this.baseUrl}?${searchParams.toString()}`
      : this.baseUrl;
    console.log("Base URL:", this.baseUrl);
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: options?.revalidate ?? 60,
        tags: options?.tags ?? ["providers"],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch providers: ${response.statusText}`);
    }

    return response.json();
  }

  async getProviderById(id: string, options?: ServiceOptions) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: options?.revalidate ?? 60,
        tags: options?.tags ?? [`provider-${id}`],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch provider: ${response.statusText}`);
    }

    return response.json();
  }
}

export const providerService = new ProviderService();
