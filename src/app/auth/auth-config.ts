import { z } from "zod";
import { loginSchema, signupSchema } from "../../lib/schema/auth-schemas";

export type AuthFormType = "Login" | "Signup";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder?: string;
  required?: boolean;
  showForgotPassword?: boolean;
}

export interface AuthFormConfig {
  type: AuthFormType;
  title: string;
  description: string;
  fields: FormFieldConfig[];
  submitButtonText: string;
  toggleText: string;
  toggleLinkText: string;
  schema: z.ZodSchema;
  showGoogleAuth: boolean;
  showConfirmPassword: boolean;
}

// Login configuration
export const loginConfig: AuthFormConfig = {
  type: "Login",
  title: "Welcome back",
  description: "Login with your Google account or email",
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "m@example.com",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      showForgotPassword: true,
    },
  ],
  submitButtonText: "Login",
  toggleText: "Don't have an account?",
  toggleLinkText: "Sign up",
  schema: loginSchema,
  showGoogleAuth: true,
  showConfirmPassword: false,
};

// Signup configuration
export const signupConfig: AuthFormConfig = {
  type: "Signup",
  title: "Create an account",
  description: "Sign up with your Google account or email",
  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "m@example.com",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ],
  submitButtonText: "Sign up",
  toggleText: "Already have an account?",
  toggleLinkText: "Login",
  schema: signupSchema,
  showGoogleAuth: true,
  showConfirmPassword: true,
};

// Example: Custom configuration with only email/password (no Google auth)
export const simpleLoginConfig: AuthFormConfig = {
  type: "Login",
  title: "Sign In",
  description: "Enter your credentials to continue",
  fields: [
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      showForgotPassword: false, // Hide forgot password link
    },
  ],
  submitButtonText: "Sign In",
  toggleText: "New here?",
  toggleLinkText: "Create account",
  schema: loginSchema,
  showGoogleAuth: false, // Disable Google auth
  showConfirmPassword: false,
};

// Helper function to get config by type
export const getAuthConfig = (type: AuthFormType): AuthFormConfig => {
  return type === "Login" ? loginConfig : signupConfig;
}; 