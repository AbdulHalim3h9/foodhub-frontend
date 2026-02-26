import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  address?: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  providerProfile?: {
    id: string;
    businessName: string;
    description?: string;
    logo?: string;
    phone: string;
    address: string;
    isActive: boolean;
  };
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class ProfileService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/user`;
  }

  async getMyProfile(
    options?: ServiceOptions,
  ): Promise<{ data: UserProfile | null; error: { message: string } | null }> {
    try {
      console.log("🔍 Making API call to:", `${this.baseUrl}/me`);
      
      // Build cookie header for server-side requests
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      console.log("🍪 Cookie header:", cookieHeader);

      const response = await fetch(`${this.baseUrl}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 60,
          tags: options?.tags ?? ["profile"],
        },
      });

      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        return { 
          data: null, 
          error: { message: `Failed to fetch profile: ${response.statusText} (${response.status})` } 
        };
      }

      const data = await response.json();
      console.log("✅ API Response Data:", data);
      return { data, error: null };
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }

  async updateProfile(
    updateData: UpdateProfileData,
    options?: ServiceOptions,
  ): Promise<{ data: UserProfile | null; error: { message: string } | null }> {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        body: JSON.stringify(updateData),
        next: {
          revalidate: options?.revalidate ?? 0,
          tags: options?.tags ?? ["profile"],
        },
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to update profile: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      return { data: data.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }
}

export const profileService = new ProfileService();
