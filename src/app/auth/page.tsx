"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { AuthForm } from "@/components/blocks/auth-form";
import { AuthFormData } from "@/lib/schema/auth-schemas";
import { AuthFormType } from "@/app/auth/auth-config";

export default function LoginPage() {
  const handleFormSubmit = (data: AuthFormData, type: AuthFormType) => {
    console.log(`${type} form submitted:`, data);

    // Here you would typically handle the authentication
    // For example, calling your auth API
    if (type === "Login") {
      // Handle login
      console.log("Logging in with:", data.email, data.password);
    } else {
      // Handle signup
      console.log("Signing up with:", data.email, data.password);
      if ("confirmPassword" in data) {
        console.log("Password confirmed:", data.confirmPassword);
      }
    }
  };

  const handleGoogleAuth = (type: AuthFormType) => {
    console.log(`${type} with Google clicked`);
    // Handle Google authentication
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Catan App</h1>
        <AuthForm onSubmit={handleFormSubmit} onGoogleAuth={handleGoogleAuth} />
      </div>
    </div>
  );
}
