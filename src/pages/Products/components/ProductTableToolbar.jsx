/* ==========================================================================
   PRODUCT TABLE TOOLBAR
   Search, filter, and sort controls for the product table.
   Sits above the data table in a card-style container.
   ========================================================================== */

import { memo } from 'react';
import {
    HiMagnifyingGlass,
    HiOutlineFunnel,
    HiOutlinePlus,
} from 'react-icons/hi2';
import { PRODUCT_TYPES } from '../../../data/productsMockData';
import './ProductTableToolbar.css';

const ProductTableToolbar = ({
    searchQuery,
    onSearchChange,
    filterType,
    onFilterChange,
    onCreateClick,
}) => {
    return (
        <div className="product-toolbar" id="product-toolbar">
            {/* ── Search ────────────────────────────────── */}
            <div className="product-toolbar__search">
                <HiMagnifyingGlass className="product-toolbar__search-icon" />
                <input
                    type="text"
                    className="product-toolbar__search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search products"
                    id="product-search-input"
                />
            </div>

            {/* ── Filter by Type ────────────────────────── */}
            <div className="product-toolbar__filter">
                <HiOutlineFunnel className="product-toolbar__filter-icon" />
                <select
                    className="product-toolbar__select"
                    value={filterType}
                    onChange={(e) => onFilterChange(e.target.value)}
                    aria-label="Filter by product type"
                    id="product-type-filter"
                >
                    <option value="all">All Types</option>
                    {PRODUCT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* ── Create Button ─────────────────────────── */}
            <button
                className="btn btn--secondary btn--md product-toolbar__create-btn"
                onClick={onCreateClick}
                id="create-product-btn"
            >
                <HiOutlinePlus size={18} />
                Create Product
            </button>
        </div>
    );
};

export default memo(ProductTableToolbar);
