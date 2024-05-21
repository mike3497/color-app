import type { Toast } from '@/models/toast';
import { useToastsStore } from '@/stores/toastsStore';
import { nanoid } from 'nanoid';

export function useToast() {
  const toastsStore = useToastsStore();

  const open = (
    message: string,
    options?: { backgroundColor?: string; textColor?: string }
  ): Toast => {
    const toast: Toast = {
      backgroundColor: options?.backgroundColor ?? '#FFFFFF',
      id: nanoid(),
      message,
      textColor: options?.textColor ?? '#000000'
    };

    toastsStore.toasts.push(toast);

    setTimeout(() => close(toast), 2000);

    return toast;
  };

  const close = (toast: Toast) => {
    toastsStore.toasts = toastsStore.toasts.filter((item) => item.id !== toast.id);
  };

  return {
    open
  };
}
