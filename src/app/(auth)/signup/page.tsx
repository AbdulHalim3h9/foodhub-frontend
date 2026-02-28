"use client";

import { Signup } from "@/components/modules/signup/signup";

export default function RegisterPage() {
  return (
    <Signup
      heading="Create Account"
      buttonText="Sign Up"
      loginText="Already have an account?"
      loginUrl="/login"
    />
  );
}
