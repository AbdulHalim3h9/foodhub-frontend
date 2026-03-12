"use server";

import {
  registerUser,
  loginUser,
  logoutUser,
} from "@/services/auth.service";

export type AuthState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export async function signupAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = Object.fromEntries(formData.entries());
  // Basic mapping of FormData to RegisterInput
  const result = await registerUser(data as any);
  return result;
}

export async function loginAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const data = Object.fromEntries(formData.entries());
  const result = await loginUser(data as any);
  return result;
}

export async function logoutAction() {
  return logoutUser();
}
