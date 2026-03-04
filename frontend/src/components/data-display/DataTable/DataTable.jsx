/* ==========================================================================
   DATA TABLE COMPONENT
   Generic, reusable data table driven by columns + data props.
   
   Separation of Concerns:
   - This component handles ONLY rendering tabular data.
   - Data fetching is the page's responsibility.
   - Column definitions describe how to render each field.
   ========================================================================== */

import './DataTable.css';

/**
 * @param {{ columns: Array<{ key, label, render? }>, data: Array, emptyMessage?: string }}
 */
const DataTable = ({ columns = [], data = [], emptyMessage = 'No data available.' }) => {
    if (data.length === 0) {
        return (
            <div className="data-table-wrapper">
                <div className="data-table--empty">
                    <div className="data-table__empty-icon">
                        {/* Elegant line-art placeholder (could be an SVG from icon library) */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                            <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                    </div>
                    <div className="data-table__empty-text">
                        <h4 className="data-table__empty-heading">No Records Found</h4>
                        <p className="data-table__empty-subtext">{emptyMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="data-table-wrapper">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr key={row.id || rowIdx}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
