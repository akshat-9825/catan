"use client";

import { Suspense } from "react";
import { useAsyncData, asyncDataFetchers } from "@/lib/hooks/useAsyncData";
import { PageLoadingFallback } from "@/components/fallbacks";
import Link from "next/link";
import { redirect } from "next/navigation";

function HomeContent() {
  // Using the reusable async data fetcher to check auth status
  const user = useAsyncData(asyncDataFetchers.checkAuthStatus);

  console.log("user", user);

  if (user) {
    console.log("User is present, redirecting to dashboard...");
    redirect("/dashboard");
  }

  // Show welcome page for unauthenticated users
  return (
    <div className="min-h-svh bg-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Catan App</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The ultimate digital companion for your Settlers of Catan games. Track
          scores, manage games, and play with friends online.
        </p>

        <div className="space-y-4">
          <Link
            href="/auth"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>

          <div className="text-sm text-muted-foreground">
            <p>
              New to Catan?{" "}
              <Link href="/auth" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
            <p>
              Already have an account?{" "}
              <Link href="/auth" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Game Management</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage your Catan games with ease
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Score Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Keep track of victory points and game statistics
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Multiplayer</h3>
            <p className="text-sm text-muted-foreground">
              Play with friends online or manage local games
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<PageLoadingFallback message="Loading homepage..." />}>
      <HomeContent />
    </Suspense>
  );
}
