/* ==========================================================================
   BILLING PERIOD SELECTOR
   Segmented control for choosing daily/weekly/monthly/yearly billing.
   
   Design:
   - Full width segmented bar
   - Sliding background highlight for active state
   - Icons for each period type
   ========================================================================== */

import { memo, useRef, useState, useEffect } from 'react';
import {
    HiOutlineCalendar,
    HiOutlineCalendarDays,
    HiOutlineArrowPath,
    HiOutlineClock,
} from 'react-icons/hi2';
import { BILLING_PERIODS } from '../../../data/plansMockData';
import './BillingPeriodSelector.css';

const PERIOD_ICONS = {
    daily: HiOutlineClock,
    weekly: HiOutlineCalendarDays,
    monthly: HiOutlineCalendar,
    yearly: HiOutlineArrowPath,
};

const BillingPeriodSelector = ({ value, onChange, disabled }) => {
    const containerRef = useRef(null);
    const [highlightStyle, setHighlightStyle] = useState({});

    useEffect(() => {
        // Calculate the sliding highlight position whenever value changes
        if (!containerRef.current) return;

        const activeIndex = BILLING_PERIODS.findIndex(p => p.value === value);
        if (activeIndex === -1) return;

        const buttons = Array.from(containerRef.current.querySelectorAll('.billing-period-selector__btn'));
        const activeButton = buttons[activeIndex];

        if (activeButton) {
            setHighlightStyle({
                left: `${activeButton.offsetLeft}px`,
                width: `${activeButton.offsetWidth}px`,
            });
        }
    }, [value]);

    return (
        <div
            className={`billing-period-selector ${disabled ? 'billing-period-selector--disabled' : ''}`}
            ref={containerRef}
            role="radiogroup"
            aria-label="Billing Period"
        >
            <div
                className="billing-period-selector__highlight"
                style={highlightStyle}
                aria-hidden="true"
            />
            {BILLING_PERIODS.map((period) => {
                const Icon = PERIOD_ICONS[period.value];
                const isActive = value === period.value;

                return (
                    <button
                        key={period.value}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        disabled={disabled}
                        className={`billing-period-selector__btn ${isActive ? 'billing-period-selector__btn--active' : ''}`}
                        onClick={() => onChange(period.value)}
                    >
                        {Icon && <Icon className="billing-period-selector__icon" size={16} />}
                        <span className="billing-period-selector__label">{period.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default memo(BillingPeriodSelector);
