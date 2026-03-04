/* ==========================================================================
   TOAST COMPONENT
   Renders the global toast notification queue from ToastContext.
   
   Separation of Concerns:
   - This component ONLY renders the queue — it does not manage it.
   - Queue management (add, auto-dismiss) lives in ToastContext.
   ========================================================================== */

import {
    HiCheckCircle,
    HiExclamationCircle,
    HiExclamationTriangle,
    HiInformationCircle,
    HiXMark,
} from 'react-icons/hi2';
import useToast from '../../../hooks/useToast';
import { TOAST_TYPES } from '../../../utils/constants';
import './Toast.css';

const iconMap = {
    [TOAST_TYPES.SUCCESS]: HiCheckCircle,
    [TOAST_TYPES.ERROR]: HiExclamationCircle,
    [TOAST_TYPES.WARNING]: HiExclamationTriangle,
    [TOAST_TYPES.INFO]: HiInformationCircle,
};

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container" aria-live="polite">
            {toasts.map((toast) => {
                const Icon = iconMap[toast.type] || HiInformationCircle;
                return (
                    <div key={toast.id} className={`toast toast--${toast.type}`} role="alert">
                        <span className="toast__icon">
                            <Icon size={20} />
                        </span>
                        <div className="toast__content">
                            {toast.title && <p className="toast__title">{toast.title}</p>}
                            <p className="toast__message">{toast.message}</p>
                        </div>
                        <button
                            className="toast__dismiss"
                            onClick={() => removeToast(toast.id)}
                            aria-label="Dismiss notification"
                        >
                            <HiXMark size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastContainer;
