/* ==========================================================================
   VALIDATORS
   Pure validation functions for form fields.
   
   Each function returns { valid: boolean, message: string }.
   This keeps validation logic OUT of components and reusable everywhere.
   ========================================================================== */

/**
 * Validates that a value is not empty.
 * @param {string} value
 * @param {string} fieldName
 * @returns {{ valid: boolean, message: string }}
 */
export const required = (value, fieldName = 'Field') => {
    const valid = value !== undefined && value !== null && String(value).trim() !== '';
    return {
        valid,
        message: valid ? '' : `${fieldName} is required.`,
    };
};

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(email);
    return {
        valid,
        message: valid ? '' : 'Please enter a valid email address.',
    };
};

/**
 * Validates minimum string length.
 * @param {string} value
 * @param {number} min
 * @param {string} fieldName
 * @returns {{ valid: boolean, message: string }}
 */
export const minLength = (value, min, fieldName = 'Field') => {
    const valid = String(value).length >= min;
    return {
        valid,
        message: valid ? '' : `${fieldName} must be at least ${min} characters.`,
    };
};

/**
 * Validates maximum string length.
 * @param {string} value
 * @param {number} max
 * @param {string} fieldName
 * @returns {{ valid: boolean, message: string }}
 */
export const maxLength = (value, max, fieldName = 'Field') => {
    const valid = String(value).length <= max;
    return {
        valid,
        message: valid ? '' : `${fieldName} must not exceed ${max} characters.`,
    };
};

/**
 * Validates a positive number.
 * @param {number} value
 * @param {string} fieldName
 * @returns {{ valid: boolean, message: string }}
 */
export const isPositiveNumber = (value, fieldName = 'Value') => {
    const num = Number(value);
    const valid = !isNaN(num) && num > 0;
    return {
        valid,
        message: valid ? '' : `${fieldName} must be a positive number.`,
    };
};

/**
 * Runs multiple validators on a value and returns the first failure.
 * @param {any} value
 * @param {Array<Function>} validators - Array of validator functions
 * @returns {{ valid: boolean, message: string }}
 */
export const validate = (value, validators) => {
    for (const validator of validators) {
        const result = validator(value);
        if (!result.valid) return result;
    }
    return { valid: true, message: '' };
};
