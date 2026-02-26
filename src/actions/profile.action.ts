"use server";

import { profileService } from "@/services/profile.service";
import { revalidatePath } from "next/cache";

export async function getMyProfile() {
  try {
    console.log("👤 Fetching user profile");
    
    const result = await profileService.getMyProfile(
      { revalidate: 60, tags: ["profile"] }
    );

    if (result.error) {
      console.error("❌ Failed to fetch profile:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Profile loaded: ${result.data.name}`);
      return { success: true, data: result.data };
    } else {
      console.error("❌ No profile data found");
      return { 
        success: false, 
        error: "Profile not found",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error fetching profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch profile",
      data: null 
    };
  }
}

export async function updateProfile(updateData: {
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
}) {
  try {
    console.log("👤 Updating user profile");
    
    const result = await profileService.updateProfile(
      updateData,
      { revalidate: 0, tags: ["profile"] }
    );

    if (result.error) {
      console.error("❌ Failed to update profile:", result.error.message);
      return { 
        success: false, 
        error: result.error.message,
        data: null 
      };
    }

    if (result.data) {
      console.log(`✅ Profile updated: ${result.data.name}`);
      revalidatePath("/profile");
      return { success: true, data: result.data };
    } else {
      console.error("❌ No profile data returned");
      return { 
        success: false, 
        error: "Failed to update profile",
        data: null 
      };
    }
  } catch (error) {
    console.error("❌ Unexpected error updating profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update profile",
      data: null 
    };
  }
}
