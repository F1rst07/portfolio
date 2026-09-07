import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div 
      id="toast-container" 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-lg border backdrop-blur-md ${
              t.type === 'success'
                ? 'bg-white/95 text-emerald-900 border-emerald-200/80 shadow-emerald-500/10'
                : t.type === 'error'
                ? 'bg-white/95 text-rose-900 border-rose-200/80 shadow-rose-500/10'
                : 'bg-white/95 text-purple-900 border-purple-200/80 shadow-purple-500/10'
            }`}
          >
            <div className="flex items-center gap-3">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
              {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-purple-500 shrink-0" />}
              <span className="text-sm font-medium leading-relaxed">{t.text}</span>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="ml-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
