/* ==========================================================================
   INPUT COMPONENT
   Form input with label, icon, error, and helper text.
   Pure presentation — validation logic lives in utils/validators.
   ========================================================================== */

import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    name,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    icon = null,
    error = '',
    helperText = '',
    disabled = false,
    required = false,
    className = '',
    ...rest
}, ref) => {
    const fieldClasses = [
        'input-group__field',
        icon ? 'input-group__field--with-icon' : '',
        error ? 'input-group__field--error' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label htmlFor={name} className="input-group__label">
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                </label>
            )}
            <div className="input-group__wrapper">
                {icon && <span className="input-group__icon">{icon}</span>}
                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={fieldClasses}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...rest}
                />
            </div>
            {error && (
                <span id={`${name}-error`} className="input-group__error" role="alert">
                    {error}
                </span>
            )}
            {!error && helperText && (
                <span className="input-group__helper">{helperText}</span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
