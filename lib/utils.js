import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 * @param {...(string|boolean|null|undefined|Object.<string, boolean>)} inputs - Class names to be combined
 * @returns {string} - The combined class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
