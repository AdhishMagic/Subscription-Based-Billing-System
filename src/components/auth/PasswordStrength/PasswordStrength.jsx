/* ==========================================================================
   PASSWORD STRENGTH INDICATOR
   Visual indicator showing password rule compliance.
   
   Architecture:
   - Receives strength data as props (from getPasswordStrength()).
   - Zero logic — pure presentation.
   - CSS-driven animations for smooth rule check transitions.
   ========================================================================== */

import { HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2';
import './PasswordStrength.css';

const PasswordStrength = ({ strength, visible = true }) => {
    if (!visible || !strength) return null;

    const { rules, label, percent } = strength;

    return (
        <div className="password-strength" role="status" aria-label="Password strength indicator">
            {/* ── Strength Bar ─────────────────────────────────────────────── */}
            <div className="password-strength__bar-track">
                <div
                    className={`password-strength__bar-fill password-strength__bar-fill--${label.toLowerCase()}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className={`password-strength__label password-strength__label--${label.toLowerCase()}`}>
                {label}
            </span>

            {/* ── Rule Checklist ───────────────────────────────────────────── */}
            <ul className="password-strength__rules" aria-label="Password requirements">
                {rules.map((rule) => (
                    <li
                        key={rule.id}
                        className={`password-strength__rule ${rule.passed ? 'password-strength__rule--passed' : ''}`}
                    >
                        <span className="password-strength__rule-icon" aria-hidden="true">
                            {rule.passed ? <HiOutlineCheck /> : <HiOutlineXMark />}
                        </span>
                        <span>{rule.message}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordStrength;
