/* ==========================================================================
   TOAST CONTEXT
   Global toast notification queue.
   
   Separation of Concerns:
   - Context manages the toast queue (array of toast objects).
   - The Toast UI component (components/feedback/Toast) renders the queue.
   - Any component can push toasts via useToast() hook.
   - Auto-dismiss is handled here, not in the UI component.
   ========================================================================== */

import { createContext, useState, useCallback, useMemo, useRef } from 'react';
import { TOAST_TYPES, TOAST_DURATION } from '../utils/constants';

export const ToastContext = createContext(null);

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        // Clear the auto-dismiss timer
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id]);
            delete timersRef.current[id];
        }
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback(({
        type = TOAST_TYPES.INFO,
        title = '',
        message = '',
        duration = TOAST_DURATION,
    } = {}) => {
        const id = ++toastIdCounter;

        const toast = { id, type, title, message };
        setToasts((prev) => [...prev, toast]);

        // Auto-dismiss after duration
        if (duration > 0) {
            timersRef.current[id] = setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, [removeToast]);

    // ── Convenience Methods ───────────────────────────────────────────────

    const success = useCallback((message, title) =>
        addToast({ type: TOAST_TYPES.SUCCESS, message, title }),
        [addToast]);

    const error = useCallback((message, title) =>
        addToast({ type: TOAST_TYPES.ERROR, message, title }),
        [addToast]);

    const warning = useCallback((message, title) =>
        addToast({ type: TOAST_TYPES.WARNING, message, title }),
        [addToast]);

    const info = useCallback((message, title) =>
        addToast({ type: TOAST_TYPES.INFO, message, title }),
        [addToast]);

    const value = useMemo(() => ({
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    }), [toasts, addToast, removeToast, success, error, warning, info]);

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};
