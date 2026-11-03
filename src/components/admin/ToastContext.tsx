"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  AlertTriangle,
  Trash2,
} from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
  };
  confirmModal: (options: ConfirmOptions) => Promise<boolean>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Confirm Modal state
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolve: ((val: boolean) => void) | null;
  }>({
    isOpen: false,
    options: { message: "" },
    resolve: null,
  });

  const addToast = useCallback(
    (type: ToastType, message: string, title?: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, message, title }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg: string, title?: string) => addToast("success", msg, title),
    error: (msg: string, title?: string) => addToast("error", msg, title),
    info: (msg: string, title?: string) => addToast("info", msg, title),
    warning: (msg: string, title?: string) => addToast("warning", msg, title),
  };

  const confirmModal = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    confirmState.resolve?.(true);
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    confirmState.resolve?.(false);
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ToastContext.Provider value={{ toast, confirmModal }}>
      {children}

      {/* FLOATING TOAST NOTIFICATIONS (Top-Center on Mobile, Top-Right on Desktop) */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[9999] flex flex-col gap-2 max-w-[92vw] sm:max-w-md pointer-events-none">
        {toasts.map((t) => {
          const bgColors = {
            success: "bg-white border-emerald-300 text-slate-900 shadow-lg shadow-emerald-500/10",
            error: "bg-white border-rose-300 text-slate-900 shadow-lg shadow-rose-500/10",
            warning: "bg-white border-amber-300 text-slate-900 shadow-lg shadow-amber-500/10",
            info: "bg-white border-blue-300 text-slate-900 shadow-lg shadow-blue-500/10",
          };

          const iconColors = {
            success: "text-emerald-600 bg-emerald-50",
            error: "text-rose-600 bg-rose-50",
            warning: "text-amber-600 bg-amber-50",
            info: "text-blue-600 bg-blue-50",
          };

          const Icons = {
            success: CheckCircle2,
            error: AlertCircle,
            warning: AlertTriangle,
            info: Info,
          };

          const IconComponent = Icons[t.type];

          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-3 sm:p-4 rounded-xl border flex items-start gap-3 transition-all duration-200 animate-in slide-in-from-top-2 fade-in ${bgColors[t.type]}`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${iconColors[t.type]}`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="flex-1 min-w-0 pr-1">
                {t.title && (
                  <h4 className="text-xs sm:text-sm font-bold text-slate-950 leading-snug">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {t.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* CONFIRMATION DIALOG MODAL (Replaces window.confirm) */}
      {confirmState.isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3.5">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmState.options.isDestructive !== false
                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                    : "bg-amber-50 text-amber-600 border border-amber-200"
                }`}
              >
                {confirmState.options.isDestructive !== false ? (
                  <Trash2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-950">
                  {confirmState.options.title || "Confirm Action"}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                  {confirmState.options.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-150">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer active:scale-98"
              >
                {confirmState.options.cancelText || "Cancel"}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-xs transition-colors cursor-pointer active:scale-98 ${
                  confirmState.options.isDestructive !== false
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-[#E5A53D] hover:bg-[#d89832] text-slate-950"
                }`}
              >
                {confirmState.options.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
