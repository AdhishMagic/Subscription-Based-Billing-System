/* ==========================================================================
   AUTH VALIDATORS
   Password and auth-specific validation logic.
   
   Architecture:
   - Pure functions — no side effects, no state.
   - Each rule returns { passed: boolean, message: string }.
   - getPasswordStrength() aggregates all rules for the strength indicator.
   - Separated from generic validators.js for domain clarity.
   ========================================================================== */

// ── Simulated Used Emails (replace with API call in production) ─────────────

const TAKEN_EMAILS = [
    'admin@subbill.dev',
    'internal@subbill.dev',
    'portal@subbill.dev',
    'test@example.com',
    'john@company.com',
];

// ── Password Rules ──────────────────────────────────────────────────────────

export const PASSWORD_RULES = [
    {
        id: 'minLength',
        test: (pw) => pw.length >= 8,
        message: 'At least 8 characters',
    },
    {
        id: 'uppercase',
        test: (pw) => /[A-Z]/.test(pw),
        message: 'Contains uppercase letter',
    },
    {
        id: 'lowercase',
        test: (pw) => /[a-z]/.test(pw),
        message: 'Contains lowercase letter',
    },
    {
        id: 'specialChar',
        test: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pw),
        message: 'Contains special character',
    },
];

/**
 * Evaluate all password rules against the given value.
 * @param {string} password
 * @returns {{ rules: Array<{ id, message, passed }>, score: number, label: string, percent: number }}
 */
export const getPasswordStrength = (password = '') => {
    const rules = PASSWORD_RULES.map((rule) => ({
        id: rule.id,
        message: rule.message,
        passed: rule.test(password),
    }));

    const score = rules.filter((r) => r.passed).length;
    const total = rules.length;
    const percent = Math.round((score / total) * 100);

    let label = 'Weak';
    if (score === total) label = 'Strong';
    else if (score >= 3) label = 'Good';
    else if (score >= 2) label = 'Fair';

    return { rules, score, total, label, percent };
};

/**
 * Validate that the password meets ALL rules.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export const isStrongPassword = (password) => {
    const { score, total } = getPasswordStrength(password);
    return {
        valid: score === total,
        message: score === total ? '' : 'Password does not meet all requirements.',
    };
};

/**
 * Validate that password and confirmPassword match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {{ valid: boolean, message: string }}
 */
export const passwordsMatch = (password, confirmPassword) => {
    const valid = password === confirmPassword;
    return {
        valid,
        message: valid ? '' : 'Passwords do not match.',
    };
};

/**
 * Simulate an email uniqueness check.
 * In production, this would be an async API call.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export const isEmailAvailable = (email) => {
    const taken = TAKEN_EMAILS.includes(email.toLowerCase().trim());
    return {
        valid: !taken,
        message: taken ? 'This email is already registered.' : '',
    };
};

/**
 * Validate full name (at least 2 characters, no numbers).
 * @param {string} name
 * @returns {{ valid: boolean, message: string }}
 */
export const isValidName = (name) => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters.' };
    }
    if (/\d/.test(trimmed)) {
        return { valid: false, message: 'Name should not contain numbers.' };
    }
    return { valid: true, message: '' };
};
