"use server";

import { AuthService } from "@/services/auth/auth.service";

export type AuthState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export async function loginAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  return AuthService.validateAndLogin(formData);
}
