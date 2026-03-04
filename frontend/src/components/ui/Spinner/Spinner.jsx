import './Spinner.css';

const Spinner = ({ size = 'md', className = '' }) => (
    <div className="spinner-container">
        <div
            className={`spinner spinner--${size} ${className}`}
            role="status"
            aria-label="Loading"
        />
    </div>
);

export default Spinner;
