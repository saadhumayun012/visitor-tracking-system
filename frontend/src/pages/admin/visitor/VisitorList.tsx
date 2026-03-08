import { useNavigate } from "react-router-dom";
import type { Visitor } from "../../../utils/types";
import { formatDate, formatDateTime } from "../../../utils/formateDateTime";
import { DataTable, Pagination } from "../../../components";
import { usePagination } from "../../../hooks/usePagination";
import { getVisitors } from "../../../api";

export const VisitorList = () => {
    const navigate = useNavigate();
    const { items, page, total_pages, loading, error, goNext, goPrev } =
        usePagination<Visitor>(getVisitors);

    const columns = [
        {
            header: "ID",
            accessor: (visitor: Visitor) => visitor.visitor_id,
            className: "table-td-muted",
        },
        {
            header: "View Visits",
            accessor: (visitor: Visitor) => (
                <button
                    className="btn-view-text"
                    onClick={() =>
                        navigate(`/admin/visitors/${visitor.visitor_id}/visits`)
                    }
                >
                    view visits
                </button>
            ),
        },
        {
            header: "View Documents",
            accessor: (visitor: Visitor) => (
                <button
                    className="btn-view-text"
                    onClick={() =>
                        navigate(`/admin/visitors/${visitor.visitor_id}/documents`)
                    }
                >
                    view documents
                </button>
            ),
        },
        {
            header: "Name",
            accessor: (visitor: Visitor) => visitor.visitor_name,
        },
        {
            header: "Father",
            accessor: (visitor: Visitor) => visitor.father_name?.trim() || "N/A",
        },
        {
            header: "Gender",
            accessor: (visitor: Visitor) => visitor.gender?.trim() || "N/A",
        },
        {
            header: "DOB",
            accessor: (visitor: Visitor) => formatDate(visitor.date_of_birth),
        },
        {
            header: "CNIC",
            accessor: (visitor: Visitor) => visitor.cnic_number,
        },
        {
            header: "Cnic-DOI",
            accessor: (visitor: Visitor) =>
                formatDate(visitor.cnic_date_of_issue),
        },
        {
            header: "Cnic-DOE",
            accessor: (visitor: Visitor) =>
                formatDate(visitor.cnic_date_of_expiry),
        },
        {
            header: "Current Address",
            accessor: (visitor: Visitor) => visitor.current_address,
        },
        {
            header: "Permanent Address",
            accessor: (visitor: Visitor) => visitor.permanent_address || "N/A",
        },
        {
            header: "Phone number",
            accessor: (visitor: Visitor) => visitor.phone_number,
        },
        {
            header: "Created At",
            accessor: (visitor: Visitor) => formatDateTime(visitor.created_at),
        },
        {
            header: "Updated At",
            accessor: (visitor: Visitor) => formatDateTime(visitor.updated_at),
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <DataTable
                title="All Visitors List"
                backLink="/admin"
                backText="← BACK TO ADMIN DASHBOARD"
                columns={columns}
                data={items}
                getRowKey={(visitor) => visitor.visitor_id}
            />
            <Pagination
                page={page}
                total_pages={total_pages}
                onNext={goNext}
                onPrev={goPrev}
            />
        </>
    );
};
