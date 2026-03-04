/**
 * Math utilities — single source of truth for financial calculations.
 */
const round = (value, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON) * factor) / factor;
};

const calculateTax = (subtotal, taxRate) => round(subtotal * (taxRate / 100));

const calculateTotals = (lines, taxRate = 0, discount = 0) => {
    const subtotal = lines.reduce(
        (sum, line) => sum + round(line.quantity * line.unitPrice),
        0
    );
    const taxAmount = calculateTax(subtotal, taxRate);
    const total = round(subtotal + taxAmount - discount);
    return { subtotal: round(subtotal), taxAmount, total: Math.max(0, total) };
};

module.exports = { round, calculateTax, calculateTotals };
