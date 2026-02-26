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
import { authClient } from "@/lib/auth-client";
import { registerSchema } from "@/lib/validators/auth";
import { useRouter } from "next/navigation";

interface SignupProps {
  heading?: string;
  buttonText?: string;
  loginText?: string;
  loginUrl?: string;
  className?: string;
}

export function Signup({
  heading,
  buttonText,
  loginText,
  loginUrl,
  className,
}: SignupProps) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");

      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          // Better Auth picks up additional fields based on backend config
          // @ts-ignore
          phone: value.phone,
          // @ts-ignore
          address: value.address,
        });

        if (error) {
          toast.error(error.message || "Failed to create account", {
            id: toastId,
          });
          return;
        }

        toast.success("Account created successfully!", { id: toastId });
        
        // Redirect based on user role
        if ((data.user as any).role === "CUSTOMER") {
          router.push("/browse");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      } catch (err) {
        console.error(err);
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
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-start mb-8">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-muted-foreground mt-2">
            Enter your information below to create your account
          </p>
        </div>

        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your full name"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.Field
                name="phone"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                      <Input
                        type="tel"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="123 Main St, City, State"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="Create a password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Confirm your password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
          </FieldGroup>

          <div className="flex flex-col gap-4 mt-8">
            <Button
              type="submit"
              form="signup-form"
              disabled={!form.state.canSubmit || form.state.isSubmitting}
              className="w-full"
            >
              {form.state.isSubmitting ? "Creating..." : buttonText}
            </Button>
            <div className="flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{loginText}</p>
              <a
                href={loginUrl}
                className="font-medium text-primary hover:underline"
              >
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
