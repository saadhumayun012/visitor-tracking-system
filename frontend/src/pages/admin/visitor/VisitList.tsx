import { useLoaderData } from "react-router-dom";
import type { Visit } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";
import { DataTable } from "../../../components";

export const VisitList = () => {
    const { visits } = useLoaderData() as { visits: Visit[] };
    
    const columns = [
        {
            header: "ID",
            accessor: (visit: Visit) => visit.visit_id,
            className: "table-td-muted"
        },
        {
            header: "Purpose",
            accessor: (visit: Visit) => visit.purpose
        },
        {
            header: "Purpose Description",
            accessor: (visit: Visit) => visit.purpose_description
        },
        {
            header: "Check In Time",
            accessor: (visit: Visit) => formatDateTime(visit.check_in_time)
        },
        {
            header: "Check Out Time",
            accessor: (visit: Visit) => formatDateTime(visit.check_out_time)
        },
        {
            header: "Status",
            accessor: (visit: Visit) => visit.status
        },
        {
            header: "Branch ID",
            accessor: (visit: Visit) => visit.branch_id
        },
        {
            header: "Badge ID",
            accessor: (visit: Visit) => visit.badge_id
        },
        {
            header: "Vehicle Number",
            accessor: (visit: Visit) => visit.visit_vehicle?.vehicle_number || "--"
        },
        {
            header: "Vehicle Color",
            accessor: (visit: Visit) => visit.visit_vehicle?.vehicle_color || "--"
        },
        {
            header: "Vehicle Type",
            accessor: (visit: Visit) => visit.visit_vehicle?.vehicle_type || "--"
        },
        {
            header: "Items Description",
            accessor: (visit: Visit) => visit.visit_item?.items_description || "--"
        },
        {
            header: "Created At",
            accessor: (visit: Visit) => formatDateTime(visit.created_at)
        }
    ];
    
    return (
        <DataTable
            title="All Visits"
            backLink="/admin/visitors-list"
            backText="← BACK TO VISITORS"
            columns={columns}
            data={visits}
            getRowKey={(visit) => visit.visit_id}
        />
    );
};