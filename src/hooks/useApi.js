/* ==========================================================================
   useApi HOOK
   Generic wrapper for async API calls with loading, error, and data state.
   
   Separation of Concerns:
   - Components call useApi() instead of managing loading/error inline.
   - The hook handles try/catch/finally — components just read state.
   ========================================================================== */

import { useState, useCallback } from 'react';

/**
 * @param {Function} apiFunc - An async function that returns data.
 * @returns {{ data, error, isLoading, execute }}
 */
const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const execute = useCallback(async (...args) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await apiFunc(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [apiFunc]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return { data, error, isLoading, execute, reset };
};

export default useApi;
