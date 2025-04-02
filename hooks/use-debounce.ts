import { useEffect, useState } from 'react';

interface DebounceOptions {
  delay: number;
  immediate?: boolean;
}

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
