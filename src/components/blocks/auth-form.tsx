"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleAuthButton } from "./google-auth-button";
import { AuthDivider } from "./auth-divider";
import { EmailPasswordForm } from "./email-password-form";
import { AuthToggle } from "./auth-toggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthFormType,
  getAuthConfig,
  loginConfig,
  signupConfig,
} from "@/app/auth/auth-config";
import { AuthFormData } from "@/lib/schema/auth-schemas";

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
