/* ==========================================================================
   PLANS PAGE
   Main recurring plan management page orchestrating plan list sub-components.
   ========================================================================== */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import usePlans from '../../hooks/usePlans';
import useToast from '../../hooks/useToast';
import { ROUTES } from '../../routes/routeConfig';
import PlanTableToolbar from './components/PlanTableToolbar';
import PlanTable from './components/PlanTable';
import PlanEmptyState from './components/PlanEmptyState';
import DeletePlanModal from './components/DeletePlanModal';
import ProductPagination from '../Products/components/ProductPagination'; // Reusing pagination component
import './PlansPage.css';

const PlansPage = () => {
    const navigate = useNavigate();
    const { success } = useToast();

    // ── Data Hook ───────────────────────────────────────
    const {
        plans,
        allPlans,
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        searchQuery,
        filterPeriod,
        filterStatus,
        sortField,
        sortDirection,
        handleSearchChange,
        handlePeriodFilterChange,
        handleStatusFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,
        deletePlan,
    } = usePlans();

    // ── Local State ─────────────────────────────────────
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingPlan, setDeletingPlan] = useState(null);

    // ── Handlers ────────────────────────────────────────
    const handleCreateClick = useCallback(() => {
        navigate(ROUTES.PLAN_CREATE);
    }, [navigate]);

    const handleEditClick = useCallback((plan) => {
        navigate(ROUTES.PLAN_EDIT.replace(':id', plan.id));
    }, [navigate]);

    const handleDeleteClick = useCallback((plan) => {
        setDeletingPlan(plan);
        setIsDeleteModalOpen(true);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (deletingPlan) {
            deletePlan(deletingPlan.id);
            success(`Plan "${deletingPlan.name}" has been deleted.`);
        }
        setIsDeleteModalOpen(false);
        setDeletingPlan(null);
    }, [deletingPlan, deletePlan, success]);

    const handleDeleteCancel = useCallback(() => {
        setIsDeleteModalOpen(false);
        setDeletingPlan(null);
    }, []);

    // ── Derived State ───────────────────────────────────
    const isEmpty = allPlans.length === 0;

    return (
        <div className="plans-page" id="plans-page">
            {/* ── Page Header ─────────────────────────────────────── */}
            <header className="plans-page__header">
                <div>
                    <h1 className="plans-page__heading">Recurring Plans</h1>
                    <p className="plans-page__subheading">
                        Manage your subscription billing configurations and pricing rules
                    </p>
                </div>
                <div className="plans-page__header-meta">
                    <span className="plans-page__total-badge">
                        {allPlans.length} plan{allPlans.length !== 1 ? 's' : ''} active
                    </span>
                </div>
            </header>

            {isEmpty ? (
                /* ── Empty State ─────────────────────────────────── */
                <PlanEmptyState onCreateClick={handleCreateClick} />
            ) : (
                /* ── Content Card ────────────────────────────────── */
                <div className="plans-page__card">
                    <PlanTableToolbar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        filterPeriod={filterPeriod}
                        onPeriodChange={handlePeriodFilterChange}
                        filterStatus={filterStatus}
                        onStatusChange={handleStatusFilterChange}
                        onCreateClick={handleCreateClick}
                    />

                    {plans.length === 0 ? (
                        <div className="plans-page__no-results">
                            <p className="plans-page__no-results-text">
                                No plans match your search or filter criteria.
                            </p>
                            <button
                                className="btn btn--ghost btn--sm"
                                onClick={() => {
                                    handleSearchChange('');
                                    handlePeriodFilterChange('all');
                                    handleStatusFilterChange('all');
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <PlanTable
                                plans={plans}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />

                            <ProductPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={totalItems}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                            />
                        </>
                    )}
                </div>
            )}

            {/* ── Delete Modal ─────────────────────────────────────── */}
            <DeletePlanModal
                isOpen={isDeleteModalOpen}
                planName={deletingPlan?.name || ''}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </div>
    );
};

export default PlansPage;
