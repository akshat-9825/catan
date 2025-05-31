"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error);
          router.push("/auth?error=" + encodeURIComponent(error.message));
          return;
        }

        if (data?.session?.user) {
          // Successfully authenticated, redirect to dashboard
          router.push("/dashboard");
        } else {
          // No session found, redirect back to auth
          router.push("/auth");
        }
      } catch (err) {
        console.error("Unexpected error in auth callback:", err);
        router.push("/auth?error=authentication_failed");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">
          Completing authentication...
        </p>
      </div>
    </div>
  );
}
