import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiOutlinePencilSquare, HiOutlineTrash, HiMagnifyingGlass, HiOutlineReceiptPercent } from 'react-icons/hi2';

import { ROUTES } from '../../routes/routeConfig';
import { mockTaxes } from '../../data/mockTaxes';
import DataTable from '../../components/data-display/DataTable/DataTable';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Badge from '../../components/ui/Badge/Badge';
import useModal from '../../hooks/useModal';
import useToast from '../../hooks/useToast';

import styles from './TaxesPage.module.css';

const TaxesPage = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { addToast } = useToast();

    const [taxes, setTaxes] = useState(mockTaxes);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Toggle active status handler
    const handleToggleStatus = (taxItem) => {
        const newStatus = taxItem.status === 'active' ? 'inactive' : 'active';
        setTaxes(prev => prev.map(t => t.id === taxItem.id ? { ...t, status: newStatus } : t));
        addToast('success', `Tax ${newStatus}`);
    };

    // ── Table Columns ───────────────────────────────────────────────────────
    const columns = useMemo(() => [
        {
            key: 'name',
            header: 'Tax Name',
            render: (item) => (
                <div className={styles.nameCell}>
                    <HiOutlineReceiptPercent className={styles.taxIcon} />
                    <span className={styles.taxName}>{item.name}</span>
                </div>
            )
        },
        {
            key: 'type',
            header: 'Type',
            render: (item) => <span className={styles.typeText}>{item.type}</span>
        },
        {
            key: 'rate',
            header: 'Rate (%)',
            align: 'right',
            render: (item) => (
                <span className={styles.rateText}>{item.rate.toFixed(2)}%</span>
            )
        },
        {
            key: 'appliesTo',
            header: 'Applies To',
            render: (item) => {
                const labels = {
                    all: 'All',
                    products: 'Products Only',
                    subscriptions: 'Subscriptions Only'
                };
                return <span className={styles.appliesToText}>{labels[item.appliesTo] || item.appliesTo}</span>;
            }
        },
        {
            key: 'status',
            header: 'Status',
            render: (item) => {
                const statusConfig = {
                    active: { label: 'Active', variant: 'success' },
                    inactive: { label: 'Inactive', variant: 'default' },
                    scheduled: { label: 'Scheduled', variant: 'info' }
                };
                const config = statusConfig[item.status] || { label: item.status, variant: 'default' };
                return (
                    <div className={styles.statusCell}>
                        <Badge variant={config.variant}>{config.label}</Badge>
                        <label className={styles.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={item.status === 'active'}
                                onChange={() => handleToggleStatus(item)}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                );
            }
        },
        {
            key: 'createdAt',
            header: 'Created At',
            render: (item) => (
                <span className={styles.dateText}>
                    {new Date(item.createdAt).toLocaleDateString()}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (item) => (
                <div className={styles.actions}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.TAX_EDIT.replace(':id', item.id))}
                        title="Edit Tax Rule"
                    >
                        <HiOutlinePencilSquare />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteClick(item)}
                        title="Delete Tax Rule"
                    >
                        <HiOutlineTrash />
                    </Button>
                </div>
            )
        }
    ], [navigate]);

    // ── Handlers ────────────────────────────────────────────────────────────

    const handleDeleteClick = (tax) => {
        openModal({
            title: 'Delete Tax Rule',
            content: `Are you sure you want to delete the tax rule "${tax.name}"? This action could affect future invoices.`,
            confirmLabel: 'Delete Rule',
            confirmVariant: 'danger',
            onConfirm: () => {
                setTaxes(prev => prev.filter(t => t.id !== tax.id));
                addToast('success', 'Tax rule deleted successfully');
                closeModal();
            }
        });
    };

    // ── Filtering ───────────────────────────────────────────────────────────

    const filteredData = useMemo(() => {
        return taxes.filter(tax => {
            const matchesSearch = tax.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || tax.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
    }, [taxes, searchTerm, filterStatus]);

    return (
        <div className={styles.pageContainer}>
            <PageHeader
                title="Tax Setup"
                description="Manage tax rules, rates, and scopes for compliance and automated billing."
                actions={
                    <Button variant="primary" onClick={() => navigate(ROUTES.TAX_CREATE)}>
                        <HiPlus /> Add Tax Rule
                    </Button>
                }
            />

            <div className={styles.filtersSection}>
                <div className={styles.searchBox}>
                    <Input
                        icon={<HiMagnifyingGlass />}
                        placeholder="Search tax rules by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <select
                        className={styles.selectFilter}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <DataTable
                    data={filteredData}
                    columns={columns}
                    emptyMessage="No tax rules found matching your criteria."
                />
            </div>
        </div>
    );
};

export default TaxesPage;
