/* ==========================================================================
   TEMPLATE EMPTY STATE
   Shown when no templates exist in the system.
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineDocumentDuplicate, HiOutlinePlus } from 'react-icons/hi2';
import './TemplateEmptyState.css';

const TemplateEmptyState = ({ onCreateClick }) => (
    <div className="template-empty" id="template-empty-state">
        <HiOutlineDocumentDuplicate className="template-empty__icon" />
        <h2 className="template-empty__title">No Quotation Templates</h2>
        <p className="template-empty__description">
            Create your first template to standardize subscription setups, maintain
            pricing consistency, and speed up billing workflows.
        </p>
        <button className="template-empty__btn" onClick={onCreateClick}>
            <HiOutlinePlus />
            Create First Template
        </button>
    </div>
);

export default memo(TemplateEmptyState);
