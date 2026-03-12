import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
  avatar?: string; // For backward compatibility
  role: "customer" | "provider" | "admin";
  status: "active" | "inactive" | "suspended";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  joinDate?: string; // For backward compatibility
  totalOrders?: number;
  rating?: number;
  _count?: {
    orders: number;
    reviews: number;
  };
}

export interface GetUsersParams {
  search?: string;
  role?: "customer" | "provider" | "admin";
  status?: "active" | "inactive" | "suspended";
  isActive?: boolean;
  page?: string;
  limit?: string;
  sortBy?: "name" | "email" | "createdAt" | "lastLogin";
  sortOrder?: "asc" | "desc";
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

export interface PaginatedUsers {
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class UserService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/admin/users`;
  }

  async getAllUsers(
    params?: GetUsersParams,
    options?: ServiceOptions,
  ): Promise<PaginatedUsers> {
    console.log("Fetching users with params:", params);
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.append("search", params.search);
    if (params?.role) searchParams.append("role", params.role);
    if (params?.status) searchParams.append("status", params.status);
    if (params?.isActive !== undefined)
      searchParams.append("isActive", String(params.isActive));
    if (params?.page) searchParams.append("page", params.page);
    if (params?.limit) searchParams.append("limit", params.limit);
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    const url = searchParams.toString()
      ? `${this.baseUrl}?${searchParams.toString()}`
      : this.baseUrl;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("Token:", token ? "Present" : "Missing");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserById(id: string, options?: ServiceOptions): Promise<User> {
    console.log("Fetching user by ID:", id);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  }

  async updateUserStatus(
    id: string,
    status: "active" | "inactive" | "suspended",
    options?: ServiceOptions,
  ): Promise<User> {
    console.log("Updating user status:", id, status);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${this.baseUrl}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user status: ${response.statusText}`);
    }

    return response.json();
  }

  async updateUser(
    id: string,
    userData: {
      name?: string;
      phone?: string;
      address?: string;
      role?: string;
      status?: string;
    },
    options?: ServiceOptions,
  ): Promise<User> {
    console.log("Updating user:", id, userData);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteUser(id: string, options?: ServiceOptions): Promise<void> {
    console.log("Deleting user:", id);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  }
}

export const userService = new UserService();
