/* ==========================================================================
   CONTEXT — BARREL EXPORT
   Single entry point for all context providers and their raw contexts.
   ========================================================================== */

export { AuthContext, AuthProvider } from './AuthContext';
export { ThemeContext, ThemeProvider, useTheme } from './ThemeContext';
export { ModalContext, ModalProvider } from './ModalContext';
export { ToastContext, ToastProvider } from './ToastContext';
export { LoaderContext, LoaderProvider } from './LoaderContext';
export { DataContext, DataProvider, useData } from './DataContext';

// ── Intelligence Contexts ──────────────────────────────────────────
export { SearchProvider, useSearch } from './SearchContext';
export { NotificationProvider, useNotification } from './NotificationContext';
export { CommandProvider, useCommand } from './CommandContext';
export { IntelligenceProvider, useIntelligence } from './IntelligenceContext';
