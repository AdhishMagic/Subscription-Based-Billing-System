/* ==========================================================================
   useSubscriptions HOOK
   Manages all subscription state: CRUD, filtering, sorting, searching,
   pagination, and lifecycle status transitions.

   Architecture:
   - Uses mock data — swap to API calls when backend is ready.
   - All business logic (filter, sort, paginate, transition) lives here.
   - Components only receive derived, display-ready data.
   - Memoized selectors prevent unnecessary re-renders.
   ========================================================================== */

import { useState, useCallback, useMemo } from 'react';
import {
    subscriptionsMockData,
    generateSubscriptionId,
    generateSubscriptionNumber,
    generateLineId,
    STATUS_FLOW,
} from '../data/subscriptionsMockData';
import { PAGINATION } from '../utils/constants';

const useSubscriptions = () => {
    // ── Core State ────────────────────────────────────────────────────────
    const [subscriptions, setSubscriptions] = useState(subscriptionsMockData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_LIMIT);

    // ── Filtering ─────────────────────────────────────────────────────────
    const filteredSubscriptions = useMemo(() => {
        let result = [...subscriptions];

        // Search filter (subscription number or customer name)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (s) =>
                    s.subscriptionNumber.toLowerCase().includes(query) ||
                    s.customerName.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (filterStatus !== 'all') {
            result = result.filter((s) => s.status === filterStatus);
        }

        return result;
    }, [subscriptions, searchQuery, filterStatus]);

    // ── Sorting ───────────────────────────────────────────────────────────
    const sortedSubscriptions = useMemo(() => {
        const sorted = [...filteredSubscriptions];
        sorted.sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            // Handle dates
            if (sortField === 'createdAt' || sortField === 'startDate' || sortField === 'expirationDate') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }

            // Handle strings
            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }

            if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredSubscriptions, sortField, sortDirection]);

    // ── Pagination ────────────────────────────────────────────────────────
    const totalItems = sortedSubscriptions.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedSubscriptions = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedSubscriptions.slice(start, start + pageSize);
    }, [sortedSubscriptions, currentPage, pageSize]);

    // ── Handlers ──────────────────────────────────────────────────────────

    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleFilterChange = useCallback((status) => {
        setFilterStatus(status);
        setCurrentPage(1);
    }, []);

    const handleSort = useCallback(
        (field) => {
            setSortDirection((prev) =>
                sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'
            );
            setSortField(field);
            setCurrentPage(1);
        },
        [sortField]
    );

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handlePageSizeChange = useCallback((size) => {
        setPageSize(Number(size));
        setCurrentPage(1);
    }, []);

    // ── CRUD Operations ───────────────────────────────────────────────────

    const createSubscription = useCallback((formData) => {
        const newSub = {
            ...formData,
            id: generateSubscriptionId(),
            subscriptionNumber: generateSubscriptionNumber(),
            status: 'draft',
            orderLines: (formData.orderLines || []).map((line) => ({
                ...line,
                id: line.id || generateLineId(),
            })),
            activity: [
                {
                    id: `act_${Date.now()}`,
                    action: 'Subscription created',
                    user: 'Admin',
                    timestamp: new Date().toISOString(),
                },
            ],
            createdAt: new Date().toISOString(),
        };
        setSubscriptions((prev) => [newSub, ...prev]);
        return newSub;
    }, []);

    const updateSubscription = useCallback((id, data) => {
        setSubscriptions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, ...data } : s))
        );
    }, []);

    const deleteSubscription = useCallback(
        (id) => {
            setSubscriptions((prev) => prev.filter((s) => s.id !== id));
            const remainingAfterDelete = subscriptions.length - 1;
            const maxPageAfterDelete = Math.max(1, Math.ceil(remainingAfterDelete / pageSize));
            if (currentPage > maxPageAfterDelete) {
                setCurrentPage(maxPageAfterDelete);
            }
        },
        [subscriptions.length, pageSize, currentPage]
    );

    const getSubscriptionById = useCallback(
        (id) => subscriptions.find((s) => s.id === id) || null,
        [subscriptions]
    );

    // ── Lifecycle Transitions ─────────────────────────────────────────────

    /**
     * Get the next valid status in the flow.
     * Draft → Quotation → Confirmed → Active → Closed
     */
    const getNextStatus = useCallback((currentStatus) => {
        const currentIndex = STATUS_FLOW.indexOf(currentStatus);
        if (currentIndex === -1 || currentIndex >= STATUS_FLOW.length - 1) return null;
        return STATUS_FLOW[currentIndex + 1];
    }, []);

    /**
     * Transition a subscription to its next lifecycle status.
     */
    const transitionStatus = useCallback(
        (id, targetStatus) => {
            setSubscriptions((prev) =>
                prev.map((s) => {
                    if (s.id !== id) return s;

                    const actionLabels = {
                        quotation: 'Converted to quotation',
                        confirmed: 'Quotation confirmed',
                        active: 'Subscription activated',
                        closed: 'Subscription closed',
                    };

                    return {
                        ...s,
                        status: targetStatus,
                        activity: [
                            ...s.activity,
                            {
                                id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
                                action: actionLabels[targetStatus] || `Status changed to ${targetStatus}`,
                                user: 'Admin',
                                timestamp: new Date().toISOString(),
                            },
                        ],
                    };
                })
            );
        },
        []
    );

    // ── Status Counts (for filter badges) ─────────────────────────────────

    const statusCounts = useMemo(() => {
        const counts = { all: subscriptions.length };
        STATUS_FLOW.forEach((status) => {
            counts[status] = subscriptions.filter((s) => s.status === status).length;
        });
        return counts;
    }, [subscriptions]);

    // ── Return ────────────────────────────────────────────────────────────

    return {
        // Data
        subscriptions: paginatedSubscriptions,
        allSubscriptions: subscriptions,
        totalItems,
        totalPages,
        currentPage,
        pageSize,

        // Filters & Sort
        searchQuery,
        filterStatus,
        sortField,
        sortDirection,
        statusCounts,

        // Handlers
        handleSearchChange,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,

        // CRUD
        createSubscription,
        updateSubscription,
        deleteSubscription,
        getSubscriptionById,

        // Lifecycle
        getNextStatus,
        transitionStatus,
    };
};

export default useSubscriptions;
