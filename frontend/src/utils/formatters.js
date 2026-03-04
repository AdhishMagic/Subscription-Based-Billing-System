/* ==========================================================================
   FORMATTERS
   Pure utility functions for formatting display values.
   
   Separation of Concerns:
   - Formatting logic is isolated here, not mixed into components.
   - Components call these functions for display — they never format inline.
   ========================================================================== */

// ── Currency ────────────────────────────────────────────────────────────────

/**
 * Formats a number as currency.
 * @param {number} amount
 * @param {string} currency - ISO 4217 code (default: 'USD')
 * @param {string} locale   - BCP 47 locale (default: 'en-US')
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
};

// ── Dates ───────────────────────────────────────────────────────────────────

/**
 * Formats a date string or Date object for display.
 * @param {string|Date} date
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
    const defaults = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', { ...defaults, ...options }).format(
        new Date(date)
    );
};

/**
 * Formats a date with time.
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateTime = (date) => {
    return formatDate(date, {
        hour: '2-digit',
        minute: '2-digit',
    });
};

// ── Numbers ─────────────────────────────────────────────────────────────────

/**
 * Formats a number with locale-aware separators.
 * @param {number} value
 * @param {string} locale
 * @returns {string}
 */
export const formatNumber = (value, locale = 'en-US') => {
    return new Intl.NumberFormat(locale).format(value);
};

/**
 * Formats a number as a compact string (e.g., 1.2K, 3.4M).
 * @param {number} value
 * @returns {string}
 */
export const formatCompact = (value) => {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(value);
};

// ── Percentage ──────────────────────────────────────────────────────────────

/**
 * Formats a decimal as a percentage string.
 * @param {number} value - e.g. 0.25 → "25%"
 * @param {number} decimals
 * @returns {string}
 */
export const formatPercentage = (value, decimals = 1) => {
    return `${(value * 100).toFixed(decimals)}%`;
};

// ── Text ────────────────────────────────────────────────────────────────────

/**
 * Truncates text to a max length with ellipsis.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}…`;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " secs ago";
};
