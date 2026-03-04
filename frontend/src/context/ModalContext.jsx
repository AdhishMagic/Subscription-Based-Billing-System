/* ==========================================================================
   MODAL CONTEXT
   Global modal state management.
   
   Separation of Concerns:
   - Context manages open/close state and what content to display.
   - The Modal UI component (components/feedback/Modal) reads this context
     to render — it does NOT own the state itself.
   - Any component can trigger modals via useModal() hook.
   ========================================================================== */

import { createContext, useState, useCallback, useMemo } from 'react';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        content: null,      // React node
        size: 'md',         // 'sm' | 'md' | 'lg' | 'xl'
        onConfirm: null,
        onCancel: null,
    });

    const openModal = useCallback(({
        title = '',
        content = null,
        size = 'md',
        onConfirm = null,
        onCancel = null,
    } = {}) => {
        setModal({
            isOpen: true,
            title,
            content,
            size,
            onConfirm,
            onCancel,
        });
    }, []);

    const closeModal = useCallback(() => {
        setModal((prev) => ({ ...prev, isOpen: false }));
    }, []);

    const value = useMemo(() => ({
        ...modal,
        openModal,
        closeModal,
    }), [modal, openModal, closeModal]);

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};
