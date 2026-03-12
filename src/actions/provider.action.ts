"use server";

import {
  providerService,
  GetProvidersParams,
} from "@/services/provider.service";

export async function getProviders(params: GetProvidersParams = {}) {
  try {
    const result = await providerService.getAllProviders(params);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch providers:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getProviderById(id: string) {
  try {
    const result = await providerService.getProviderById(id);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch provider:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
