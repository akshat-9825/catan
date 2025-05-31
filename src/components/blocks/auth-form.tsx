"use client";

import { AuthFormType, getAuthConfig } from "@/app/auth/auth-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthFormData } from "@/lib/schema/auth-schemas";
import { cn } from "@/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthDivider } from "./auth-divider";
import { AuthToggle } from "./auth-toggle";
import { EmailPasswordForm } from "./email-password-form";
import { GoogleAuthButton } from "./google-auth-button";

type AuthFormProps = {
  className?: string;
  initialType?: AuthFormType;
  onSubmit?: (data: AuthFormData, type: AuthFormType) => void;
  onGoogleAuth?: (type: AuthFormType) => void;
} & Omit<React.ComponentProps<"div">, "onSubmit">;

export function AuthForm({
  className,
  initialType = "Login",
  onSubmit,
  onGoogleAuth,
  ...props
}: AuthFormProps) {
  const [type, setType] = useState<AuthFormType>(initialType);
  const config = getAuthConfig(type);

  const form = useForm<AuthFormData>({
    resolver: zodResolver(config.schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      ...(type === "Signup" && { confirmPassword: "" }),
    },
  });

  const handleTypeChange = () => {
    const newType = type === "Login" ? "Signup" : "Login";
    setType(newType);

    form.reset({
      email: "",
      password: "",
      ...(newType === "Signup" && { confirmPassword: "" }),
    });

    form.clearErrors();
  };

  const handleFormSubmit = (data: AuthFormData) => {
    console.log("Form submitted:", { data, type });
    onSubmit?.(data, type);
  };

  const handleGoogleAuth = () => {
    console.log("Google auth clicked:", type);
    onGoogleAuth?.(type);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="grid gap-6">
              <GoogleAuthButton
                config={config}
                onGoogleAuth={handleGoogleAuth}
              />

              {config.showGoogleAuth && <AuthDivider />}

              <EmailPasswordForm
                config={config}
                form={form}
                onSubmit={handleFormSubmit}
              />

              <AuthToggle config={config} onToggle={handleTypeChange} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
