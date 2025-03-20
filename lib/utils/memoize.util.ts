/**
 * Memoization utilities for optimizing expensive function calls
 * Caches results based on input parameters to avoid redundant calculations
 */

/**
 * Options for the memoize function
 */
interface MemoizeOptions {
  /**
   * Maximum number of results to cache (default: 100)
   */
  maxSize?: number;

  /**
   * Time in milliseconds after which cache entries expire (default: 5 minutes)
   */
  ttl?: number;
}

// Default values
const DEFAULT_MAX_SIZE = 100;
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Cache entry with expiration time
 */
interface CacheEntry<T> {
  value: T;
  expiry: number;
}

/**
 * Creates a memoized version of the provided function
 * Results are cached based on the input parameters
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options: MemoizeOptions = {}
): T {
  const maxSize = options.maxSize ?? DEFAULT_MAX_SIZE;
  const ttl = options.ttl ?? DEFAULT_TTL;

  // Create cache
  const cache = new Map<string, CacheEntry<ReturnType<T>>>();

  // Return memoized function
  return ((...args: Parameters<T>): ReturnType<T> => {
    // Generate cache key
    const key = JSON.stringify(args);

    // Check if we have a cached result
    const cachedEntry = cache.get(key);
    const now = Date.now();

    // Return cached result if valid
    if (cachedEntry && cachedEntry.expiry > now) {
      return cachedEntry.value;
    }

    // Cache miss, calculate result
    const result = fn(...args) as ReturnType<T>;

    // Cache the result
    cache.set(key, {
      value: result,
      expiry: now + ttl,
    });

    // Trim cache if it exceeds max size
    if (cache.size > maxSize) {
      // Remove oldest entry
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) {
        cache.delete(oldestKey);
      }
    }

    return result;
  }) as T;
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after 'wait' milliseconds have elapsed since the last time it was invoked
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per every 'limit' milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit = 300
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0;
  let lastResult: ReturnType<T> | undefined;

  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastResult = fn(...args) as ReturnType<T>;
      lastCall = now;
    }

    return lastResult;
  };
}
