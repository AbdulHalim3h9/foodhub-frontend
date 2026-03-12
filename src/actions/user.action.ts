"use server";

import {
  userService,
  GetUsersParams,
} from "@/services/user.service";

export async function getUsers(params: GetUsersParams = {}) {
  try {
    const result = await userService.getAllUsers(params);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getUserById(id: string) {
  try {
    const result = await userService.getUserById(id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUserStatus(
  id: string,
  status: "active" | "inactive" | "suspended"
) {
  try {
    const result = await userService.updateUserStatus(id, status);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update user status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUser(
  id: string,
  userData: {
    name?: string;
    phone?: string;
    address?: string;
    role?: string;
    status?: string;
  }
) {
  try {
    const result = await userService.updateUser(id, userData);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await userService.deleteUser(id);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}