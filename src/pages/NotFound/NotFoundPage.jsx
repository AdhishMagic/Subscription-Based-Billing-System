import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

const NotFoundPage = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: 'var(--space-8)',
    }}>
        <h1 style={{ fontSize: 'var(--font-5xl)', marginBottom: 'var(--space-4)' }}>404</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            The page you're looking for doesn't exist.
        </p>
        <Link to="/dashboard">
            <Button variant="primary">Go to Dashboard</Button>
        </Link>
    </div>
);

export default NotFoundPage;
