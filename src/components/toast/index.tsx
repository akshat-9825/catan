"use client";

import * as React from "react";
import toast, { Toaster, type Toast } from "react-hot-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "@/lib/icons";

import { cn } from "@/lib/utils/utils";

// Toast variants using class-variance-authority (following button pattern)
const toastVariants = cva(
  "group toast group-[.toaster]:shadow-lg group-[.toaster]:border",
  {
    variants: {
      variant: {
        default:
          "group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border",
        success:
          "group-[.toaster]:bg-green-900 group-[.toaster]:text-green-50 group-[.toaster]:border-green-800 dark:group-[.toaster]:bg-green-50 dark:group-[.toaster]:text-green-900 dark:group-[.toaster]:border-green-200",
        error:
          "group-[.toaster]:bg-red-900 group-[.toaster]:text-red-50 group-[.toaster]:border-red-800 dark:group-[.toaster]:bg-red-50 dark:group-[.toaster]:text-red-900 dark:group-[.toaster]:border-red-200",
        warning:
          "group-[.toaster]:bg-yellow-900 group-[.toaster]:text-yellow-50 group-[.toaster]:border-yellow-800 dark:group-[.toaster]:bg-yellow-50 dark:group-[.toaster]:text-yellow-900 dark:group-[.toaster]:border-yellow-200",
        info: "group-[.toaster]:bg-blue-900 group-[.toaster]:text-blue-50 group-[.toaster]:border-blue-800 dark:group-[.toaster]:bg-blue-50 dark:group-[.toaster]:text-blue-900 dark:group-[.toaster]:border-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Toast component props
export interface ToastProps extends VariantProps<typeof toastVariants> {
  /** Toast instance from react-hot-toast */
  t: Toast;
  /** Custom message content */
  message: React.ReactNode;
  /** Optional icon override */
  icon?: React.ReactNode;
  /** Whether to show close button */
  dismissible?: boolean;
}

// Icon mapping for different variants
const variantIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  default: null,
} as const;

/**
 * Custom Toast Component
 */
export function ToastComponent({
  t,
  message,
  variant = "default",
  icon,
  dismissible = true,
}: ToastProps) {
  const IconComponent = icon ? null : variantIcons[variant!];

  return (
    <div
      className={cn(
        toastVariants({ variant }),
        "max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5",
        t.visible ? "animate-enter" : "animate-leave"
      )}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          {(icon || IconComponent) && (
            <div className="flex-shrink-0">
              {icon || (IconComponent && <IconComponent className="h-5 w-5" />)}
            </div>
          )}
          <div className={cn("ml-3 flex-1", !icon && !IconComponent && "ml-0")}>
            <div className="text-sm font-medium">{message}</div>
          </div>
        </div>
      </div>
      {dismissible && (
        <div className="flex border-l border-current/20">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-current/10 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Toast Provider Component
 * Wraps the app to provide toast functionality
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        className: "",
        duration: 4000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        },
      }}
    />
  );
}

// Toast utility functions
export const showToast = {
  /**
   * Show success toast
   */
  success: (
    message: React.ReactNode,
    options?: { duration?: number; dismissible?: boolean }
  ) => {
    return toast.custom(
      (t) => (
        <ToastComponent
          t={t}
          message={message}
          variant="success"
          dismissible={options?.dismissible}
        />
      ),
      { duration: options?.duration }
    );
  },

  /**
   * Show error toast
   */
  error: (
    message: React.ReactNode,
    options?: { duration?: number; dismissible?: boolean }
  ) => {
    return toast.custom(
      (t) => (
        <ToastComponent
          t={t}
          message={message}
          variant="error"
          dismissible={options?.dismissible}
        />
      ),
      { duration: options?.duration || 6000 } // Longer duration for errors
    );
  },

  /**
   * Show warning toast
   */
  warning: (
    message: React.ReactNode,
    options?: { duration?: number; dismissible?: boolean }
  ) => {
    return toast.custom(
      (t) => (
        <ToastComponent
          t={t}
          message={message}
          variant="warning"
          dismissible={options?.dismissible}
        />
      ),
      { duration: options?.duration }
    );
  },

  /**
   * Show info toast
   */
  info: (
    message: React.ReactNode,
    options?: { duration?: number; dismissible?: boolean }
  ) => {
    return toast.custom(
      (t) => (
        <ToastComponent
          t={t}
          message={message}
          variant="info"
          dismissible={options?.dismissible}
        />
      ),
      { duration: options?.duration }
    );
  },

  /**
   * Show default toast
   */
  default: (
    message: React.ReactNode,
    options?: { duration?: number; dismissible?: boolean }
  ) => {
    return toast.custom(
      (t) => (
        <ToastComponent
          t={t}
          message={message}
          variant="default"
          dismissible={options?.dismissible}
        />
      ),
      { duration: options?.duration }
    );
  },

  /**
   * Show custom toast with custom icon and variant
   */
  custom: (
    message: React.ReactNode,
    options?: {
      variant?: VariantProps<typeof toastVariants>["variant"];
      icon?: React.ReactNode;
      duration?: number;
      dismissible?: boolean;
    }
  ) => {
    return toast.custom(
      (t) => (
        <ToastComponent
          t={t}
          message={message}
          variant={options?.variant}
          icon={options?.icon}
          dismissible={options?.dismissible}
        />
      ),
      { duration: options?.duration }
    );
  },

  /**
   * Show loading toast
   */
  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      },
    });
  },

  /**
   * Dismiss specific toast
   */
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Promise-based toast for async operations
   */
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: (data: T) => string;
      error: (error: any) => string;
      duration?: number;
    }
  ) => {
    return toast.promise(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
    });
  },
};

// Export everything for convenience
export { toast, type Toast };
export default showToast;
