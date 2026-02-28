/* ==========================================================================
   PRODUCTS PAGE
   Main product management page orchestrating all sub-components.

   Layout:
   ┌──────────────────────────────────────────────────────┐
   │ Page Header: "Products" + Subtitle + Live Indicator  │
   ├──────────────────────────────────────────────────────┤
   │ Toolbar: Search | Filter | Create Button             │
   ├──────────────────────────────────────────────────────┤
   │ Product Table (sortable, with action buttons)        │
   │                                                      │
   │ ... rows ...                                         │
   │                                                      │
   ├──────────────────────────────────────────────────────┤
   │ Pagination: Info | Page Size | Page Buttons          │
   └──────────────────────────────────────────────────────┘

   OR: Empty State (when no products exist)

   State Management:
   - useProducts hook handles ALL product logic.
   - This page only manages modal open/close state.
   - Components communicate via callbacks (lifted state).
   ========================================================================== */

import { useState, useCallback } from 'react';
import useProducts from '../../hooks/useProducts';
import useToast from '../../hooks/useToast';
import ProductTableToolbar from './components/ProductTableToolbar';
import ProductTable from './components/ProductTable';
import ProductPagination from './components/ProductPagination';
import ProductModal from './components/ProductModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import ProductEmptyState from './components/ProductEmptyState';
import './ProductsPage.css';

const ProductsPage = () => {
    const {
        products,
        allProducts,
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        searchQuery,
        filterType,
        sortField,
        sortDirection,
        handleSearchChange,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,
        createProduct,
        updateProduct,
        deleteProduct,
    } = useProducts();

    const { success } = useToast();

    // ── Modal State ──────────────────────────────────────────────────────
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);

    // ── Handlers ─────────────────────────────────────────────────────────

    const handleCreateClick = useCallback(() => {
        setEditingProduct(null);
        setIsProductModalOpen(true);
    }, []);

    const handleEditClick = useCallback((product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    }, []);

    const handleDeleteClick = useCallback((product) => {
        setDeletingProduct(product);
        setIsDeleteModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsProductModalOpen(false);
        setEditingProduct(null);
    }, []);

    const handleSaveProduct = useCallback(
        (formData) => {
            if (editingProduct) {
                updateProduct(editingProduct.id, formData);
                success(`"${formData.name}" updated successfully.`);
            } else {
                createProduct(formData);
                success(`"${formData.name}" created successfully.`);
            }
            setIsProductModalOpen(false);
            setEditingProduct(null);
        },
        [editingProduct, updateProduct, createProduct, success]
    );

    const handleDeleteConfirm = useCallback(() => {
        if (deletingProduct) {
            deleteProduct(deletingProduct.id);
            success(`"${deletingProduct.name}" has been deleted.`);
        }
        setIsDeleteModalOpen(false);
        setDeletingProduct(null);
    }, [deletingProduct, deleteProduct, success]);

    const handleDeleteCancel = useCallback(() => {
        setIsDeleteModalOpen(false);
        setDeletingProduct(null);
    }, []);

    // ── Is empty (no products at all, not just filtered empty) ────────
    const isEmpty = allProducts.length === 0;

    return (
        <div className="products-page" id="products-page">
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <header className="products-page__header">
                <div>
                    <h1 className="products-page__heading">Products</h1>
                    <p className="products-page__subheading">
                        Manage your product catalog and pricing configurations
                    </p>
                </div>
                <div className="products-page__header-meta">
                    <span className="products-page__total-badge">
                        {allProducts.length} product{allProducts.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </header>

            {isEmpty ? (
                /* ── Empty State ─────────────────────────── */
                <ProductEmptyState onCreateClick={handleCreateClick} />
            ) : (
                /* ── Product List Card ───────────────────── */
                <div className="products-page__card">
                    <ProductTableToolbar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        filterType={filterType}
                        onFilterChange={handleFilterChange}
                        onCreateClick={handleCreateClick}
                    />

                    {products.length === 0 ? (
                        <div className="products-page__no-results">
                            <p className="products-page__no-results-text">
                                No products match your search or filter criteria.
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
                            <ProductTable
                                products={products}
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

            {/* ── Modals ───────────────────────────────────────────────────── */}
            <ProductModal
                isOpen={isProductModalOpen}
                product={editingProduct}
                onSave={handleSaveProduct}
                onClose={handleModalClose}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                productName={deletingProduct?.name || ''}
                onConfirm={handleDeleteConfirm}
                onClose={handleDeleteCancel}
            />
        </div>
    );
};

export default ProductsPage;
