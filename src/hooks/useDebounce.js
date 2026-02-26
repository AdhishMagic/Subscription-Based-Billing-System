/* ==========================================================================
   useDebounce HOOK
   Delays updating a value until after a specified wait period.
   Useful for search inputs, filter fields, etc.
   ========================================================================== */

import { useState, useEffect } from 'react';

/**
 * @param {any} value - The value to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {any} The debounced value.
 */
const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
