/* ==========================================================================
   useTheme HOOK
   Convenience hook to consume ThemeContext.
   Throws if used outside ThemeProvider — fail-fast pattern.
   ========================================================================== */

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default useTheme;
