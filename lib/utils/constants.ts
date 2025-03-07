/**
 * Constants management utilities
 * Helper functions for working with constants in the application
 */

/**
 * Extracts constant values from a constants object into a record
 * Useful for creating lookup tables from constant enumerations
 */
export function createLookup<T extends Record<string, string | number>>(
  constants: T
): Record<string, string | number> {
  return Object.values(constants).reduce<Record<string, string | number>>((acc, value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      acc[value] = value;
    }
    return acc;
  }, {});
}

/**
 * Creates a validator function that checks if a value is in the constants object
 */
export function createValidator<T extends Record<string, string | number>>(
  constants: T
): (value: unknown) => value is T[keyof T] {
  const validValues = new Set(Object.values(constants));

  return (value: unknown): value is T[keyof T] => {
    return (typeof value === 'string' || typeof value === 'number') && validValues.has(value);
  };
}

/**
 * Gets a constant value by key, with fallback
 */
export function getConstant<T extends Record<string, unknown>, K extends keyof T>(
  constants: T,
  key: K,
  fallback: T[K]
): T[K] {
  return constants[key] ?? fallback;
}

/**
 * Returns a function that merges default values with provided options
 */
export function withDefaults<T extends Record<string, unknown>>(
  defaults: T
): (options?: Partial<T>) => T {
  return (options: Partial<T> = {}): T => ({
    ...defaults,
    ...options,
  });
}

/**
 * Deep freezes an object to prevent modifications
 */
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  Object.keys(obj as object).forEach(prop => {
    const value = (obj as Record<string, unknown>)[prop];
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      (obj as Record<string, unknown>)[prop] = deepFreeze(value);
    }
  });

  return Object.freeze(obj);
}
