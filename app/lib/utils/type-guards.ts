/**
 * Type guard utilities
 * Functions to help with runtime type checking
 */

import type { ApiResponse, Image, Link, Metadata } from '@/types';

/**
 * Type guard for the ApiResponse interface
 */
export function isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'success' in obj &&
    typeof (obj as ApiResponse<T>).success === 'boolean' &&
    'data' in obj
  );
}

/**
 * Type guard for the Image interface
 */
export function isImage(obj: unknown): obj is Image {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'url' in obj &&
    typeof (obj as Image).url === 'string'
  );
}

/**
 * Type guard for the Link interface
 */
export function isLink(obj: unknown): obj is Link {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'url' in obj &&
    typeof (obj as Link).url === 'string' &&
    'label' in obj &&
    typeof (obj as Link).label === 'string'
  );
}

/**
 * Type guard for the Metadata interface
 */
export function isMetadata(obj: unknown): obj is Metadata {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'createdAt' in obj &&
    typeof (obj as Metadata).createdAt === 'string'
  );
}

/**
 * Generic type guard for arrays
 */
export function isArrayOfType<T>(
  arr: unknown,
  typeGuard: (item: unknown) => item is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(typeGuard);
}
