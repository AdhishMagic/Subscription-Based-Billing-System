/* ==========================================================================
   ERROR BOUNDARY COMPONENT
   Class component (React limitation) that catches rendering errors.
   
   Separation of Concerns:
   - Catches JavaScript errors in its child component tree.
   - Displays a graceful fallback UI instead of a white screen.
   - Does NOT handle API errors — those are handled in services/hooks.
   ========================================================================== */

import { Component } from 'react';
import { HiExclamationTriangle } from 'react-icons/hi2';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to an error reporting service in production
        console.error('[ErrorBoundary]', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary__icon">
                        <HiExclamationTriangle />
                    </div>
                    <h2 className="error-boundary__title">Something went wrong</h2>
                    <p className="error-boundary__message">
                        An unexpected error occurred. Please try refreshing the page or contact support
                        if the problem persists.
                    </p>
                    <button className="btn btn--primary btn--md" onClick={this.handleReset}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
