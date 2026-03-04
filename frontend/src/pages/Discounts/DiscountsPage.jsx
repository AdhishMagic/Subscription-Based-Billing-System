import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiPlus, HiOutlinePencilSquare, HiOutlineTrash, HiMagnifyingGlass, HiOutlineTag } from 'react-icons/hi2';

import { ROUTES } from '../../routes/routeConfig';
import { mockDiscounts } from '../../data/mockDiscounts';
import DataTable from '../../components/data-display/DataTable/DataTable';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Badge from '../../components/ui/Badge/Badge';
import useModal from '../../hooks/useModal';
import useToast from '../../hooks/useToast';

import styles from './DiscountsPage.module.css';

const DiscountsPage = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { addToast } = useToast();

    const [discounts, setDiscounts] = useState(mockDiscounts);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // ── Table Columns ───────────────────────────────────────────────────────
    const columns = useMemo(() => [
        {
            key: 'name',
            header: 'Discount Name',
            render: (item) => (
                <div className={styles.nameCell}>
                    <HiOutlineTag className={styles.discountIcon} />
                    <span className={styles.discountName}>{item.name}</span>
                </div>
            )
        },
        {
            key: 'type',
            header: 'Type',
            render: (item) => (
                <span className={styles.typeText}>
                    {item.type === 'percentage' ? 'Percentage (%)' : 'Fixed Amount ($)'}
                </span>
            )
        },
        {
            key: 'value',
            header: 'Value',
            render: (item) => (
                <span className={styles.valueText}>
                    {item.type === 'percentage' ? `${item.value}%` : `$${item.value.toFixed(2)}`}
                </span>
            )
        },
        {
            key: 'validity',
            header: 'Validity',
            render: (item) => (
                <span className={styles.validityText}>
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </span>
            )
        },
        {
            key: 'usage',
            header: 'Usage Limit',
            render: (item) => (
                <span className={styles.usageText}>
                    {item.usageLimit ? `${item.usageCount} / ${item.usageLimit}` : 'Unlimited'}
                </span>
            )
        },
        {
            key: 'status',
            header: 'Status',
            render: (item) => {
                const statusConfig = {
                    active: { label: 'Active', variant: 'success' },
                    scheduled: { label: 'Scheduled', variant: 'info' },
                    expired: { label: 'Expired', variant: 'default' },
                    limit_reached: { label: 'Limit Reached', variant: 'warning' },
                };
                const config = statusConfig[item.status] || { label: item.status, variant: 'default' };
                return <Badge variant={config.variant}>{config.label}</Badge>;
            }
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
                        onClick={() => navigate(ROUTES.DISCOUNT_EDIT.replace(':id', item.id))}
                        title="Edit Discount"
                    >
                        <HiOutlinePencilSquare />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteClick(item)}
                        title="Delete Discount"
                    >
                        <HiOutlineTrash />
                    </Button>
                </div>
            )
        }
    ], [navigate]);

    // ── Handlers ────────────────────────────────────────────────────────────

    const handleDeleteClick = (discount) => {
        openModal({
            title: 'Delete Discount',
            content: `Are you sure you want to delete the discount "${discount.name}"? This action cannot be undone.`,
            confirmLabel: 'Delete Discount',
            confirmVariant: 'danger',
            onConfirm: () => {
                setDiscounts(prev => prev.filter(d => d.id !== discount.id));
                addToast('success', 'Discount deleted successfully');
                closeModal();
            }
        });
    };

    // ── Filtering & Sorting ─────────────────────────────────────────────────

    const filteredData = useMemo(() => {
        return discounts.filter(discount => {
            const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || discount.type === filterType;
            const matchesStatus = filterStatus === 'all' || discount.status === filterStatus;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [discounts, searchTerm, filterType, filterStatus]);

    return (
        <div className={styles.pageContainer}>
            <PageHeader
                title="Discounts"
                description="Manage promotional rules and pricing adjustments."
                actions={
                    <Button variant="primary" onClick={() => navigate(ROUTES.DISCOUNT_CREATE)}>
                        <HiPlus /> Create Discount
                    </Button>
                }
            />

            <div className={styles.filtersSection}>
                <div className={styles.searchBox}>
                    <Input
                        icon={<HiMagnifyingGlass />}
                        placeholder="Search discounts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <select
                        className={styles.selectFilter}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>

                    <select
                        className={styles.selectFilter}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="expired">Expired</option>
                        <option value="limit_reached">Limit Reached</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <DataTable
                    data={filteredData}
                    columns={columns}
                    emptyMessage="No discounts found matching your criteria."
                />
            </div>
        </div>
    );
};

export default DiscountsPage;
