/* ==========================================================================
   MATH UTILITIES
   Centralized financial calculation logic to ensure high-precision rounding
   and prevent floating-point inaccuracies.
   ========================================================================== */

/**
 * Rounds a number to a specific number of decimal places.
 * @param {number} value - The number to round.
 * @param {number} decimals - Number of decimal places (default: 2).
 * @returns {number}
 */
export const round = (value, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON) * factor) / factor;
};

/**
 * Calculates tax amount with precise rounding.
 * @param {number} subtotal 
 * @param {number} taxRate - Percentage (e.g., 10 for 10%)
 * @returns {number}
 */
export const calculateTax = (subtotal, taxRate) => {
    return round(subtotal * (taxRate / 100));
};

/**
 * Calculates grand total for a list of line items.
 * Each line item is expected to have { quantity, unitPrice }.
 * @param {Array} lines 
 * @param {number} taxRate - Percentage
 * @param {number} discount - Fixed amount
 * @returns {{ subtotal: number, taxAmount: number, total: number }}
 */
export const calculateTotals = (lines, taxRate = 0, discount = 0) => {
    const subtotal = lines.reduce((sum, line) => {
        return sum + round(line.quantity * line.unitPrice);
    }, 0);

    const taxAmount = calculateTax(subtotal, taxRate);
    const total = round(subtotal + taxAmount - discount);

    return {
        subtotal: round(subtotal),
        taxAmount,
        total: Math.max(0, total) // Prevent negative totals
    };
};
