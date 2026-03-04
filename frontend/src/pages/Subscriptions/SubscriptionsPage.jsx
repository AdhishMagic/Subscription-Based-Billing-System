/* ==========================================================================
   SUBSCRIPTIONS PAGE
   Main subscription management page orchestrating all sub-components.

   Layout:
   ┌──────────────────────────────────────────────────────┐
   │ Page Header: "Subscriptions" + Subtitle + Badge      │
   ├──────────────────────────────────────────────────────┤
   │ Toolbar: Status Tabs | Search | Create Button        │
   ├──────────────────────────────────────────────────────┤
   │ Subscription Table (sortable, clickable rows)        │
   │                                                      │
   │ ... rows ...                                         │
   │                                                      │
   ├──────────────────────────────────────────────────────┤
   │ Pagination: Info | Page Size | Page Buttons          │
   └──────────────────────────────────────────────────────┘
   ========================================================================== */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubscriptions from '../../hooks/useSubscriptions';
import SubscriptionTableToolbar from './components/SubscriptionTableToolbar';
import SubscriptionTable from './components/SubscriptionTable';
import SubscriptionEmptyState from './components/SubscriptionEmptyState';
import ProductPagination from '../Products/components/ProductPagination';
import './SubscriptionsPage.css';

const SubscriptionsPage = () => {
    const navigate = useNavigate();

    const {
        subscriptions,
        allSubscriptions,
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        searchQuery,
        filterStatus,
        sortField,
        sortDirection,
        statusCounts,
        handleSearchChange,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,
    } = useSubscriptions();

    const handleCreateClick = useCallback(() => {
        navigate('/subscriptions/new');
    }, [navigate]);

    const isEmpty = allSubscriptions.length === 0;

    return (
        <div className="subscriptions-page" id="subscriptions-page">
            {/* ── Page Header ────────────────────────────────────────── */}
            <header className="subscriptions-page__header">
                <div>
                    <h1 className="subscriptions-page__heading">Subscriptions</h1>
                    <p className="subscriptions-page__subheading">
                        Manage subscription lifecycles, billing, and customer contracts
                    </p>
                </div>
                <div className="subscriptions-page__header-meta">
                    <span className="subscriptions-page__total-badge">
                        {allSubscriptions.length} subscription{allSubscriptions.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </header>

            {isEmpty ? (
                <SubscriptionEmptyState onCreateClick={handleCreateClick} />
            ) : (
                <div className="subscriptions-page__card">
                    <SubscriptionTableToolbar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        filterStatus={filterStatus}
                        onFilterChange={handleFilterChange}
                        statusCounts={statusCounts}
                        onCreateClick={handleCreateClick}
                    />

                    {subscriptions.length === 0 ? (
                        <div className="subscriptions-page__no-results">
                            <p className="subscriptions-page__no-results-text">
                                No subscriptions match your search or filter criteria.
                            </p>
                            <button
                                className="btn btn--ghost btn--sm"
                                onClick={() => {
                                    handleSearchChange('');
                                    handleFilterChange('all');
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <SubscriptionTable
                                subscriptions={subscriptions}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={handleSort}
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
        </div>
    );
};

export default SubscriptionsPage;
