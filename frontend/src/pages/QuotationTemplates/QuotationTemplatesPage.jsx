/* ==========================================================================
   QUOTATION TEMPLATES PAGE
   Main template management page orchestrating all sub-components.

   Layout:
   ┌──────────────────────────────────────────────────────┐
   │ Page Header: "Quotation Templates" + Subtitle + Badge│
   ├──────────────────────────────────────────────────────┤
   │ Toolbar: Search | Plan Filter | Create Button        │
   ├──────────────────────────────────────────────────────┤
   │ Template Table (sortable, action buttons)            │
   │  Cols: Name | Plan | Validity | Products | Created   │
   ├──────────────────────────────────────────────────────┤
   │ Pagination: Info | Page Size | Page Buttons          │
   └──────────────────────────────────────────────────────┘
   ========================================================================== */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuotationTemplates from '../../hooks/useQuotationTemplates';
import useToast from '../../hooks/useToast';
import TemplateTableToolbar from './components/TemplateTableToolbar';
import TemplateTable from './components/TemplateTable';
import TemplateEmptyState from './components/TemplateEmptyState';
import DeleteTemplateModal from './components/DeleteTemplateModal';
import ProductPagination from '../Products/components/ProductPagination';
import './QuotationTemplatesPage.css';

const QuotationTemplatesPage = () => {
    const navigate = useNavigate();
    const { success } = useToast();

    const {
        templates,
        allTemplates,
        totalItems,
        totalPages,
        currentPage,
        pageSize,
        availablePlans,
        searchQuery,
        filterPlan,
        sortField,
        sortDirection,
        handleSearchChange,
        handleFilterChange,
        handleSort,
        handlePageChange,
        handlePageSizeChange,
        deleteTemplate,
    } = useQuotationTemplates();

    // ── Delete Modal State ──────────────────────────────────────────────────
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleCreateClick = useCallback(() => {
        navigate('/quotation-templates/new');
    }, [navigate]);

    const handleEditClick = useCallback(
        (template) => {
            navigate(`/quotation-templates/${template.id}/edit`);
        },
        [navigate]
    );

    const handleDeleteClick = useCallback((template) => {
        setDeleteTarget(template);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (deleteTarget) {
            deleteTemplate(deleteTarget.id);
            success(`Template "${deleteTarget.name}" deleted successfully.`);
            setDeleteTarget(null);
        }
    }, [deleteTarget, deleteTemplate, success]);

    const handleDeleteCancel = useCallback(() => {
        setDeleteTarget(null);
    }, []);

    const handlePreviewClick = useCallback(
        (template) => {
            navigate(`/quotation-templates/${template.id}`);
        },
        [navigate]
    );

    const isEmpty = allTemplates.length === 0;

    return (
        <div className="templates-page" id="templates-page">
            {/* ── Page Header ────────────────────────────────────────── */}
            <header className="templates-page__header">
                <div>
                    <h1 className="templates-page__heading">Quotation Templates</h1>
                    <p className="templates-page__subheading">
                        Predefined subscription blueprints for standardized billing setups
                    </p>
                </div>
                <div className="templates-page__header-meta">
                    <span className="templates-page__total-badge">
                        {allTemplates.length} template{allTemplates.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </header>

            {isEmpty ? (
                <TemplateEmptyState onCreateClick={handleCreateClick} />
            ) : (
                <div className="templates-page__card">
                    <TemplateTableToolbar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        filterPlan={filterPlan}
                        onFilterChange={handleFilterChange}
                        availablePlans={availablePlans}
                        onCreateClick={handleCreateClick}
                    />

                    {templates.length === 0 ? (
                        <div className="templates-page__no-results">
                            <p className="templates-page__no-results-text">
                                No templates match your search or filter criteria.
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
                            <TemplateTable
                                templates={templates}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                                onPreview={handlePreviewClick}
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

            {/* ── Delete Confirmation Modal ──────────────────────────── */}
            {deleteTarget && (
                <DeleteTemplateModal
                    template={deleteTarget}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}
        </div>
    );
};

export default QuotationTemplatesPage;
