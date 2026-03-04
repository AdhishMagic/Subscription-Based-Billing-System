import React from 'react';
import './PageLoader.css';

const PageLoader = ({ text = 'Loading module...' }) => {
    return (
        <div className="page-loader">
            <div className="page-loader-content">
                <div className="page-loader-logo">
                    <div className="page-loader-ring"></div>
                    <div className="page-loader-core"></div>
                </div>
                {text && <p className="page-loader-text">{text}</p>}
            </div>
        </div>
    );
};

export default PageLoader;
