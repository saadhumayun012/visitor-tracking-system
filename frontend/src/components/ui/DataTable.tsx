import { useNavigate } from "react-router-dom";

interface Column<T> {
    header: string;
    accessor: (row: T) => React.ReactNode
    className?: string
}

interface DataTableProps<T> {
    title: string;
    backLink: string;
    backText?: string;
    columns: Column<T>[];
    data: T[];
    getRowKey: (row: T) => string | number;
}

export const DataTable = <T,> ({
    title, 
    backLink, 
    backText,
    columns, 
    data, 
    getRowKey
}: DataTableProps<T>) => {
    const navigate = useNavigate();
    return (
        <div className="page-container flex-col pt-10">
            <div className="table-wrapper-wide">
                <div className="nav-back" onClick={() => navigate(backLink)}>
                    {backText}
                </div>
                
                <h1 className="form-title mb-6">{title}</h1>
                
                <div className="table-container">
                    <table className="data-table">
                        <thead className="table-thead">
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index} className="table-th text-left">
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((row) => (
                                <tr key={getRowKey(row)} className="table-tr">
                                    {columns.map((col, index) => (
                                        <td 
                                            key={index} 
                                            className={col.className || "table-td"}
                                        >
                                            {col.accessor(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}