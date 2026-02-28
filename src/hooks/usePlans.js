/* ==========================================================================
   usePlans HOOK
   Manages all plan state: CRUD operations, filtering, sorting,
   searching, and pagination.

   Architecture:
   - Uses mock data for now – swap to API calls when backend is ready.
   - All business logic (filter, sort, paginate) lives here.
   - Components only receive derived, display-ready data.
   - Memoized selectors prevent unnecessary re-renders.
   - Status is derived from endDate (not stored).
   ========================================================================== */

import { useState, useCallback, useMemo } from 'react';
import { plansMockData, generatePlanId, derivePlanStatus } from '../data/plansMockData';
import { PAGINATION } from '../utils/constants';

// Persist state across unmounts during development
let globalPlans = [...plansMockData];

const usePlans = () => {
    // ── Core State ────────────────────────────────────────────────────────
    const [plans, setPlansState] = useState(globalPlans);

    // Provide a wrapper to update both local state and the global variable
    const setPlans = useCallback((updater) => {
        setPlansState((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            globalPlans = next;
            return next;
        });
    }, []);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_LIMIT);

    // ── Enrich plans with derived status ──────────────────────────────────
    const enrichedPlans = useMemo(() =>
        plans.map((plan) => ({
            ...plan,
            status: derivePlanStatus(plan.endDate),
        })),
        [plans]
    );

    // ── Filtering ─────────────────────────────────────────────────────────
    const filteredPlans = useMemo(() => {
        let result = [...enrichedPlans];

        // Search filter (name)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.name.toLowerCase().includes(query)
            );
        }

        // Billing period filter
        if (filterPeriod !== 'all') {
            result = result.filter((p) => p.billingPeriod === filterPeriod);
        }

        // Status filter
        if (filterStatus !== 'all') {
            result = result.filter((p) => p.status === filterStatus);
        }

        return result;
    }, [enrichedPlans, searchQuery, filterPeriod, filterStatus]);

    // ── Sorting ───────────────────────────────────────────────────────────
    const sortedPlans = useMemo(() => {
        const sorted = [...filteredPlans];
        sorted.sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            // Handle date strings
            if (sortField === 'createdAt' || sortField === 'startDate' || sortField === 'endDate') {
                valA = valA ? new Date(valA).getTime() : 0;
                valB = valB ? new Date(valB).getTime() : 0;
            }

            // Handle strings
            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = (valB || '').toLowerCase();
            }

            if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredPlans, sortField, sortDirection]);

    // ── Pagination ────────────────────────────────────────────────────────
    const totalItems = sortedPlans.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedPlans = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedPlans.slice(start, start + pageSize);
    }, [sortedPlans, currentPage, pageSize]);

    // Reset to page 1 when filters/search change
    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handlePeriodFilterChange = useCallback((period) => {
        setFilterPeriod(period);
        setCurrentPage(1);
    }, []);

    const handleStatusFilterChange = useCallback((status) => {
        setFilterStatus(status);
        setCurrentPage(1);
    }, []);

    const handleSort = useCallback((field) => {
        setSortDirection((prev) =>
            sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'
        );
        setSortField(field);
        setCurrentPage(1);
    }, [sortField]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handlePageSizeChange = useCallback((size) => {
        setPageSize(Number(size));
        setCurrentPage(1);
    }, []);

    // ── CRUD Operations ───────────────────────────────────────────────────

    const createPlan = useCallback((planData) => {
        const newPlan = {
            ...planData,
            id: generatePlanId(),
            createdAt: new Date().toISOString(),
        };
        setPlans((prev) => [newPlan, ...prev]);
        return newPlan;
    }, []);

    const updatePlan = useCallback((id, planData) => {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, ...planData }
                    : p
            )
        );
    }, []);

    const deletePlan = useCallback((id) => {
        setPlans((prev) => prev.filter((p) => p.id !== id));
        // If deleting would leave current page empty, go back
        const remainingAfterDelete = plans.length - 1;
        const maxPageAfterDelete = Math.max(1, Math.ceil(remainingAfterDelete / pageSize));
        if (currentPage > maxPageAfterDelete) {
            setCurrentPage(maxPageAfterDelete);
        }
    }, [plans.length, pageSize, currentPage]);

    const getPlanById = useCallback((id) => {
        return plans.find((p) => p.id === id) || null;
    }, [plans]);

    // ── Return ────────────────────────────────────────────────────────────

    return {
        // Data
        plans: paginatedPlans,
        allPlans: enrichedPlans,
        totalItems,
        totalPages,
        currentPage,
        pageSize,

        // Filters & Sort
        searchQuery,
        filterPeriod,
        filterStatus,
        sortField,
        sortDirection,

        // Handlers
        handleSearchChange,
        handlePeriodFilterChange,
        handleStatusFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,

        // CRUD
        createPlan,
        updatePlan,
        deletePlan,
        getPlanById,
    };
};

export default usePlans;
