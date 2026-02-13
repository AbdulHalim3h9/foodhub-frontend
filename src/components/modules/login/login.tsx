"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Login1Props {
  heading?: string;
  subheading?: string;
  logo?: {
    url: string;
    text: string;
  };
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  forgotPasswordUrl?: string;
  className?: string;
}

const Login = ({
  heading = "Welcome back",
  subheading = "Enter your credentials to access your account",
  logo = {
    url: "/",
    text: "FoodHub",
  },
  buttonText = "Sign in",
  signupText = "Don't have an account?",
  signupUrl = "/signup",
  forgotPasswordUrl = "/forgot-password",
  className,
}: Login1Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    // Add your login logic here
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      {/* Logo */}
      <div className="text-center mb-8">
        <a href={logo.url} className="inline-block">
          <span className="text-3xl font-bold text-primary tracking-tight">
            {logo.text}
          </span>
        </a>
      </div>

      {/* Login Card */}
      <div className="bg-card text-card-foreground rounded-xl shadow-lg border p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{heading}</h1>
          {subheading && (
            <p className="text-sm text-muted-foreground">{subheading}</p>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href={forgotPasswordUrl}
                className="text-xs text-primary hover:text-primary/80 font-medium"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Submit */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button type="submit" className="px-8">
              {buttonText}
            </Button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            {signupText}{" "}
            <a
              href={signupUrl}
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing, you agree to FoodHub's{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export { Login };
