import type * as React from 'react';

export const ACTION_TYPES = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

export type ActionTypes = typeof ACTION_TYPES;

export interface ToasterToast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ToastState {
  toasts: ToasterToast[];
}

export interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}

export interface UseToastReturn extends ToastState {
  toast: (props: Omit<ToasterToast, 'id'>) => ToastReturn;
  dismiss: (toastId?: string) => void;
}

export type Action =
  | {
      type: ActionTypes['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionTypes['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionTypes['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionTypes['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };
