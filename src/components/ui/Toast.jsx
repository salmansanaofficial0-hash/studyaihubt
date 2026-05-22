'use client';

import { Toaster } from 'sonner';

export default function Toast() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
        },
        classNames: {
          toast: 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white',
          success: 'border border-green-200 dark:border-green-800',
          error: 'border border-red-200 dark:border-red-800',
          loading: 'border border-blue-200 dark:border-blue-800',
        },
      }}
    />
  );
}
