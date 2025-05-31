"use client";

import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  RefreshCw,
  LogIn,
  Home,
  Wifi,
  ShieldAlert,
} from "lucide-react";

/**
 * Authentication error fallback - redirects to login
 */
export function AuthErrorFallback() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth");
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <LogIn className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-muted-foreground mb-6">
          Please log in to access this page.
        </p>
        <button
          onClick={handleLogin}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

/**
 * Network error fallback - for connection issues
 */
export function NetworkErrorFallback() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <Wifi className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">Connection Error</h2>
        <p className="text-muted-foreground mb-6">
          Unable to connect to the server. Please check your internet
          connection.
        </p>
        <button
          onClick={handleRetry}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}

/**
 * Permission error fallback - for unauthorized access
 */
export function PermissionErrorFallback() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this resource.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Go Home
        </button>
      </div>
    </div>
  );
}

/**
 * Data error fallback - for data fetching issues
 */
export function DataErrorFallback({
  message = "Failed to load data",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Data Loading Error</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <button
          onClick={handleRetry}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    </div>
  );
}

/**
 * Form error fallback - for form submission errors
 */
export function FormErrorFallback({
  message = "Form submission failed",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-medium text-destructive mb-1">Error</h4>
          <p className="text-sm text-destructive/80 mb-3">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm bg-destructive text-destructive-foreground px-3 py-1 rounded hover:bg-destructive/90 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Inline error fallback - for smaller error states
 */
export function InlineErrorFallback({
  message = "Something went wrong",
  size = "sm",
}: {
  message?: string;
  size?: "xs" | "sm" | "md";
}) {
  const sizeClasses = {
    xs: "p-2 text-xs",
    sm: "p-3 text-sm",
    md: "p-4 text-base",
  };

  const iconSizes = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <div
      className={`border border-destructive/20 bg-destructive/5 rounded-lg ${sizeClasses[size]}`}
    >
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className={iconSizes[size]} />
        <span>{message}</span>
      </div>
    </div>
  );
}
