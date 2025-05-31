"use client";

import { Suspense } from "react";
import { useAsyncData, asyncDataFetchers } from "@/lib/hooks/useAsyncData";
import { authHelpers } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import {
  ErrorBoundary,
  AuthErrorFallback,
  DashboardSkeletonFallback,
} from "@/components/fallbacks";

function DashboardContent() {
  // Using checkAuthStatus instead of getCurrentUser to avoid errors
  const user = useAsyncData(asyncDataFetchers.checkAuthStatus);

  // Redirect to auth if no user is found
  if (user === null) {
    console.log("No user found on dashboard, redirecting to auth");
    redirect("/auth");
  }

  const handleSignOut = async () => {
    try {
      await authHelpers.signOut();
      // After sign out, redirect will happen automatically via the auth state change
      redirect("/auth");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Don't render anything if no user (will redirect)
  if (!user) {
    return (
      <div className="min-h-svh bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-4">Checking authentication...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Catan App Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm hover:bg-destructive/90 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Welcome to Catan!</h2>
          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">User Information</h3>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Last Sign In:</strong>{" "}
                {user?.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Set up your game preferences</li>
              <li>• Create or join a Catan game</li>
              <li>• Invite friends to play</li>
              <li>• View game statistics</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ErrorBoundary fallback={<AuthErrorFallback />}>
      <Suspense fallback={<DashboardSkeletonFallback />}>
        <DashboardContent />
      </Suspense>
    </ErrorBoundary>
  );
}
