/* ==========================================================================
   DELETE CONFIRMATION MODAL
   Dark premium confirmation dialog with clear irreversible warning.
   Standalone modal for product deletion.
   ========================================================================== */

import { useEffect, memo } from 'react';
import {
    HiXMark,
    HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({ isOpen, productName, onConfirm, onClose }) => {
    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="delete-modal-overlay"
            onClick={onClose}
            role="alertdialog"
            aria-modal="true"
            aria-describedby="delete-modal-description"
        >
            <div
                className="delete-modal"
                onClick={(e) => e.stopPropagation()}
                id="delete-confirm-modal"
            >
                {/* ── Close Button ─────────────────────────── */}
                <button
                    className="delete-modal__close"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    <HiXMark size={18} />
                </button>

                {/* ── Icon ─────────────────────────────────── */}
                <div className="delete-modal__icon-container">
                    <div className="delete-modal__icon-ring">
                        <HiOutlineExclamationTriangle className="delete-modal__icon" />
                    </div>
                </div>

                {/* ── Content ──────────────────────────────── */}
                <h2 className="delete-modal__title">Delete Product</h2>
                <p className="delete-modal__description" id="delete-modal-description">
                    Are you sure you want to delete{' '}
                    <strong className="delete-modal__product-name">{productName}</strong>?
                </p>
                <div className="delete-modal__warning">
                    <HiOutlineExclamationTriangle size={14} />
                    <span>This action is permanent and cannot be undone. All associated variants and configurations will be removed.</span>
                </div>

                {/* ── Actions ──────────────────────────────── */}
                <div className="delete-modal__actions">
                    <button
                        type="button"
                        className="btn btn--ghost btn--md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn--danger btn--md"
                        onClick={onConfirm}
                        id="confirm-delete-btn"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(DeleteConfirmModal);
