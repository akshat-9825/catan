import { use } from "react";
import { authHelpers } from "@/lib/supabase/auth";

/**
 * A utility type for creating async data fetchers that work with the `use` hook
 */
export type AsyncDataFetcher<T> = () => Promise<T>;

/**
 * Creates a cached async data fetcher that can be used with the `use` hook.
 * This helps avoid refetching the same data multiple times.
 */
export function createAsyncDataFetcher<T>(
  fetcher: () => Promise<T>,
  key?: string
): AsyncDataFetcher<T> {
  // Simple in-memory cache
  const cache = new Map<string, Promise<T>>();
  const cacheKey = key || fetcher.toString();

  return () => {
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const promise = fetcher();
    cache.set(cacheKey, promise);

    // Clear cache on error to allow retry
    promise.catch(() => {
      cache.delete(cacheKey);
    });

    return promise;
  };
}

/**
 * A convenience hook that wraps the `use` hook for better TypeScript support
 * and consistent error handling.
 */
export function useAsyncData<T>(fetcher: AsyncDataFetcher<T>): T {
  return use(fetcher());
}

/**
 * Common async data fetchers for authentication
 */
export const asyncDataFetchers = {
  /**
   * Gets the current authenticated user
   */
  getCurrentUser: createAsyncDataFetcher(async () => {
    const {
      data: { user },
      error,
    } = await authHelpers.getCurrentUser();

    if (error) {
      throw new Error(`Authentication error: ${error.message}`);
    }

    return user;
  }, "current-user"),

  /**
   * Checks if a user is authenticated (returns null if not authenticated)
   */
  checkAuthStatus: createAsyncDataFetcher(async () => {
    const {
      data: { user },
    } = await authHelpers.getCurrentUser();

    return user;
  }, "auth-status"),
};

/**
 * Utility for handling conditional data fetching with the `use` hook
 */
export function createConditionalFetcher<T>(
  condition: boolean,
  fetcher: AsyncDataFetcher<T>,
  fallback: T
): AsyncDataFetcher<T> {
  return () => {
    if (condition) {
      return fetcher();
    }
    return Promise.resolve(fallback);
  };
} 