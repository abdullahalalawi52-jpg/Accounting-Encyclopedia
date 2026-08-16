import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none"
      style={{ insetInlineStart: '1.25rem' }}
    >
      {toasts.map(toast => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';
        
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-fade-in transition-all duration-300 ${
              isError 
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/40' 
                : isInfo
                ? 'bg-sky-950/90 text-sky-200 border-sky-500/40'
                : 'bg-slate-900/95 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isError ? (
                <AlertCircle size={18} className="text-rose-400 shrink-0" />
              ) : isInfo ? (
                <Info size={18} className="text-sky-400 shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              )}
              <span className="text-sm font-semibold leading-snug break-words text-white">
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
              aria-label="إغلاق الإشعار"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
