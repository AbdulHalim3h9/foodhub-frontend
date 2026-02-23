import { Signup } from "@/components/modules/signup/signup";

export default function RegisterPage() {
  return (
    <Signup
      heading="Register"
      buttonText="Create Account"
      loginText="Already a user?"
      loginUrl="/login"
    />
  );
}
