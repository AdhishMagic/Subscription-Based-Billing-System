/* ==========================================================================
   DELETE TEMPLATE MODAL
   Dark premium confirmation dialog for template deletion.
   ========================================================================== */

import { memo, useEffect, useRef } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import './DeleteTemplateModal.css';

const DeleteTemplateModal = ({ template, onConfirm, onCancel }) => {
    const cancelRef = useRef(null);

    // Auto-focus cancel button and handle Escape
    useEffect(() => {
        cancelRef.current?.focus();

        const handleEscape = (e) => {
            if (e.key === 'Escape') onCancel();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onCancel]);

    return (
        <div className="delete-modal-overlay" onClick={onCancel} id="delete-template-modal">
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
                <div className="delete-modal__icon-wrap">
                    <HiOutlineExclamationTriangle className="delete-modal__icon" />
                </div>

                <h2 className="delete-modal__title">Delete Template</h2>
                <p className="delete-modal__message">
                    This action cannot be undone. The following template will be permanently
                    removed from your system.
                </p>
                <div className="delete-modal__template-name">{template.name}</div>

                <div className="delete-modal__actions">
                    <button
                        ref={cancelRef}
                        className="delete-modal__cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="delete-modal__confirm-btn"
                        onClick={onConfirm}
                    >
                        Delete Template
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(DeleteTemplateModal);
