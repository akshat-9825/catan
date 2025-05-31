"use client";

import { AuthFormType } from "@/app/auth/auth-config";
import { AuthForm } from "@/components/blocks/auth-form";
import { PageLoadingFallback } from "@/components/fallbacks/LoadingFallbacks";
import { showToast } from "@/components/toast";
import { asyncDataFetchers, useAsyncData } from "@/lib/hooks/useAsyncData";
import { GalleryVerticalEnd } from "@/lib/icons";
import { AuthFormData } from "@/lib/schema/auth-schemas";
import { authHelpers } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Main auth content component that uses the data
function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check auth status using React 19 use() hook
  const user = useAsyncData(asyncDataFetchers.checkAuthStatus);

  // Redirect if already authenticated
  if (user) {
    showToast.info("You are already logged in", {
      duration: 1000,
    });
    setTimeout(() => {
      redirect("/dashboard");
    }, 1000);
  }

  // Check for error in URL params and show toast
  const urlError = searchParams.get("error");
  if (urlError) {
    showToast.error(decodeURIComponent(urlError));
  }

  const handleFormSubmit = async (data: AuthFormData, type: AuthFormType) => {
    try {
      if (type === "Login") {
        const result = await showToast.promise(
          authHelpers.signIn(data.email, data.password),
          {
            loading: "Signing in...",
            success: () => "Welcome back!",
            error: (error) => `Sign in failed: ${error.message}`,
          }
        );

        if (result.data?.user) {
          router.push("/dashboard");
        }
      } else {
        // Handle signup
        const signupData = data as {
          email: string;
          password: string;
          confirmPassword: string;
        };

        const result = await showToast.promise(
          authHelpers.signUp(signupData.email, signupData.password),
          {
            loading: "Creating account...",
            success: () =>
              "Account created! Please check your email to verify.",
            error: (error) => `Signup failed: ${error.message}`,
          }
        );

        // Don't redirect immediately for signup - user needs to verify email
        if (result.data?.user) {
          showToast.info("Please check your email to verify your account.");
        }
      }
    } catch (err) {
      // Error handling is already done by showToast.promise
      console.error(`${type} error:`, err);
    }
  };

  const handleGoogleAuth = async (type: AuthFormType) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        showToast.error(`Google authentication failed: ${error.message}`);
        return;
      }

      showToast.loading("Redirecting to Google...");
      // OAuth redirect will happen automatically
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google authentication failed";
      showToast.error(errorMessage);
      console.error("Google auth error:", err);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <GalleryVerticalEnd className="size-8" />
          <h1 className="text-2xl font-bold text-center">Catan App</h1>
        </div>

        <AuthForm onSubmit={handleFormSubmit} onGoogleAuth={handleGoogleAuth} />
      </div>
    </div>
  );
}

// Main component with error boundary and suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <AuthPageContent />
    </Suspense>
  );
}
