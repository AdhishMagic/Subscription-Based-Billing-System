/* ==========================================================================
   TOGGLE SWITCH
   Custom animated toggle switch component for plan options.
   
   Design:
   - 44px hit target for accessibility
   - Smooth 250ms transition with accent glow
   - Consistent with ViaTunnel dark premium aesthetic
   - Supports label and description text
   ========================================================================== */

import { memo, useCallback } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({
    id,
    checked = false,
    onChange,
    label,
    description,
    disabled = false,
}) => {
    const handleChange = useCallback(() => {
        if (!disabled) {
            onChange(!checked);
        }
    }, [checked, onChange, disabled]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleChange();
        }
    }, [handleChange]);

    return (
        <div className={`toggle-switch ${disabled ? 'toggle-switch--disabled' : ''}`}>
            <div
                className="toggle-switch__track-wrapper"
                onClick={handleChange}
                role="switch"
                aria-checked={checked}
                aria-label={label}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                id={id}
            >
                <div className={`toggle-switch__track ${checked ? 'toggle-switch__track--active' : ''}`}>
                    <div className={`toggle-switch__thumb ${checked ? 'toggle-switch__thumb--active' : ''}`}>
                        {checked && (
                            <svg
                                className="toggle-switch__check-icon"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 6L5 8.5L9.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
            {(label || description) && (
                <div className="toggle-switch__label-group" onClick={handleChange}>
                    {label && (
                        <span className={`toggle-switch__label ${checked ? 'toggle-switch__label--active' : ''}`}>
                            {label}
                        </span>
                    )}
                    {description && (
                        <span className="toggle-switch__description">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(ToggleSwitch);
