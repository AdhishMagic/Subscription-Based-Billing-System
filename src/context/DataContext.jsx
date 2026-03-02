import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

/* ==========================================================================
   DATA CONTEXT (Optimization Strategy)
   Isolates high-frequency domain data from Auth/UI to prevent over-rendering.
   Handles global caching of lightweight reference data.
   ========================================================================== */

export const DataContext = createContext({
    taxRates: [],
    exchangeRates: {},
    refreshTaxRates: async () => { },
});

export const DataProvider = ({ children }) => {
    // Isolated state prevents <AuthContext> or <ThemeContext> mutations
    const [taxRates, setTaxRates] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({ USD: 1.0, EUR: 0.85, GBP: 0.73 });

    // useCallback prevents re-renders on components consuming refreshTaxRates
    const refreshTaxRates = useCallback(async () => {
        // Placeholder for an actual API fetch
        // const newRates = await api.get('/reference/tax-rates');
        setTaxRates([
            { id: 'tax_standard', name: 'Standard Rate', rate: 20 },
            { id: 'tax_reduced', name: 'Reduced Rate', rate: 5 },
        ]);
    }, []);

    // useMemo prevents context provider from broadcasting a new object 
    // reference on every single component tree render
    const value = useMemo(() => ({
        taxRates,
        exchangeRates,
        refreshTaxRates
    }), [taxRates, exchangeRates, refreshTaxRates]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
