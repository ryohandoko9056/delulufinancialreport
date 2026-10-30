import React from 'react';
import { useBudget } from '../hooks/useBudget';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useBudget();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={18} color="#10B981" />;
        let toastClass = 'toast toast-success';

        if (toast.type === 'error') {
          icon = <AlertCircle size={18} color="#EF4444" />;
          toastClass = 'toast toast-error';
        } else if (toast.type === 'info') {
          icon = <Info size={18} color="var(--primary)" />;
          toastClass = 'toast toast-info';
        }

        return (
          <div key={toast.id} className={toastClass}>
            {icon}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                opacity: 0.7
              }}
              aria-label="Dismiss toast"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
