/* ==========================================================================
   MODAL COMPONENT
   Reads global state from ModalContext. Renders an overlay + panel.
   
   Separation of Concerns:
   - This component is ONLY responsible for rendering.
   - Open/close logic is in ModalContext.
   - Content is passed as children via context.
   ========================================================================== */

import { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import useModal from '../../../hooks/useModal';
import './Modal.css';

const Modal = () => {
    const { isOpen, title, content, size, onConfirm, onCancel, closeModal } = useModal();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        onCancel?.();
        closeModal();
    };

    const handleConfirm = () => {
        onConfirm?.();
        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true">
            <div
                className={`modal modal--${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button className="modal__close" onClick={handleClose} aria-label="Close modal">
                        <HiXMark size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal__body">
                    {content}
                </div>

                {/* Footer — only renders if confirm or cancel handlers exist */}
                {(onConfirm || onCancel) && (
                    <div className="modal__footer">
                        <button className="btn btn--secondary btn--sm" onClick={handleClose}>
                            Cancel
                        </button>
                        {onConfirm && (
                            <button className="btn btn--primary btn--sm" onClick={handleConfirm}>
                                Confirm
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
