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
                <p className="data-table--empty">{emptyMessage}</p>
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
