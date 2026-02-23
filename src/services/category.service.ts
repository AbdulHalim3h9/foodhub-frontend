import { env } from "../../env";

const API_URL = env.API_URL;

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryData {
  name: string;
  description?: string;
  image?: string;
}

export interface GetCategoriesParams {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class CategoryService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/categories`;
  }

  async getCategories(params?: GetCategoriesParams, options?: ServiceOptions) {
    try {
      const searchParams = new URLSearchParams();
      
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page);
      if (params?.limit) searchParams.append('limit', params.limit);
      if (params?.sort) searchParams.append('sort', params.sort);

      const url = searchParams.toString() 
        ? `${this.baseUrl}?${searchParams.toString()}`
        : this.baseUrl;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: options?.revalidate || 3600,
          tags: options?.tags || ['categories'],
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Category service error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch categories',
        },
      };
    }
  }

  async getCategoryById(id: string, options?: ServiceOptions) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: options?.revalidate || 3600,
          tags: options?.tags || [`category-${id}`],
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Category service error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to fetch category',
        },
      };
    }
  }

  async createCategory(categoryData: CategoryData, authToken?: string) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create category: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Category service error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to create category',
        },
      };
    }
  }

  async updateCategory(id: string, categoryData: Partial<CategoryData>, authToken?: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Category service error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to update category',
        },
      };
    }
  }

  async deleteCategory(id: string, authToken?: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete category: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Category service error:', error);
      return {
        error: {
          message: error instanceof Error ? error.message : 'Failed to delete category',
        },
      };
    }
  }
}

export const categoryService = new CategoryService();