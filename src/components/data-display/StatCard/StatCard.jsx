/* ==========================================================================
   STAT CARD COMPONENT
   Dashboard metric card for KPI display.
   ========================================================================== */

import './StatCard.css';

const StatCard = ({
    icon,
    label,
    value,
    trend = null,          // { value: '+12%', direction: 'up' | 'down' }
    variant = 'accent',    // 'accent' | 'success' | 'warning' | 'info'
    className = '',
}) => (
    <div className={`stat-card ${className}`}>
        {icon && (
            <div className={`stat-card__icon stat-card__icon--${variant}`}>
                {icon}
            </div>
        )}
        <div className="stat-card__content">
            <p className="stat-card__label">{label}</p>
            <p className="stat-card__value">{value}</p>
            {trend && (
                <p className={`stat-card__trend stat-card__trend--${trend.direction}`}>
                    {trend.value}
                </p>
            )}
        </div>
    </div>
);

export default StatCard;
