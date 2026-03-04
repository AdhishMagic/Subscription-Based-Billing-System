/* ==========================================================================
   useQuotationTemplates HOOK
   Manages all template state: CRUD, filtering, sorting, searching,
   pagination, and preview toggling.

   Architecture:
   - Uses mock data — swap to API calls when backend is ready.
   - All business logic (filter, sort, paginate) lives here.
   - Components only receive derived, display-ready data.
   - Memoized selectors prevent unnecessary re-renders.
   ========================================================================== */

import { useState, useCallback, useMemo } from 'react';
import {
    templatesMockData,
    generateTemplateId,
    calcTemplateTotals,
} from '../data/templatesMockData';
import { PAGINATION } from '../utils/constants';

const useQuotationTemplates = () => {
    // ── Core State ────────────────────────────────────────────────────────
    const [templates, setTemplates] = useState(templatesMockData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPlan, setFilterPlan] = useState('all');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_LIMIT);

    // ── Unique Plans for Filter Dropdown ───────────────────────────────────
    const availablePlans = useMemo(() => {
        const planMap = new Map();
        templates.forEach((t) => {
            if (!planMap.has(t.recurringPlanId)) {
                planMap.set(t.recurringPlanId, t.recurringPlanName);
            }
        });
        return Array.from(planMap, ([id, name]) => ({ id, name }));
    }, [templates]);

    // ── Filtering ─────────────────────────────────────────────────────────
    const filteredTemplates = useMemo(() => {
        let result = [...templates];

        // Search filter (template name)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((t) =>
                t.name.toLowerCase().includes(query)
            );
        }

        // Plan filter
        if (filterPlan !== 'all') {
            result = result.filter((t) => t.recurringPlanId === filterPlan);
        }

        return result;
    }, [templates, searchQuery, filterPlan]);

    // ── Sorting ───────────────────────────────────────────────────────────
    const sortedTemplates = useMemo(() => {
        const sorted = [...filteredTemplates];
        sorted.sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            // Handle dates
            if (sortField === 'createdAt') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }

            // Handle derived field: productsCount
            if (sortField === 'productsCount') {
                valA = a.productLines.length;
                valB = b.productLines.length;
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
    }, [filteredTemplates, sortField, sortDirection]);

    // ── Pagination ────────────────────────────────────────────────────────
    const totalItems = sortedTemplates.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedTemplates = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedTemplates.slice(start, start + pageSize);
    }, [sortedTemplates, currentPage, pageSize]);

    // ── Handlers ──────────────────────────────────────────────────────────

    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleFilterChange = useCallback((planId) => {
        setFilterPlan(planId);
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

    const createTemplate = useCallback((formData) => {
        const newTemplate = {
            ...formData,
            id: generateTemplateId(),
            createdAt: new Date().toISOString(),
        };
        setTemplates((prev) => [newTemplate, ...prev]);
        return newTemplate;
    }, []);

    const updateTemplate = useCallback((id, data) => {
        setTemplates((prev) =>
            prev.map((t) => (t.id === id ? { ...t, ...data } : t))
        );
    }, []);

    const deleteTemplate = useCallback(
        (id) => {
            setTemplates((prev) => prev.filter((t) => t.id !== id));
            const remainingAfterDelete = templates.length - 1;
            const maxPageAfterDelete = Math.max(1, Math.ceil(remainingAfterDelete / pageSize));
            if (currentPage > maxPageAfterDelete) {
                setCurrentPage(maxPageAfterDelete);
            }
        },
        [templates.length, pageSize, currentPage]
    );

    const getTemplateById = useCallback(
        (id) => templates.find((t) => t.id === id) || null,
        [templates]
    );

    // ── Return ────────────────────────────────────────────────────────────

    return {
        // Data
        templates: paginatedTemplates,
        allTemplates: templates,
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        availablePlans,

        // Filters & Sort
        searchQuery,
        filterPlan,
        sortField,
        sortDirection,

        // Handlers
        handleSearchChange,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,

        // CRUD
        createTemplate,
        updateTemplate,
        deleteTemplate,
        getTemplateById,
    };
};

export default useQuotationTemplates;
