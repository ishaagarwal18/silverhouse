import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start space-x-3 transition-all duration-300 animate-in slide-in-from-bottom-4 ${
            toast.type === 'success'
              ? 'bg-[#1A1A1A] text-white border-[#D4AF37]'
              : toast.type === 'info'
              ? 'bg-white text-[#1A1A1A] border-silver-300'
              : 'bg-rose-900 text-white border-rose-500'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}

          <div className="flex-1 text-xs">
            <h5 className="font-bold text-sm mb-0.5">{toast.title}</h5>
            <p className="opacity-90">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-silver-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
