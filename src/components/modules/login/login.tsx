"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { loginAction } from "@/actions/auth";
import { loginSchema } from "@/lib/validators/auth";

interface LoginProps {
  heading?: string;
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

export function Login({
  heading,
  buttonText,
  signupText,
  signupUrl,
  className,
}: LoginProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");

      try {
        const formData = new FormData();
        formData.append("email", value.email);
        formData.append("password", value.password);

        const result = await loginAction({} as any, formData);

        if (result.message && !result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }

        toast.success("Login successful!", { id: toastId });
      } catch (err: any) {
        // NEXT_REDIRECT is expected behavior when server action redirects
        if (err?.message?.includes('NEXT_REDIRECT')) {
          return;
        }
        console.log(err);
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center px-8",
        className,
      )}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-start mb-8">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="m@example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <div className="flex flex-col gap-4 mt-8">
          <Button
            type="submit"
            form="login-form"
            disabled={!form.state.canSubmit || form.state.isSubmitting}
            className="w-full"
          >
            {form.state.isSubmitting ? "Signing In..." : buttonText}
          </Button>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
