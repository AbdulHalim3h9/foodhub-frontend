"use server";

import { AuthService } from "@/services/auth.service";

export type AuthState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export async function signupAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  return AuthService.validateAndRegister(formData);
}

export async function loginAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  return AuthService.validateAndLogin(formData);
}
