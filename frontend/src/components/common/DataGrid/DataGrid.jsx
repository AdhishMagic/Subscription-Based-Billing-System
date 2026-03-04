import React from 'react';
import { useDataGrid, GridProvider } from './GridContext';
import './DataGrid.css';

// Child Components
const GridHeader = () => {
    const { columns, sortConfig, requestSort, enableSelection, isAllSelected, isIndeterminate, selectAll, clearSelection } = useDataGrid();

    return (
        <thead>
            <tr>
                {enableSelection && (
                    <th className="grid-cell selection-cell" style={{ width: '48px' }}>
                        <input
                            type="checkbox"
                            className="premium-checkbox"
                            checked={isAllSelected}
                            ref={(input) => {
                                if (input) input.indeterminate = isIndeterminate;
                            }}
                            onChange={(e) => {
                                if (e.target.checked) selectAll();
                                else clearSelection();
                            }}
                            aria-label="Select all rows"
                        />
                    </th>
                )}
                {columns.map((col) => (
                    <th
                        key={col.key}
                        className={`grid-cell header-cell ${col.sortable ? 'sortable' : ''} align-${col.align || 'left'}`}
                        style={{ width: col.width || 'auto' }}
                        onClick={() => col.sortable && requestSort(col.key)}
                        aria-sort={
                            sortConfig.key === col.key
                                ? sortConfig.direction === 'asc'
                                    ? 'ascending'
                                    : 'descending'
                                : 'none'
                        }
                    >
                        <div className="header-content">
                            <span>{col.label}</span>
                            {col.sortable && sortConfig.key === col.key && (
                                <span className={`sort-icon ${sortConfig.direction}`}>▲</span>
                            )}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

// Memoized Row for performance
const GridRow = React.memo(({ row, columns, enableSelection, isSelected, onToggleSelection }) => {
    return (
        <tr className={isSelected ? 'selected-row' : ''}>
            {enableSelection && (
                <td className="grid-cell selection-cell">
                    <input
                        type="checkbox"
                        className="premium-checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelection(row.id)}
                        aria-label={`Select row ${row.id}`}
                    />
                </td>
            )}
            {columns.map((col) => (
                <td
                    key={col.key}
                    className={`grid-cell align-${col.align || 'left'}`}
                >
                    {col.render ? col.render(row) : row[col.key]}
                </td>
            ))}
        </tr>
    );
}, (prevProps, nextProps) => {
    // Deep compare row data & selection state to prevent unnecessary renders
    return (
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.row === nextProps.row
    );
});

const GridBody = () => {
    const { paginatedData, columns, enableSelection, selectedIds, toggleSelection } = useDataGrid();

    if (paginatedData.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={columns.length + (enableSelection ? 1 : 0)} className="empty-state-cell">
                        <div className="empty-state-content">
                            <span className="empty-icon">📊</span>
                            <h4>No data found</h4>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {paginatedData.map((row) => (
                // Always map by row.id for stable keys
                <GridRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    enableSelection={enableSelection}
                    isSelected={selectedIds.has(row.id)}
                    onToggleSelection={toggleSelection}
                />
            ))}
        </tbody>
    );
};

// Toolbar wrapper
const GridToolbar = ({ children, bulkActions }) => {
    const { globalSearch, setGlobalSearch, selectedIds } = useDataGrid();

    return (
        <div className="grid-toolbar">
            <div className="toolbar-left">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                />
                {/* Module specific filters injected here */}
                {children}
            </div>

            <div className="toolbar-right">
                {selectedIds.size > 0 && bulkActions && (
                    <div className="bulk-actions-pill slide-in-bottom">
                        <span className="selection-count">{selectedIds.size} selected</span>
                        <div className="bulk-action-buttons">
                            {bulkActions.map((action, idx) => (
                                <button
                                    key={idx}
                                    className={`btn-action btn-${action.variant || 'default'}`}
                                    onClick={() => action.onClick(Array.from(selectedIds))}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Pagination Controls
const GridPagination = () => {
    const { currentPage, setCurrentPage, pageSize, setPageSize, totalPages, totalRecords } = useDataGrid();

    return (
        <div className="grid-pagination">
            <div className="pagination-info">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} records
            </div>

            <div className="pagination-controls">
                <select
                    className="page-size-selector"
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={15}>15 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                </select>

                <div className="page-buttons">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Prev
                    </button>
                    <span className="current-page">Page {currentPage} of {totalPages || 1}</span>
                    <button
                        disabled={currentPage >= totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main DataGrid Export Component
// Notice: We define Provider wrapping inside the default export component
const DataGridComponent = ({ children }) => {
    return (
        <div className="data-grid-container">
            {children}
            <div className="table-wrapper">
                <table className="advanced-data-table">
                    <GridHeader />
                    <GridBody />
                </table>
            </div>
        </div>
    );
};

export const DataGrid = ({
    data,
    columns,
    enableSelection,
    onSelectionChange,
    bulkActions,
    children /* allows toolbar injections */
}) => {
    return (
        <GridProvider
            data={data}
            columns={columns}
            enableSelection={enableSelection}
            onSelectionChange={onSelectionChange}
        >
            <DataGridComponent>
                {/* Auto include standard toolbar if actions/search exist */}
                <GridToolbar bulkActions={bulkActions}>
                    {children}
                </GridToolbar>
            </DataGridComponent>
            <GridPagination />
        </GridProvider>
    );
};
