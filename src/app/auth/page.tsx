"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { AuthForm } from "@/components/blocks/auth-form";
import { AuthFormData } from "@/lib/schema/auth-schemas";
import { AuthFormType } from "@/app/auth/auth-config";
import { authHelpers } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await authHelpers.getCurrentUser();
      if (user) {
        router.push("/dashboard"); // Redirect to dashboard or home page
      }
    };

    checkUser();

    // Check for error in URL params
    const urlError = searchParams.get("error");
    if (urlError) {
      setError(decodeURIComponent(urlError));
    }

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, searchParams]);

  const handleFormSubmit = async (data: AuthFormData, type: AuthFormType) => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    setError(null);

    try {
      if (type === "Login") {
        const { data: authData, error: authError } = await authHelpers.signIn(
          data.email,
          data.password
        );

        if (authError) {
          throw new Error(authError.message);
        }

        if (authData?.user) {
          console.log("Successfully logged in!");
          router.push("/dashboard");
        }
      } else {
        // Handle signup
        const signupData = data as {
          email: string;
          password: string;
          confirmPassword: string;
        };

        const { data: authData, error: authError } = await authHelpers.signUp(
          signupData.email,
          signupData.password
        );

        if (authError) {
          throw new Error(authError.message);
        }

        if (authData?.user) {
          console.log(
            "Account created! Please check your email to verify your account."
          );
          setError(null);
          // Show success message instead of error
          setError(
            "Account created! Please check your email to verify your account."
          );
          // Don't redirect immediately for signup - user needs to verify email
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error(`${type} error:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (type: AuthFormType) => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // OAuth redirect will happen automatically
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google authentication failed";
      setError(errorMessage);
      console.error("Google auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <GalleryVerticalEnd className="size-8" />
          <h1 className="text-2xl font-bold text-center">Catan App</h1>
        </div>

        {error && (
          <div
            className={`px-4 py-3 rounded-md text-sm ${
              error.includes("Account created")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-destructive/15 text-destructive"
            }`}
          >
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-sm text-muted-foreground">
            Please wait...
          </div>
        )}

        <AuthForm onSubmit={handleFormSubmit} onGoogleAuth={handleGoogleAuth} />
      </div>
    </div>
  );
}
