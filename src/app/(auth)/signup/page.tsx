import { Signup } from "@/components/modules/signup/signup";

export default function RegisterPage() {
  return (
    <Signup
      heading="Register"
      logo={{
        url: "https://www.foodhub.com",
        src: "https://deifkwefumgah.cloudfront.net/foodhub/block/logos/foodhub-wordmark.svg",
        alt: "logo",
        title: "foodhub.com",
      }}
      buttonText="Create Account"
      googleText="Continue with Google"
      signupText="Already a user? Login"
      signupUrl="/login"
      className="max-w-md"
    />
  );
}
