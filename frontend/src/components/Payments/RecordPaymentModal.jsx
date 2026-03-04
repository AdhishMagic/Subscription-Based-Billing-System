import React, { useState, useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import styles from './RecordPaymentModal.module.css';

const RecordPaymentModal = ({ isOpen, onClose, invoices, getInvoiceBalance, onConfirm }) => {
    const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reference, setReference] = useState('');
    const [error, setError] = useState('');

    const outstandingBalance = selectedInvoiceId ? getInvoiceBalance(selectedInvoiceId) : 0;
    const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId);

    // Filter out fully paid invoices for the dropdown
    const availableInvoices = invoices.filter(inv => getInvoiceBalance(inv.id) > 0);

    useEffect(() => {
        if (!isOpen) {
            setSelectedInvoiceId('');
            setAmount('');
            setMethod('');
            setDate(new Date().toISOString().split('T')[0]);
            setReference('');
            setError('');
        }
    }, [isOpen]);

    const handleAmountChange = (e) => {
        const val = e.target.value;
        if (val === '' || /^\d*\.?\d*$/.test(val)) {
            setAmount(val);
        }
    };

    const handleConfirm = () => {
        setError('');

        if (!selectedInvoiceId) {
            setError('Please select an invoice.');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        if (parseFloat(amount) > outstandingBalance) {
            setError(`Amount cannot exceed the outstanding balance of $${outstandingBalance.toFixed(2)}.`);
            return;
        }
        if (!method) {
            setError('Please select a payment method.');
            return;
        }
        if (!date) {
            setError('Please select a payment date.');
            return;
        }

        const paymentData = {
            invoiceId: selectedInvoiceId,
            customerId: selectedInvoice.customerId,
            customerName: selectedInvoice.customerName,
            amount: parseFloat(amount),
            method,
            date,
            reference
        };

        onConfirm(paymentData);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Record Payment</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <HiXMark />
                    </button>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Select Invoice <span className={styles.required}>*</span></label>
                        <select
                            value={selectedInvoiceId}
                            onChange={(e) => {
                                setSelectedInvoiceId(e.target.value);
                                setAmount(''); // Reset amount when invoice changes
                            }}
                            className={styles.input}
                        >
                            <option value="">-- Choose Invoice --</option>
                            {availableInvoices.map(inv => (
                                <option key={inv.id} value={inv.id}>
                                    {inv.id} - {inv.customerName} (Bal: ${getInvoiceBalance(inv.id).toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.balanceDisplay}>
                        <span>Outstanding Balance</span>
                        <span className={styles.balanceAmount}>
                            ${outstandingBalance.toFixed(2)}
                        </span>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Payment Amount <span className={styles.required}>*</span></label>
                            <div className={styles.inputWithIcon}>
                                <span className={styles.currencySymbol}>$</span>
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="0.00"
                                    className={`${styles.input} ${styles.inputAmount}`}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Payment Method <span className={styles.required}>*</span></label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className={styles.input}
                            >
                                <option value="">Select Method</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Crypto">Crypto</option>
                                <option value="Check">Check</option>
                                <option value="Cash">Cash</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Payment Date <span className={styles.required}>*</span></label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Reference # (Optional)</label>
                            <input
                                type="text"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                placeholder="Txn ID, Check #, etc."
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.confirmBtn} onClick={handleConfirm}>
                        Submit Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecordPaymentModal;
