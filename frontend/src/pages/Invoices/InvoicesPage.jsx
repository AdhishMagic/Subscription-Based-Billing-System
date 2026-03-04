import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineMagnifyingGlass,
    HiOutlineDocumentArrowDown,
} from 'react-icons/hi2';
import { useInvoices } from '../../hooks/useInvoices';
import InvoiceRow from '../../components/Invoices/InvoiceRow';
import InvoiceSkeletonRow from '../../components/Invoices/InvoiceSkeletonRow';
import styles from './InvoicesPage.module.css';

const InvoicesPage = () => {
    const navigate = useNavigate();
    const { invoices, isLoading } = useInvoices();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredInvoices = useMemo(() => {
        return invoices.filter(inv => {
            const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inv.customerName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || inv.status.toLowerCase() === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [invoices, searchTerm, statusFilter]);

    const stats = useMemo(() => {
        return {
            total: invoices.length,
            paid: invoices.filter(i => i.status === 'paid').length,
            overdue: invoices.filter(i => i.status === 'overdue').length,
            draft: invoices.filter(i => i.status === 'draft').length,
            confirmed: invoices.filter(i => i.status === 'confirmed').length,
        };
    }, [invoices]);

    // Component Optimization: Extracting functions and wrapping in useCallback
    // This prevents the <InvoiceRow> from breaking its React.memo check on every render.
    const handleExport = useCallback(() => {
        console.log('Exporting invoices...');
        alert('Export function placeholder');
    }, []);

    const formatCurrency = useCallback((amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }, []);

    const handleNavigateToDetails = useCallback((id) => {
        navigate(`/invoices/${id}`);
    }, [navigate]);

    return (
        <div className={styles.pageContainer}>
            {/* Header section */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Invoices</h1>
                    <p className={styles.subtitle}>Manage your billing and revenue lifecycle</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.exportBtn} onClick={handleExport}>
                        <HiOutlineDocumentArrowDown className={styles.btnIcon} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats row */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Total Invoices</span>
                    <span className={styles.statValue}>{stats.total}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Paid</span>
                    <span className={styles.statValue}>{stats.paid}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Confirmed</span>
                    <span className={styles.statValue}>{stats.confirmed}</span>
                </div>
                <div className={`${styles.statCard} ${styles.statCardOverdue}`}>
                    <span className={styles.statLabel}>Overdue</span>
                    <span className={styles.statValue}>{stats.overdue}</span>
                </div>
            </div>

            {/* Filters & Search */}
            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <HiOutlineMagnifyingGlass className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by invoice number or customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filters}>
                    {['all', 'draft', 'confirmed', 'paid', 'overdue'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`${styles.filterBtn} ${statusFilter === status ? styles.filterBtnActive : ''}`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Data Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Customer</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th className={styles.alignRight}>Total</th>
                            <th>Status</th>
                            <th className={styles.alignCenter}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            // Render Skeleton Loaders instead of spinner
                            Array.from({ length: 5 }).map((_, idx) => (
                                <InvoiceSkeletonRow key={idx} />
                            ))
                        ) : filteredInvoices.length === 0 ? (
                            <tr>
                                <td colSpan="7">
                                    <div className={styles.emptyState}>No invoices found matching your criteria.</div>
                                </td>
                            </tr>
                        ) : (
                            filteredInvoices.map((inv) => (
                                // Render highly optimized, memoized Virtualized Row placeholders
                                <InvoiceRow
                                    key={inv.id}
                                    invoice={inv}
                                    formatCurrency={formatCurrency}
                                    onNavigate={handleNavigateToDetails}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoicesPage;
