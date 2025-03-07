import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 * Useful for combining Tailwind CSS classes with dynamic conditions
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a localized format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats a time duration in minutes to a readable string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than 1 min read';
  }
  return `${Math.ceil(minutes)} min read`;
}

/**
 * Formats a number with appropriate suffixes (K, M, B)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
