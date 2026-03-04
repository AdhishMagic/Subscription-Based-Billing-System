/* ==========================================================================
   useProducts HOOK
   Manages all product state: CRUD operations, filtering, sorting,
   searching, and pagination.

   Architecture:
   - Uses mock data for now – swap to API calls when backend is ready.
   - All business logic (filter, sort, paginate) lives here.
   - Components only receive derived, display-ready data.
   - Memoized selectors prevent unnecessary re-renders.
   ========================================================================== */

import { useState, useCallback, useMemo } from 'react';
import { productsMockData, generateId } from '../data/productsMockData';
import { PAGINATION } from '../utils/constants';

const useProducts = () => {
    // ── Core State ────────────────────────────────────────────────────────
    const [products, setProducts] = useState(productsMockData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_LIMIT);

    // ── Filtering ─────────────────────────────────────────────────────────
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter (name)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.name.toLowerCase().includes(query) ||
                p.type.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (filterType !== 'all') {
            result = result.filter((p) => p.type === filterType);
        }

        return result;
    }, [products, searchQuery, filterType]);

    // ── Sorting ───────────────────────────────────────────────────────────
    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        sorted.sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            // Handle date strings
            if (sortField === 'createdAt') {
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
    }, [filteredProducts, sortField, sortDirection]);

    // ── Pagination ────────────────────────────────────────────────────────
    const totalItems = sortedProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedProducts.slice(start, start + pageSize);
    }, [sortedProducts, currentPage, pageSize]);

    // Reset to page 1 when filters/search change
    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleFilterChange = useCallback((type) => {
        setFilterType(type);
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

    const createProduct = useCallback((productData) => {
        const newProduct = {
            ...productData,
            id: generateId(),
            createdAt: new Date().toISOString(),
            variants: (productData.variants || []).map((v) => ({
                ...v,
                id: v.id || generateId(),
            })),
        };
        setProducts((prev) => [newProduct, ...prev]);
        return newProduct;
    }, []);

    const updateProduct = useCallback((id, productData) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        ...productData,
                        variants: (productData.variants || []).map((v) => ({
                            ...v,
                            id: v.id || generateId(),
                        })),
                    }
                    : p
            )
        );
    }, []);

    const deleteProduct = useCallback((id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        // If deleting would leave current page empty, go back
        const remainingAfterDelete = products.length - 1;
        const maxPageAfterDelete = Math.max(1, Math.ceil(remainingAfterDelete / pageSize));
        if (currentPage > maxPageAfterDelete) {
            setCurrentPage(maxPageAfterDelete);
        }
    }, [products.length, pageSize, currentPage]);

    const getProductById = useCallback((id) => {
        return products.find((p) => p.id === id) || null;
    }, [products]);

    // ── Return ────────────────────────────────────────────────────────────

    return {
        // Data
        products: paginatedProducts,
        allProducts: products,
        totalItems,
        totalPages,
        currentPage,
        pageSize,

        // Filters & Sort
        searchQuery,
        filterType,
        sortField,
        sortDirection,

        // Handlers
        handleSearchChange,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,

        // CRUD
        createProduct,
        updateProduct,
        deleteProduct,
        getProductById,
    };
};

export default useProducts;
