/* ==========================================================================
   PASSWORD INPUT COMPONENT
   Extends the base Input with a visibility toggle button.
   
   Separation of Concerns:
   - Visual toggle only — no validation logic here.
   - Validation lives in utils/authValidators.
   - This is a presentational wrapper around the base Input.
   ========================================================================== */

import { useState, forwardRef } from 'react';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import Input from '../../ui/Input/Input';
import './PasswordInput.css';

const PasswordInput = forwardRef(({
    label = 'Password',
    name = 'password',
    placeholder = 'Enter your password',
    value,
    onChange,
    onBlur,
    error = '',
    required = false,
    className = '',
    ...rest
}, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible((prev) => !prev);

    return (
        <div className={`password-input ${className}`}>
            <Input
                ref={ref}
                label={label}
                name={name}
                type={visible ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                required={required}
                {...rest}
            />
            <button
                type="button"
                className="password-input__toggle"
                onClick={toggleVisibility}
                aria-label={visible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
            >
                {visible
                    ? <HiOutlineEyeSlash className="password-input__toggle-icon" />
                    : <HiOutlineEye className="password-input__toggle-icon" />
                }
            </button>
        </div>
    );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
