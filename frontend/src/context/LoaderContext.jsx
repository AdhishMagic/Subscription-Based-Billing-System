/* ==========================================================================
   LOADER CONTEXT
   Global loading overlay state.
   
   Separation of Concerns:
   - Context manages a counter (not boolean) — supports concurrent loaders.
   - The GlobalLoader UI component reads isLoading to show/hide.
   - Any component or hook can call show/hide via useLoader().
   ========================================================================== */

import { createContext, useState, useCallback, useMemo } from 'react';

export const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
    // Use a counter so multiple concurrent operations can each call show/hide
    const [count, setCount] = useState(0);

    const showLoader = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

    const hideLoader = useCallback(() => {
        setCount((prev) => Math.max(0, prev - 1));
    }, []);

    const isLoading = count > 0;

    const value = useMemo(() => ({
        isLoading,
        showLoader,
        hideLoader,
    }), [isLoading, showLoader, hideLoader]);

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
};
