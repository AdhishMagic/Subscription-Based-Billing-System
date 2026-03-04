import { useState, useEffect } from 'react';
import { HiOutlineExclamationTriangle, HiXMark } from 'react-icons/hi2';
import './AlertBanner.css';

// Using mock data for the UI Concept
// In a real implementation this would come from IntelligenceContext Alerts Provider
const mockSystemAlerts = [
    {
        id: 'ALT-01',
        type: 'DANGER',
        message: 'Invoice INV-0045 is overdue. Please review immediately.',
        link: '/invoices/INV-0045'
    },
    {
        id: 'ALT-02',
        type: 'WARNING',
        message: 'System Maintenance scheduled in 2 hours. Service may be disrupted.',
    }
];

const AlertBanner = () => {
    const [alerts, setAlerts] = useState(mockSystemAlerts);

    // Auto-dismiss the warning alert for demo purposes
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlerts(prev => prev.filter(a => a.id !== 'ALT-02'));
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const dismissAlert = (id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    if (alerts.length === 0) return null;

    return (
        <div className="alert-banner-container">
            {alerts.map(alert => (
                <div key={alert.id} className={`alert-banner alert-banner--${alert.type.toLowerCase()}`}>
                    <div className="alert-banner__content">
                        <HiOutlineExclamationTriangle className="alert-banner__icon" />
                        <span className="alert-banner__message">{alert.message}</span>
                        {alert.link && (
                            <a href={alert.link} className="alert-banner__link">View Details</a>
                        )}
                    </div>
                    <button
                        className="alert-banner__close"
                        onClick={() => dismissAlert(alert.id)}
                        aria-label="Dismiss alert"
                    >
                        <HiXMark size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AlertBanner;
