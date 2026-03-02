import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlineMagnifyingGlass,
    HiOutlineDocumentArrowDown,
    HiOutlineEye
} from 'react-icons/hi2';
import { useInvoices } from '../../hooks/useInvoices';
import InvoiceStatusBadge from '../../components/Invoices/InvoiceStatusBadge';
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

    const handleExport = () => {
        // Placeholder functionality
        console.log('Exporting invoices...');
        alert('Export function placeholder');
    };

    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

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
                {isLoading ? (
                    <div className={styles.loadingState}>Loading invoices...</div>
                ) : filteredInvoices.length === 0 ? (
                    <div className={styles.emptyState}>No invoices found matching your criteria.</div>
                ) : (
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
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.id} className={inv.status === 'overdue' ? styles.rowOverdue : ''}>
                                    <td className={styles.fontMono}>{inv.id}</td>
                                    <td>
                                        <div className={styles.customerName}>{inv.customerName}</div>
                                    </td>
                                    <td>{new Date(inv.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td>{new Date(inv.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td className={`${styles.alignRight} ${styles.fontNumbers}`}>
                                        {formatCurrency(inv.total, inv.currency)}
                                    </td>
                                    <td>
                                        <InvoiceStatusBadge status={inv.status} />
                                    </td>
                                    <td className={styles.alignCenter}>
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => navigate(`/invoices/${inv.id}`)}
                                            title="View Details"
                                        >
                                            <HiOutlineEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default InvoicesPage;
