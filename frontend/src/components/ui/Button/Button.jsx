/* ==========================================================================
   BUTTON COMPONENT
   Reusable button with variant, size, loading, and disabled states.
   
   Separation of Concerns:
   - This component is PURE presentation + accessibility.
   - It has NO business logic, API calls, or state management.
   - Behavior is passed via props (onClick, type).
   ========================================================================== */

import './Button.css';

const Button = ({
    children,
    variant = 'primary',      // 'primary' | 'secondary' | 'ghost' | 'danger'
    size = 'md',               // 'sm' | 'md' | 'lg'
    type = 'button',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon = null,               // React node (icon element)
    onClick,
    className = '',
    ...rest
}) => {
    const classNames = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        disabled || loading ? 'btn--disabled' : '',
        fullWidth ? 'btn--fullWidth' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classNames}
            onClick={onClick}
            disabled={disabled || loading}
            aria-busy={loading}
            {...rest}
        >
            {loading && <span className="btn__spinner" aria-hidden="true" />}
            {!loading && icon && <span className="btn__icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
