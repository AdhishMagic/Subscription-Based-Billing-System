import './Badge.css';

const Badge = ({ children, variant = 'neutral', className = '', ...rest }) => (
    <span className={`badge badge--${variant} ${className}`} {...rest}>
        {children}
    </span>
);

export default Badge;
