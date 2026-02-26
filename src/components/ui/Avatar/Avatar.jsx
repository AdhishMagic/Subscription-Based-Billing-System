import './Avatar.css';

const getInitials = (name = '') =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

const Avatar = ({ name = '', src = '', size = 'md', className = '', ...rest }) => (
    <div className={`avatar avatar--${size} ${className}`} title={name} {...rest}>
        {src ? (
            <img className="avatar__image" src={src} alt={name} />
        ) : (
            <span>{getInitials(name)}</span>
        )}
    </div>
);

export default Avatar;
