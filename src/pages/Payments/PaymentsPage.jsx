import React, { useState, useMemo } from 'react';
import {
    HiOutlineMagnifyingGlass,
    HiOutlinePlus,
    HiOutlineDocumentArrowDown
} from 'react-icons/hi2';
import { usePayments } from '../../hooks/usePayments';
import PaymentSummaryWidget from '../../components/Payments/PaymentSummaryWidget';
import RecordPaymentModal from '../../components/Payments/RecordPaymentModal';
import PaymentStatusBadge from '../../components/Payments/PaymentStatusBadge';
import InvoicePaymentHistory from '../../components/Payments/InvoicePaymentHistory';
import styles from './PaymentsPage.module.css';

const PaymentsPage = () => {
    const {
        payments,
        invoices,
        isLoading,
        paymentsSummary,
        getInvoiceBalance,
        recordPayment
    } = usePayments();

    const [searchTerm, setSearchTerm] = useState('');
    const [methodFilter, setMethodFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('All'); // 'All', 'Last 7 Days', 'This Month'
    const [isModalOpen, setIsModalOpen] = useState(false);

    // UI state for showing history panel
    const [selectedPaymentForHistory, setSelectedPaymentForHistory] = useState(null);

    const filteredPayments = useMemo(() => {
        return payments.filter(p => {
            const matchesSearch = p.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.customerName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesMethod = methodFilter === 'All' || p.method === methodFilter;

            let matchesDate = true;
            if (dateFilter !== 'All') {
                const pDate = new Date(p.date);
                const now = new Date();
                if (dateFilter === 'Last 7 Days') {
                    const weekAgo = new Date();
                    weekAgo.setDate(now.getDate() - 7);
                    matchesDate = pDate >= weekAgo;
                } else if (dateFilter === 'This Month') {
                    matchesDate = pDate.getMonth() === now.getMonth() && pDate.getFullYear() === now.getFullYear();
                }
            }

            return matchesSearch && matchesMethod && matchesDate;
        });
    }, [payments, searchTerm, methodFilter, dateFilter]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const handleConfirmPayment = (paymentData) => {
        recordPayment(paymentData);
        setIsModalOpen(false);
    };

    const handleViewInvoiceHistory = (invoiceId) => {
        const inv = invoices.find(i => i.id === invoiceId);
        setSelectedPaymentForHistory(inv);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Header section */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Payments</h1>
                    <p className={styles.subtitle}>Track reconciliation and payment history</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.exportBtn}>
                        <HiOutlineDocumentArrowDown className={styles.btnIcon} />
                        Export Report
                    </button>
                    <button className={styles.createBtn} onClick={() => setIsModalOpen(true)}>
                        <HiOutlinePlus className={styles.btnIcon} />
                        Record Payment
                    </button>
                </div>
            </div>

            {/* Dashboard Widget */}
            <PaymentSummaryWidget summary={paymentsSummary} />

            {/* Split layout if an invoice's history is selected */}
            <div className={styles.contentLayout}>
                <div className={selectedPaymentForHistory ? styles.mainColumnSplit : styles.mainColumnFull}>

                    {/* Controls */}
                    <div className={styles.controls}>
                        <div className={styles.searchWrapper}>
                            <HiOutlineMagnifyingGlass className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search by invoice or customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        <div className={styles.filtersWrapper}>
                            <select
                                value={methodFilter}
                                onChange={(e) => setMethodFilter(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="All">All Methods</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Crypto">Crypto</option>
                                <option value="PayPal">PayPal</option>
                            </select>

                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="All">All Time</option>
                                <option value="Last 7 Days">Last 7 Days</option>
                                <option value="This Month">This Month</option>
                            </select>
                        </div>
                    </div>

                    {/* Main Payments Table */}
                    <div className={styles.tableContainer}>
                        {isLoading ? (
                            <div className={styles.loadingState}>Loading payments...</div>
                        ) : filteredPayments.length === 0 ? (
                            <div className={styles.emptyState}>No payments found.</div>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Payment ID</th>
                                        <th>Invoice No.</th>
                                        <th>Customer</th>
                                        <th>Method</th>
                                        <th className={styles.alignRight}>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map(payment => (
                                        <tr
                                            key={payment.id}
                                            className={`${styles.tableRow} ${selectedPaymentForHistory?.id === payment.invoiceId ? styles.rowActive : ''}`}
                                            onClick={() => handleViewInvoiceHistory(payment.invoiceId)}
                                        >
                                            <td className={styles.fontMonoId}>{payment.id}</td>
                                            <td className={styles.fontMonoInv}>
                                                <button
                                                    className={styles.invoiceLinkBtn}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewInvoiceHistory(payment.invoiceId);
                                                    }}
                                                >
                                                    {payment.invoiceId}
                                                </button>
                                            </td>
                                            <td><div className={styles.customerName}>{payment.customerName}</div></td>
                                            <td><span className={styles.methodBadge}>{payment.method}</span></td>
                                            <td className={`${styles.alignRight} ${styles.fontNumbersAmount}`}>
                                                {formatCurrency(payment.amount)}
                                            </td>
                                            <td className={styles.dateCell}>{new Date(payment.date).toLocaleDateString()}</td>
                                            <td><PaymentStatusBadge status={payment.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Optional History Panel */}
                {selectedPaymentForHistory && (
                    <div className={styles.sidePanel}>
                        <div className={styles.panelCloseWrapper}>
                            <button className={styles.panelCloseBtn} onClick={() => setSelectedPaymentForHistory(null)}>
                                Close Panel
                            </button>
                        </div>
                        <InvoicePaymentHistory
                            invoice={selectedPaymentForHistory}
                            payments={payments}
                            getInvoiceBalance={getInvoiceBalance}
                        />
                    </div>
                )}
            </div>

            <RecordPaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                invoices={invoices}
                getInvoiceBalance={getInvoiceBalance}
                onConfirm={handleConfirmPayment}
            />
        </div>
    );
};

export default PaymentsPage;
