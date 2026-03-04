/* ==========================================================================
   FINANCIAL SUMMARY PANEL
   Live-recalculating breakdown: Subtotal, Tax Breakdown, Total Tax,
   Grand Total.

   All calculations are UI-only — no persistence.
   ========================================================================== */

import { memo, useMemo } from 'react';
import { calcTemplateTotals } from '../../../data/templatesMockData';
import './FinancialSummary.css';

const FinancialSummary = ({ productLines }) => {
    const totals = useMemo(() => calcTemplateTotals(productLines), [productLines]);

    const formatCurrency = (val) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    if (productLines.length === 0) {
        return (
            <div className="financial-summary financial-summary--empty" id="financial-summary">
                <span className="financial-summary__title">Financial Summary</span>
                <p className="financial-summary__empty-text">
                    Add product lines to see the financial breakdown.
                </p>
            </div>
        );
    }

    return (
        <div className="financial-summary" id="financial-summary">
            <span className="financial-summary__title">Financial Summary</span>

            {/* Subtotal */}
            <div className="financial-summary__row">
                <span className="financial-summary__label">Subtotal</span>
                <span className="financial-summary__value">
                    {formatCurrency(totals.subtotal)}
                </span>
            </div>

            {/* Tax Breakdown */}
            {Object.entries(totals.taxBreakdown).map(([rate, amount]) => (
                <div
                    key={rate}
                    className="financial-summary__row financial-summary__row--tax"
                >
                    <span className="financial-summary__label">Tax ({rate})</span>
                    <span className="financial-summary__value">
                        {formatCurrency(amount)}
                    </span>
                </div>
            ))}

            {/* Total Tax */}
            <div className="financial-summary__row financial-summary__row--total-tax">
                <span className="financial-summary__label">Total Tax</span>
                <span className="financial-summary__value">
                    {formatCurrency(totals.totalTax)}
                </span>
            </div>

            {/* Grand Total */}
            <div className="financial-summary__row financial-summary__row--grand">
                <span className="financial-summary__label financial-summary__grand-label">
                    Grand Total
                </span>
                <span className="financial-summary__value financial-summary__grand-total">
                    {formatCurrency(totals.grandTotal)}
                </span>
            </div>
        </div>
    );
};

export default memo(FinancialSummary);
