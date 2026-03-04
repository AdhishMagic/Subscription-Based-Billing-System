import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const GridContext = createContext();

export const GridProvider = ({
    children,
    data = [],
    columns = [],
    initialSort = { key: null, direction: 'asc' },
    initialFilters = {},
    enableSelection = false,
    onSelectionChange,
}) => {
    // Sorting State
    const [sortConfig, setSortConfig] = useState(initialSort);

    // Filtering State
    const [filters, setFilters] = useState(initialFilters);
    const [globalSearch, setGlobalSearch] = useState('');

    // Pagination State (Client-Side)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    // Selection State
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Handle Selection
    const toggleSelection = useCallback((id) => {
        setSelectedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            if (onSelectionChange) onSelectionChange(Array.from(newSet));
            return newSet;
        });
    }, [onSelectionChange]);

    const selectAll = useCallback(() => {
        setSelectedIds(new Set(data.map(item => item.id)));
        if (onSelectionChange) onSelectionChange(data.map(item => item.id));
    }, [data, onSelectionChange]);

    const clearSelection = useCallback(() => {
        setSelectedIds(new Set());
        if (onSelectionChange) onSelectionChange([]);
    }, [onSelectionChange]);

    // Handle Sort
    const requestSort = useCallback((key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    // Filter and Sort Data
    const processedData = useMemo(() => {
        let result = [...data];

        // Global Search
        if (globalSearch) {
            const lowerSearch = globalSearch.toLowerCase();
            result = result.filter((item) =>
                columns.some((col) => {
                    const val = item[col.key];
                    return val !== null && val !== undefined && String(val).toLowerCase().includes(lowerSearch);
                })
            );
        }

        // Column Filters (Simple equality for now, can be expanded)
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                result = result.filter(item => item[key] === value);
            }
        });

        // Sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];

                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, columns, sortConfig, filters, globalSearch]);

    // Pagination Slice
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return processedData.slice(startIndex, startIndex + pageSize);
    }, [processedData, currentPage, pageSize]);

    const value = {
        // Derived Data
        paginatedData,
        totalRecords: processedData.length,

        // Columns & Raw Data
        columns,
        data,

        // Sort API
        sortConfig,
        requestSort,

        // Filter API
        filters,
        setFilters,
        globalSearch,
        setGlobalSearch,

        // Selection API
        enableSelection,
        selectedIds,
        toggleSelection,
        selectAll,
        clearSelection,
        isAllSelected: selectedIds.size === data.length && data.length > 0,
        isIndeterminate: selectedIds.size > 0 && selectedIds.size < data.length,

        // Pagination API
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages: Math.ceil(processedData.length / pageSize)
    };

    return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

export const useDataGrid = () => {
    const context = useContext(GridContext);
    if (!context) {
        throw new Error('useDataGrid must be used within a GridProvider');
    }
    return context;
};
