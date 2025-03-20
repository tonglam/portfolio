/**
 * Type definitions for custom hooks
 */

import type { ToastActionElement, ToastProps } from '@/components/ui/toast';
import type { ReactNode } from 'react';

/**
 * TypeWriter hook types
 */
export interface TypewriterResult {
  displayedCode: string[];
  isTyping: boolean;
  currentLine: number;
  currentChar: number;
  reset: () => void;
}

export interface TypewriterOptions {
  typingSpeed?: number;
  startDelay?: number;
}

/**
 * Debounce hook types
 */
export interface DebounceOptions {
  delay: number;
  immediate?: boolean;
}

/**
 * Toast hook types
 */
export type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: ReactNode;
  action?: ToastActionElement;
};

export interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}

export interface UseToastReturn {
  toasts: ToasterToast[];
  toast: (props: Omit<ToasterToast, 'id'>) => ToastReturn;
  dismiss: (toastId?: string) => void;
}

export interface ToastState {
  toasts: ToasterToast[];
}
