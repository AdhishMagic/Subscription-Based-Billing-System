/* ==========================================================================
   PAGINATION COMPONENT
   Reusable pagination UI with page numbers, prev/next, and page size select.
   Designed for enterprise-level data tables.
   ========================================================================== */

import { memo, useMemo } from 'react';
import {
    HiChevronLeft,
    HiChevronRight,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from 'react-icons/hi2';
import { PAGINATION } from '../../../utils/constants';
import './ProductPagination.css';

const ProductPagination = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
}) => {
    // Generate visible page numbers with ellipsis
    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                start = 2;
                end = maxVisible;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - maxVisible + 1;
                end = totalPages - 1;
            }

            if (start > 2) pages.push('ellipsis-start');
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push('ellipsis-end');
            pages.push(totalPages);
        }
        return pages;
    }, [currentPage, totalPages]);

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    if (totalItems === 0) return null;

    return (
        <div className="product-pagination" id="product-pagination">
            {/* ── Info ─────────────────────────────────── */}
            <div className="product-pagination__info">
                <span className="product-pagination__range">
                    Showing <strong>{startItem}</strong> – <strong>{endItem}</strong> of{' '}
                    <strong>{totalItems}</strong>
                </span>
            </div>

            {/* ── Page Size ────────────────────────────── */}
            <div className="product-pagination__size">
                <label className="product-pagination__size-label" htmlFor="page-size-select">
                    Rows:
                </label>
                <select
                    id="page-size-select"
                    className="product-pagination__size-select"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(e.target.value)}
                >
                    {PAGINATION.PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

            {/* ── Page Buttons ─────────────────────────── */}
            <nav className="product-pagination__nav" aria-label="Pagination">
                <button
                    className="product-pagination__btn"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    aria-label="First page"
                >
                    <HiChevronDoubleLeft size={14} />
                </button>
                <button
                    className="product-pagination__btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                >
                    <HiChevronLeft size={14} />
                </button>

                {pageNumbers.map((page, idx) =>
                    typeof page === 'string' ? (
                        <span key={page} className="product-pagination__ellipsis">…</span>
                    ) : (
                        <button
                            key={page}
                            className={`product-pagination__btn product-pagination__btn--page ${page === currentPage ? 'product-pagination__btn--active' : ''
                                }`}
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="product-pagination__btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                >
                    <HiChevronRight size={14} />
                </button>
                <button
                    className="product-pagination__btn"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Last page"
                >
                    <HiChevronDoubleRight size={14} />
                </button>
            </nav>
        </div>
    );
};

export default memo(ProductPagination);
