/* ==========================================================================
   TEMPLATE TABLE TOOLBAR
   Search, filter by plan, and create template CTA.
   ========================================================================== */

import { memo } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from 'react-icons/hi2';
import './TemplateTableToolbar.css';

const TemplateTableToolbar = ({
    searchQuery,
    onSearchChange,
    filterPlan,
    onFilterChange,
    availablePlans,
    onCreateClick,
}) => {
    return (
        <div className="template-toolbar" id="template-toolbar">
            <div className="template-toolbar__filters">
                {/* Search */}
                <div className="template-toolbar__search-wrap">
                    <HiOutlineMagnifyingGlass className="template-toolbar__search-icon" />
                    <input
                        type="text"
                        className="template-toolbar__search"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        id="template-search-input"
                    />
                </div>

                {/* Plan Filter */}
                <select
                    className="template-toolbar__plan-filter"
                    value={filterPlan}
                    onChange={(e) => onFilterChange(e.target.value)}
                    id="template-plan-filter"
                >
                    <option value="all">All Plans</option>
                    {availablePlans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Create CTA */}
            <button
                className="template-toolbar__create-btn"
                onClick={onCreateClick}
                id="create-template-btn"
            >
                <HiOutlinePlus />
                Create Template
            </button>
        </div>
    );
};

export default memo(TemplateTableToolbar);
