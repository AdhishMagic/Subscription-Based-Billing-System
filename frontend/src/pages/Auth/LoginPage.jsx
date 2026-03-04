/* ==========================================================================
   LOGIN PAGE
   Email + password authentication form.
   
   Architecture:
   - Form state managed via useForm hook.
   - Validation logic lives in utils/validators + authValidators.
   - Auth actions come from useAuth() context hook.
   - Simulates login with dev credentials on submit.
   ========================================================================== */

import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import { PasswordInput } from '../../components/auth';
import { required, isValidEmail } from '../../utils/validators';
import { ROUTES } from '../../routes/routeConfig';
import './LoginPage.css';

// ── Validation ──────────────────────────────────────────────────────────────

const validateLogin = (values) => {
    const errors = {};

    const emailRequired = required(values.email, 'Email');
    if (!emailRequired.valid) {
        errors.email = emailRequired.message;
    } else {
        const emailFormat = isValidEmail(values.email);
        if (!emailFormat.valid) errors.email = emailFormat.message;
    }

    const passwordRequired = required(values.password, 'Password');
    if (!passwordRequired.valid) errors.password = passwordRequired.message;

    return errors;
};

// ── Component ───────────────────────────────────────────────────────────────

const LoginPage = () => {
    const { login } = useAuth();

    const onSubmit = useCallback(async (values) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // Simulated login — in production, authService.login() handles this
        await login({
            email: values.email,
            password: values.password,
        });
    }, [login]);

    const {
        values,
        errors,
        touched,
        isSubmitting,
        submitError,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm({
        initialValues: { email: '', password: '' },
        validate: validateLogin,
        onSubmit,
    });

    return (
        <div className="login-page">
            <h2 className="login-page__heading">Welcome back</h2>
            <p className="login-page__subheading">
                Sign in to your account to continue
            </p>

            {/* ── Error Banner ─────────────────────────────────────────────── */}
            {submitError && (
                <div className="login-page__alert login-page__alert--error" role="alert">
                    <span className="login-page__alert-dot" />
                    {submitError}
                </div>
            )}

            {/* ── Form ─────────────────────────────────────────────────────── */}
            <form className="login-page__form" onSubmit={handleSubmit} noValidate>
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email ? errors.email : ''}
                    icon={<HiOutlineEnvelope />}
                    required
                    autoComplete="email"
                    id="login-email"
                />

                <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password ? errors.password : ''}
                    required
                    autoComplete="current-password"
                    id="login-password"
                />

                <div className="login-page__actions">
                    <Link
                        to={ROUTES.RESET_PASSWORD}
                        className="login-page__forgot-link"
                        id="login-forgot-password"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    id="login-submit"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            {/* ── Register Link ────────────────────────────────────────────── */}
            <p className="login-page__footer">
                Don&apos;t have an account?{' '}
                <Link to={ROUTES.REGISTER} className="login-page__register-link" id="login-register-link">
                    Create account
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
