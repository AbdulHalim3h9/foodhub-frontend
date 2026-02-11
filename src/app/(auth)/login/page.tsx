import { Login } from "@/components/modules/login/login";

export default function LoginPage() {
  return (
    <Login 
      heading="Welcome back"
      subheading="Enter your credentials to access your account"
      logo={{
        url: "/",
        text: "FoodHub",
      }}
      buttonText="Sign in"
      googleText="Continue with Google"
      signupText="Don't have an account?"
      signupUrl="/signup"
      forgotPasswordUrl="/forgot-password"
    />
  );
}