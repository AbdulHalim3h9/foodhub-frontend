import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignupProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Signup = ({
  heading = "Create an Account",
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/foodhub/block/logos/foodhub-wordmark.svg",
    alt: "FoodHub",
    title: "FoodHub",
  },
  buttonText = "Create Account",
  signupText = "Already have an account?",
  signupUrl = "/login",
  className,
}: SignupProps) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="flex flex-col items-center gap-6">
        <a href={logo.url} className="mb-2">
          <span className="text-3xl font-bold text-primary tracking-tight">
            FoodHub
          </span>
        </a>

        <div className="w-full rounded-xl border bg-card text-card-foreground shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{heading}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Join us to start ordering delicious food.
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input type="email" placeholder="m@example.com" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input type="password" placeholder="Create a password" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              {buttonText}
            </Button>
          </form>

          <div className="flex justify-center gap-1 text-sm text-muted-foreground mt-6">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Signup };
