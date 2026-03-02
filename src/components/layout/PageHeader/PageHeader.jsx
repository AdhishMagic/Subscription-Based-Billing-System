import React from 'react';
import styles from './PageHeader.module.css';

const PageHeader = ({ title, description, actions, children }) => {
    return (
        <header className={styles.pageHeader}>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>{title}</h1>
                {description && <p className={styles.headerDescription}>{description}</p>}
            </div>
            {actions && (
                <div className={styles.headerActions}>
                    {actions}
                </div>
            )}
            {children && (
                <div className={styles.headerChildren}>
                    {children}
                </div>
            )}
        </header>
    );
};

export default PageHeader;
