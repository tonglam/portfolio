'use client';

// Inspired by react-hot-toast library
import type {
  ToasterToast,
  ToastReturn,
  ToastState,
  UseToastReturn,
} from '@/types/hooks/hooks.type';
import * as React from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000; // 5 seconds

let count = 0;

function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const ACTION_TYPES = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

type ActionTypes = typeof ACTION_TYPES;

type Action =
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

// Use WeakMap for better memory management with toast objects as keys
const toastTimeouts = new WeakMap<{ id: string }, ReturnType<typeof setTimeout>>();
const toastIds = new Set<string>();

const addToRemoveQueue = (toastId: string): void => {
  const toastKey = { id: toastId };
  if (toastTimeouts.has(toastKey)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastKey);
    toastIds.delete(toastId);
    dispatch({
      type: ACTION_TYPES.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastKey, timeout);
  toastIds.add(toastId);
};

export const reducer = (state: ToastState, action: Action): ToastState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case ACTION_TYPES.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case ACTION_TYPES.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(toast => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case ACTION_TYPES.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: ToastState) => void> = [];

let memoryState: ToastState = { toasts: [] };

function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ ...props }: Toast): ToastReturn {
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
    toast,
    dismiss: (toastId?: string): void => dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId }),
  };
}

export { toast, useToast };
