import { useEffect } from 'react';

/**
 * useHotkeys - Custom Hook to bind global keyboard shortcuts.
 * Automatically ignores input/textarea/select elements to prevent conflicting behavior.
 * 
 * @param {string} key - e.g., 'k', 'p', 'Escape'
 * @param {function} callback - Function to execute on match
 * @param {object} options - { altKey, ctrlKey, shiftKey, metaKey, preventDefault }
 */
const useHotkeys = (key, callback, options = {}) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Ignore if active element is an input-like element
            const activeElement = document.activeElement;
            const isInput = activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.tagName === 'SELECT' ||
                activeElement.isContentEditable
            );

            // Esc is usually safe to capture even in inputs for closing modals/dropdowns
            if (isInput && key !== 'Escape') {
                return;
            }

            const matchKey = event.key.toLowerCase() === key.toLowerCase();
            const matchCtrl = options.ctrlKey ? (event.ctrlKey || event.metaKey) : true;
            const matchShift = options.shiftKey ? event.shiftKey : true;
            const matchAlt = options.altKey ? event.altKey : true;

            // If a modifier is explicitly set to false, ensure it is NOT pressed
            const noCtrlIfFalse = options.ctrlKey === false ? (!event.ctrlKey && !event.metaKey) : true;
            const noShiftIfFalse = options.shiftKey === false ? !event.shiftKey : true;
            const noAltIfFalse = options.altKey === false ? !event.altKey : true;

            if (matchKey && matchCtrl && matchShift && matchAlt && noCtrlIfFalse && noShiftIfFalse && noAltIfFalse) {
                if (options.preventDefault !== false) {
                    event.preventDefault();
                }
                callback(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, callback, options]);
};

export default useHotkeys;
