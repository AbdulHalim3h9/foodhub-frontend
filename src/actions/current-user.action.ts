"use server";

import { currentUserService } from "@/services/current-user.service";

export async function getCurrentUserProfile() {
  try {
    console.log("👤 Fetching current user profile");
    
    const result = await currentUserService.getProfile(
      { revalidate: 60, tags: ["user-profile"] }
    );

    if (result.error) {
      console.error("❌ Failed to fetch user profile:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ User profile loaded: ${result.data.name}`);
      return { success: true, data: result.data };
    } else {
      console.error("❌ No user profile data found");
      return { 
        success: false, 
        error: "User profile not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching user profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch user profile",
      data: null 
    };
  }
}
