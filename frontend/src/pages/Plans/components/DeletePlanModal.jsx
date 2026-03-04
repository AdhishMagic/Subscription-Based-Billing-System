/* ==========================================================================
   DELETE PLAN MODAL
   Confirmation dialog specifically for deleting a recurring plan.
   ========================================================================== */

import { memo, useRef, useEffect } from 'react';
import { HiOutlineExclamationTriangle, HiXMark } from 'react-icons/hi2';
import './DeletePlanModal.css';

const DeletePlanModal = ({ isOpen, planName, onConfirm, onClose }) => {
    const confirmBtnRef = useRef(null);
    const dialogRef = useRef(null);

    // Trap focus and close on Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab') {
                const focusableNodes = dialogRef.current.querySelectorAll(
                    'button:not([disabled])'
                );
                const firstElement = focusableNodes[0];
                const lastElement = focusableNodes[focusableNodes.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        // Focus the confirm button by default for safety (though normally cancel is safer,
        // enterprise apps often prefer quick flow, but we require a specific click)
        confirmBtnRef.current?.focus();

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="delete-plan-modal-overlay" onClick={onClose} id="delete-plan-modal">
            <div
                className="delete-plan-modal-content"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-plan-title"
                ref={dialogRef}
            >
                {/* ── Header ────────────────────────────────────────────── */}
                <header className="delete-plan-modal__header">
                    <div className="delete-plan-modal__icon-badge">
                        <HiOutlineExclamationTriangle size={24} />
                    </div>
                    <button
                        className="delete-plan-modal__close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <HiXMark size={20} />
                    </button>
                </header>

                {/* ── Body ──────────────────────────────────────────────── */}
                <div className="delete-plan-modal__body">
                    <h2 className="delete-plan-modal__title" id="delete-plan-title">
                        Delete Plan?
                    </h2>
                    <p className="delete-plan-modal__message">
                        Are you sure you want to delete <span className="delete-plan-modal__highlight">{planName}</span>?
                        This action cannot be undone. Active subscriptions using this plan will continue until their current period ends.
                    </p>
                </div>

                {/* ── Footer ────────────────────────────────────────────── */}
                <footer className="delete-plan-modal__footer">
                    <button
                        className="btn btn--outline btn--md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        ref={confirmBtnRef}
                        className="btn btn--danger btn--md"
                        onClick={onConfirm}
                        id="confirm-delete-plan-btn"
                    >
                        Yes, Delete Plan
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default memo(DeletePlanModal);
