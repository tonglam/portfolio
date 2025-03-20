import type { DebounceOptions } from '@/types/hooks/hooks.type';
import { useEffect, useState } from 'react';

/**
 * Custom hook for debouncing a value
 * @template T - Type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {DebounceOptions} options - Debounce configuration options
 * @returns {T} - The debounced value
 * @throws {Error} If delay is negative
 */
export function useDebounce<T>(value: T, { delay, immediate = false }: DebounceOptions): T {
  if (delay < 0) {
    throw new Error('Delay must be non-negative');
  }

  const [debouncedValue, setDebouncedValue] = useState<T>(immediate ? value : (undefined as T));

  useEffect(() => {
    if (immediate && debouncedValue === undefined) {
      setDebouncedValue(value);
      return;
    }

    // Set debouncedValue to value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if value changes or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, immediate, debouncedValue]);

  return debouncedValue;
}

export default useDebounce;
