import { env } from "../../env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
  role: string;
  isActive: boolean;
}

export interface ServiceOptions {
  revalidate?: number;
  tags?: string[];
}

class CurrentUserService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/user`;
  }

  async getProfile(
    options?: ServiceOptions,
  ): Promise<{ data: UserProfile | null; error: { message: string } | null }> {
    try {
      // Build cookie header for server-side requests
      const cookieStore = await cookies();
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

      const response = await fetch(`${this.baseUrl}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
          revalidate: options?.revalidate ?? 60,
          tags: options?.tags ?? ["user-profile"],
        },
      });

      if (!response.ok) {
        return { 
          data: null, 
          error: { message: `Failed to fetch user profile: ${response.statusText}` } 
        };
      }

      const data = await response.json();
      
      // Backend returns user data directly, not wrapped in success property
      if (data && data.id) {
        return { data, error: null };
      } else {
        return { 
          data: null, 
          error: { message: 'Invalid user data received' } 
        };
      }
    } catch (error) {
      return { 
        data: null, 
        error: { message: error instanceof Error ? error.message : "Something Went Wrong" } 
      };
    }
  }
}

export const currentUserService = new CurrentUserService();
