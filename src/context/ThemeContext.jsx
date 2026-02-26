/* ==========================================================================
   THEME CONTEXT
   Manages dark/light theme toggle.
   Persists preference in localStorage.
   
   Separation of Concerns:
   - Context only manages the theme value and toggle action.
   - Actual CSS variables are defined in design tokens — this context
     simply toggles a data attribute on <html>.
   ========================================================================== */

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const ThemeContext = createContext(null);

const THEME_KEY = 'app_theme';
const DARK = 'dark';
const LIGHT = 'light';

const getStoredTheme = () => {
    try {
        return localStorage.getItem(THEME_KEY) || DARK;
    } catch {
        return DARK;
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getStoredTheme);

    // Sync theme to <html data-theme="..."> on every change
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === DARK ? LIGHT : DARK));
    }, []);

    const isDark = theme === DARK;

    const value = useMemo(() => ({
        theme,
        isDark,
        toggleTheme,
    }), [theme, isDark, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
