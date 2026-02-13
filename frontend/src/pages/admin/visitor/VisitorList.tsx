import { useLoaderData, useNavigate } from "react-router-dom";
import type { Visitor } from "../../../utils/types";
import { formatDate, formatDateTime } from "../../../utils/formateDateTime";
import { DataTable } from "../../../components";

export const VisitorList = () => {
    const navigate = useNavigate();
    const { visitors } = useLoaderData() as { visitors: Visitor[] };
    
    const columns = [
        {
            header: "ID",
            accessor: (visitor: Visitor) => visitor.visitor_id,
            className: "table-td-muted"
        },
        {
            header: "View Visits",
            accessor: (visitor: Visitor) => (
                <button 
                    className="btn-view-text" 
                    onClick={() => navigate(`/admin/visitors/${visitor.visitor_id}/visits`)}
                >
                    view visits
                </button>
            )
        },
        {
            header: "Name",
            accessor: (visitor: Visitor) => visitor.visitor_name
        },
        {
            header: "Father",
            accessor: (visitor: Visitor) => visitor.father_name || "N/A"
        },
        {
            header: "Gender",
            accessor: (visitor: Visitor) => visitor.gender || "N/A"
        },
        {
            header: "DOB",
            accessor: (visitor: Visitor) => formatDate(visitor.date_of_birth)
        },
        {
            header: "CNIC",
            accessor: (visitor: Visitor) => visitor.cnic_number
        },
        {
            header: "Cnic-DOI",
            accessor: (visitor: Visitor) => formatDate(visitor.cnic_date_of_issue)
        },
        {
            header: "Cnic-DOE",
            accessor: (visitor: Visitor) => formatDate(visitor.cnic_date_of_expiry)
        },
        {
            header: "Current Address",
            accessor: (visitor: Visitor) => visitor.current_address
        },
        {
            header: "Permanent Address",
            accessor: (visitor: Visitor) => visitor.permanent_address || "N/A"
        },
        {
            header: "Phone number",
            accessor: (visitor: Visitor) => visitor.phone_number
        },
        {
            header: "Created At",
            accessor: (visitor: Visitor) => formatDateTime(visitor.created_at)
        },
        {
            header: "Updated At",
            accessor: (visitor: Visitor) => formatDateTime(visitor.update_at)
        }
    ];
    
    return (
        <DataTable
            title="All Visitors"
            backLink="/admin"
            backText="← BACK TO ADMIN DASHBOARD"
            columns={columns}
            data={visitors}
            getRowKey={(visitor) => visitor.visitor_id}
        />
    );
};