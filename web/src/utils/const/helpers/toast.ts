type ToastType = 'success' | 'error' | 'info';

// Simple event-based toast — picked up by ToastProvider
const listeners: Array<(type: ToastType, message: string) => void> = [];

export const showToast = (type: ToastType, message: string) => {
  listeners.forEach(l => l(type, message));
};

export const subscribeToToast = (fn: (type: ToastType, message: string) => void) => {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
};
