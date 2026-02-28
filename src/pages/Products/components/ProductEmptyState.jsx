/* ==========================================================================
   PRODUCT EMPTY STATE
   Elegant illustration placeholder with CTA when no products exist.
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineCube, HiOutlinePlus } from 'react-icons/hi2';
import './ProductEmptyState.css';

const ProductEmptyState = ({ onCreateClick }) => {
    return (
        <div className="product-empty" id="product-empty-state">
            <div className="product-empty__illustration">
                <div className="product-empty__icon-ring product-empty__icon-ring--outer">
                    <div className="product-empty__icon-ring product-empty__icon-ring--middle">
                        <div className="product-empty__icon-ring product-empty__icon-ring--inner">
                            <HiOutlineCube className="product-empty__icon" />
                        </div>
                    </div>
                </div>
                {/* Subtle floating particles */}
                <div className="product-empty__particle product-empty__particle--1" />
                <div className="product-empty__particle product-empty__particle--2" />
                <div className="product-empty__particle product-empty__particle--3" />
            </div>

            <h3 className="product-empty__title">No Products Yet</h3>
            <p className="product-empty__description">
                Create your first product to start managing your catalog.
                Products support recurring billing, variants, and attribute-based pricing.
            </p>

            <button
                className="btn btn--secondary btn--lg product-empty__cta"
                onClick={onCreateClick}
                id="empty-create-product-btn"
            >
                <HiOutlinePlus size={20} />
                Create Your First Product
            </button>
        </div>
    );
};

export default memo(ProductEmptyState);
