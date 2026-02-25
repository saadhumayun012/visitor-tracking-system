import { useLoaderData } from "react-router-dom";
import type { Visit } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";
import { DataTable } from "../../../components";

export const VisitList = () => {
    const { visits } = useLoaderData() as { visits: Visit[] };
    
    const columns = [
        {
            header: "ID",
            accessor: (v: Visit) => v.visit_id,
            className: "table-td-muted"
        },
        {
            header: "Purpose",
            accessor: (v: Visit) => v.purpose
        },
        {
            header: "Purpose Description",
            accessor: (v: Visit) => v.purpose_description
        },
        {
            header: "Check In Time",
            accessor: (v: Visit) => formatDateTime(v.check_in_time)
        },
        {
            header: "Check Out Time",
            accessor: (v: Visit) => formatDateTime(v.check_out_time)
        },
        {
            header: "Status",
            accessor: (v: Visit) => v.status
        },
        {
            header: "Branch ID",
            accessor: (v: Visit) => v.branch_id
        },
        {
            header: "Badge ID",
            accessor: (v: Visit) => v.badge_id
        },
        {
            header: "Vehicle Number",
            accessor: (v: Visit) => v.visit_vehicle?.vehicle_number ?? "--"
        },
        {
            header: "Vehicle Color",
            accessor: (v: Visit) => v.visit_vehicle?.vehicle_color ?? "--"
        },
        {
            header: "Vehicle Type",
            accessor: (v: Visit) => v.visit_vehicle?.vehicle_type ?? "--"
        },
        {
            header: "Items Description",
            accessor: (v: Visit) => v.visit_item?.items_description ?? "--"
        },
        {
            header: "Created At",
            accessor: (v: Visit) => formatDateTime(v.created_at)
        },
        {
            header: "Created By",
            accessor: (v: Visit) => v.created_by
        },
    ];
    
    return (
        <DataTable
            title="All Visits"
            backLink="/admin"
            backText="← BACK TO DASHBOARD"
            columns={columns}
            data={visits}
            getRowKey={(v) => v.visit_id}
        />
    );
};