/**
 * AuthForm Examples - Demonstrating the dynamic form system
 *
 * This file shows various ways to use the AuthForm component with different configurations
 */

"use client";

import { AuthForm } from "./auth-form";
import { AuthFormData } from "@/lib/schema/auth-schemas";
import { AuthFormType, simpleLoginConfig } from "@/app/auth/auth-config";

// Example 1: Basic usage with default configuration
export function BasicAuthFormExample() {
  const handleSubmit = (data: AuthFormData, type: AuthFormType) => {
    console.log("Form submitted:", { data, type });
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      onGoogleAuth={(type) => console.log(`${type} with Google`)}
    />
  );
}

// Example 2: Starting with signup mode
export function SignupFirstExample() {
  return (
    <AuthForm
      initialType="Signup"
      onSubmit={(data, type) => console.log("Signup form:", { data, type })}
    />
  );
}

// Example 3: Custom styled with additional props
export function CustomStyledExample() {
  return (
    <AuthForm
      className="max-w-md mx-auto"
      onSubmit={(data, type) => {
        // Custom validation or processing
        if (type === "Signup" && "confirmPassword" in data) {
          console.log("Password confirmation validated");
        }
        // Submit to your API
        console.log("Submitting to API:", data);
      }}
      onGoogleAuth={(type) => {
        // Handle Google OAuth
        console.log("Initiating Google OAuth for:", type);
      }}
    />
  );
}

// Example 4: Form with real validation handling
export function ValidationExample() {
  const handleSubmit = async (data: AuthFormData, type: AuthFormType) => {
    try {
      // The data is already validated by zod at this point
      console.log("Valid data received:", data);

      if (type === "Login") {
        // Login API call
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Login successful");
          // Redirect or update state
        }
      } else {
        // Signup API call
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Signup successful");
          // Redirect or update state
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      onGoogleAuth={async (type) => {
        // Handle Google OAuth
        try {
          const response = await fetch(`/api/auth/google?type=${type}`);
          // Process Google auth response
        } catch (error) {
          console.error("Google auth error:", error);
        }
      }}
    />
  );
}

/**
 * Available Configuration Options:
 *
 * 1. initialType: "Login" | "Signup" - Starting form type
 * 2. onSubmit: (data, type) => void - Form submission handler
 * 3. onGoogleAuth: (type) => void - Google auth handler
 * 4. className: string - Custom styling
 *
 * Form Validation:
 * - Email: Must be valid email format
 * - Password (Login): Required, any length
 * - Password (Signup): Min 8 chars, must contain uppercase, lowercase, and number
 * - Confirm Password: Must match password field
 *
 * The form automatically handles:
 * - Field validation with real-time error messages
 * - Form state management
 * - Schema switching when toggling between login/signup
 * - Loading states during submission
 * - Accessible form labels and error messages
 */
