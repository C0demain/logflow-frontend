import { useEffect } from 'react';
import { toast, ToastOptions } from 'react-hot-toast';

type ToastType = 'success' | 'error'

const useToasts = () => {
  useEffect(() => {
    const persistedToast = localStorage.getItem('toast');
    if (persistedToast) {
      const toastData = JSON.parse(persistedToast);
      const type: ToastType = toastData.type
      const { message } = toastData
      const options: ToastOptions = toastData.options
      showToast(message, type, options)

      localStorage.removeItem('toast');
    }
  }, []);

  const showToastOnReload = (message: string, type: ToastType, options?: ToastOptions) => {
    localStorage.setItem('toast', JSON.stringify({ message, type, options }));
  };

  const showToast = (message: string, type: ToastType, options?: ToastOptions) => {
    toast[type](message, options)
  }

  return { showToastOnReload, showToast };
};

export default useToasts;
