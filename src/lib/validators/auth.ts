import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  phone: z.string().min(9, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const providerRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  phone: z.string().min(9, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  // Provider-specific fields
  businessName: z.string().min(2, "Business name is required"),
  businessDescription: z.string().optional(),
  businessPhone: z.string().min(9, "Business phone is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  website: z.string().url().optional(),
  cuisine: z.string().optional(),
  deliveryRadius: z.coerce.number().min(1, "Delivery radius must be at least 1 mile").optional(),
  openingHours: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type ProviderRegisterInput = z.infer<typeof providerRegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
