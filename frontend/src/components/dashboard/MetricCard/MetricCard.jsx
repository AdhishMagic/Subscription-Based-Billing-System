/* ==========================================================================
   METRIC CARD COMPONENT
   Top-level KPI display with animated counter, trend indicator, and
   contextual icon. Each card has a unique gradient accent.

   Props:
   ─ label        Descriptive label (e.g. "Monthly Revenue")
   ─ value        Numeric value to display
   ─ prefix       Optional prefix (e.g. "$")
   ─ suffix       Optional suffix (e.g. "%")
   ─ trend        { value: number, direction: 'up' | 'down' }
   ─ icon         Icon type identifier
   ─ delay        Stagger animation delay (ms)
   ========================================================================== */

import { useState, useEffect, useRef } from 'react';
import {
    HiOutlineCreditCard,
    HiOutlineCurrencyDollar,
    HiOutlineDocumentText,
    HiOutlineUserGroup,
} from 'react-icons/hi';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';
import './MetricCard.css';

/* Map icon identifiers to React Icon components */
const ICON_MAP = {
    subscriptions: HiOutlineCreditCard,
    revenue: HiOutlineCurrencyDollar,
    invoices: HiOutlineDocumentText,
    customers: HiOutlineUserGroup,
};

/* ── Animated Counter Hook ─────────────────────────────────────────────── */

const useAnimatedCounter = (target, duration = 1600) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef(null);

    useEffect(() => {
        let start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for a smooth deceleration effect
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * target);

            setCount(start);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [target, duration]);

    return count;
};

/* ── Component ─────────────────────────────────────────────────────────── */

const MetricCard = ({ label, value, prefix = '', suffix = '', trend, icon, delay = 0 }) => {
    const animatedValue = useAnimatedCounter(value);
    const IconComponent = ICON_MAP[icon] || HiOutlineCreditCard;
    const isPositive = trend?.direction === 'up';

    /* Format number with commas */
    const formattedValue = animatedValue.toLocaleString('en-US');

    return (
        <div
            className="metric-card"
            style={{ animationDelay: `${delay}ms` }}
            id={`metric-${icon}`}
        >
            {/* Decorative gradient accent bar */}
            <div className="metric-card__accent" />

            <div className="metric-card__content">
                <div className="metric-card__header">
                    <span className="metric-card__label">{label}</span>
                    <div className="metric-card__icon-wrapper">
                        <IconComponent className="metric-card__icon" />
                    </div>
                </div>

                <div className="metric-card__value">
                    {prefix && <span className="metric-card__prefix">{prefix}</span>}
                    {formattedValue}
                    {suffix && <span className="metric-card__suffix">{suffix}</span>}
                </div>

                {trend && (
                    <div className={`metric-card__trend metric-card__trend--${trend.direction}`}>
                        {isPositive ? (
                            <HiArrowTrendingUp className="metric-card__trend-icon" />
                        ) : (
                            <HiArrowTrendingDown className="metric-card__trend-icon" />
                        )}
                        <span className="metric-card__trend-value">
                            {isPositive ? '+' : '-'}{trend.value}%
                        </span>
                        <span className="metric-card__trend-label">from last month</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricCard;
