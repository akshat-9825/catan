"use client";

import { Loader2 } from "lucide-react";

/**
 * Basic loading spinner fallback
 */
export function LoadingFallback({
  message = "Loading...",
  size = "md",
}: {
  message?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="text-center">
        <Loader2
          className={`${sizeClasses[size]} animate-spin text-primary mx-auto mb-2`}
        />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}

/**
 * Full page loading fallback
 */
export function PageLoadingFallback({
  message = "Loading page...",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-lg font-medium mb-2">Loading</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

/**
 * Inline loading fallback - for smaller loading states
 */
export function InlineLoadingFallback({
  message = "Loading...",
  size = "sm",
}: {
  message?: string;
  size?: "xs" | "sm" | "md";
}) {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
  };

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span className={textSizes[size]}>{message}</span>
    </div>
  );
}

/**
 * Card skeleton loading fallback
 */
export function CardSkeletonFallback() {
  return (
    <div className="p-6 border rounded-lg">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-muted rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
        <div className="h-10 bg-muted rounded w-24"></div>
      </div>
    </div>
  );
}

/**
 * List skeleton loading fallback
 */
export function ListSkeletonFallback({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-4 border rounded-lg"
        >
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="rounded-full bg-muted h-10 w-10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table skeleton loading fallback
 */
export function TableSkeletonFallback({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="w-full">
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex space-x-4 p-4 border-b">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="flex-1 h-4 bg-muted rounded"></div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4 p-4 border-b">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex} className="flex-1 h-4 bg-muted rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Dashboard skeleton loading fallback
 */
export function DashboardSkeletonFallback() {
  return (
    <div className="min-h-svh bg-background">
      {/* Header skeleton */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-muted rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <div className="h-10 bg-muted rounded w-64 mb-6 animate-pulse"></div>

          <div className="bg-card p-6 rounded-lg border mb-8">
            <div className="h-6 bg-muted rounded w-48 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-6 bg-muted rounded w-32 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-muted rounded w-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Auth form skeleton loading fallback
 */
export function AuthFormSkeletonFallback() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <div className="h-8 bg-muted rounded w-48 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-64 mx-auto animate-pulse"></div>
      </div>

      <div className="space-y-4">
        <div className="h-12 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-px bg-muted w-full animate-pulse"></div>
        <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
      </div>

      <div className="h-4 bg-muted rounded w-32 mx-auto animate-pulse"></div>
    </div>
  );
}
