"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { RegisterInput, LoginInput } from "@/lib/validators/auth";

const API_URL = process.env.API_URL || "http://localhost:5000/api";

export const registerUser = async (userData: RegisterInput) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("token", result.data.accessToken || result.data.token);
    }

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Registration failed" };
  }
};

export const loginUser = async (userData: LoginInput) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("token", result.data.accessToken || result.data.token);
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed" };
  }
};

export const getUser = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;

    if (token) {
      const decodedData = jwtDecode(token);
      return decodedData;
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const logoutUser = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
