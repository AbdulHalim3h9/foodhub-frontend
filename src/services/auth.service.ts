import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerSchema, loginSchema, RegisterInput, LoginInput } from "@/lib/validators/auth";
import { z } from "zod";

export class AuthService {
  private static readonly API_URL = process.env.AUTH_URL;

  static async register(data: RegisterInput): Promise<{ token: string; user: any }> {
    const response = await fetch(`${this.API_URL}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": `${process.env.FRONTEND_URL}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  }

  static async login(data: LoginInput): Promise<{ token: string; user: any }> {
    const response = await fetch(`${this.API_URL}/sign-in/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": `${process.env.FRONTEND_URL}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Invalid credentials");
    }

    return response.json();
  }

  static async setAuthCookie(token: string): Promise<void> {
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  static async validateAndRegister(formData: FormData): Promise<{
    errors?: Record<string, string[]>;
    message?: string;
    success?: boolean;
  }> {
    try {
      // 1. Parse + validate
      const parsed = registerSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { 
          errors: z.flattenError(parsed.error).fieldErrors,
          message: "Please fix the errors below.",
          success: false 
        };
      }

      // 2. Call API
      const { token } = await this.register(parsed.data);

      // 3. Store token
      await this.setAuthCookie(token);

    } catch (error) {
      console.error("Registration error:", error);
      return {
        message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        success: false,
      };
    }

    // 4. Redirect
    redirect("/dashboard");
  }

  static async validateAndLogin(formData: FormData): Promise<{
    errors?: Record<string, string[]>;
    message?: string;
    success?: boolean;
  }> {
    try {
      // 1. Parse + validate
      const parsed = loginSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { 
          errors: z.flattenError(parsed.error).fieldErrors,
          message: "Please fix the errors below.",
          success: false 
        };
      }

      // 2. Call API
      const { token } = await this.login(parsed.data);

      // 3. Store token
      await this.setAuthCookie(token);


    } catch (error) {
      console.error("Login error:", error);
      return {
        message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        success: false,
      };
    }

    redirect("/dashboard");
  }
}
