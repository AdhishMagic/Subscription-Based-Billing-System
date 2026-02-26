/* ==========================================================================
   CARD COMPONENT
   Glassmorphism container with optional header, footer, and hover effects.
   Pure presentational — no state or logic.
   ========================================================================== */

import './Card.css';

const Card = ({
    children,
    hoverable = false,
    bordered = false,
    glow = false,
    compact = false,
    spacious = false,
    className = '',
    ...rest
}) => {
    const classNames = [
        'card',
        hoverable ? 'card--hoverable' : '',
        bordered ? 'card--bordered' : '',
        glow ? 'card--glow' : '',
        compact ? 'card--compact' : '',
        spacious ? 'card--spacious' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classNames} {...rest}>
            {children}
        </div>
    );
};

/* ── Sub-components for structured layout ──────────────────────────────── */

const CardHeader = ({ children, className = '', ...rest }) => (
    <div className={`card__header ${className}`} {...rest}>
        {children}
    </div>
);

const CardTitle = ({ children, className = '', ...rest }) => (
    <h3 className={`card__title ${className}`} {...rest}>
        {children}
    </h3>
);

const CardBody = ({ children, className = '', ...rest }) => (
    <div className={`card__body ${className}`} {...rest}>
        {children}
    </div>
);

const CardFooter = ({ children, className = '', ...rest }) => (
    <div className={`card__footer ${className}`} {...rest}>
        {children}
    </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
