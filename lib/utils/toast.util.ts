import ui from '@/config/ui.config';
import type { Action, ToastState } from '@/types/hooks/toast.type';
import { ACTION_TYPES } from '@/types/hooks/toast.type';

let count = 0;

/**
 * Generates a unique ID for toasts
 */
export function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Use WeakMap for better memory management with toast objects as keys
const toastTimeouts = new WeakMap<{ id: string }, ReturnType<typeof setTimeout>>();
const toastIds = new Set<string>();

/**
 * Schedule a toast for removal
 */
export function scheduleToastRemoval(toastId: string, dispatch: (action: Action) => void): void {
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
  }, ui.TOAST.DURATION);

  toastTimeouts.set(toastKey, timeout);
  toastIds.add(toastId);
}

/**
 * Handle side effects for toast actions
 */
export function handleToastEffect(action: Action, dispatch: (action: Action) => void): void {
  switch (action.type) {
    case ACTION_TYPES.DISMISS_TOAST: {
      if (action.toastId) {
        scheduleToastRemoval(action.toastId, dispatch);
      }
      break;
    }
    case ACTION_TYPES.ADD_TOAST: {
      scheduleToastRemoval(action.toast.id, dispatch);
      break;
    }
    case ACTION_TYPES.UPDATE_TOAST:
    case ACTION_TYPES.REMOVE_TOAST:
      // These actions don't have side effects
      break;
  }
}

/**
 * Clean up toast timeouts
 */
export function cleanupToasts(): void {
  toastIds.forEach(id => {
    const toastKey = { id };
    const timeout = toastTimeouts.get(toastKey);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeouts.delete(toastKey);
    }
  });
  toastIds.clear();
}

/**
 * Pure reducer for managing toast state
 */
export const reducer = (state: ToastState, action: Action): ToastState => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, ui.TOAST.MAX_VISIBLE),
      };

    case ACTION_TYPES.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case ACTION_TYPES.DISMISS_TOAST: {
      const { toastId } = action;
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

    default:
      return state;
  }
};
