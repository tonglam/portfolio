'use client';

// Inspired by react-hot-toast library
import { genId, reducer } from '@/lib/utils/toast.util';
import type {
  Action,
  ToasterToast,
  ToastReturn,
  ToastState,
  UseToastReturn,
} from '@/types/hooks/toast.type';
import { ACTION_TYPES } from '@/types/hooks/toast.type';
import * as React from 'react';

// State management
const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

// Dispatch function for state updates
function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action, dispatch);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

// Toast creation helper
function createToast(props: Omit<ToasterToast, 'id'>): ToastReturn {
  const id = genId();

  const update = (props: ToasterToast): void =>
    dispatch({
      type: ACTION_TYPES.UPDATE_TOAST,
      toast: { ...props, id },
    });
  const dismiss = (): void => dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId: id });

  dispatch({
    type: ACTION_TYPES.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// Main hook
function useToast(): UseToastReturn {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect((): (() => void) => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast: createToast,
    dismiss: (toastId?: string): void => dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId }),
  };
}

export { createToast as toast, useToast };
