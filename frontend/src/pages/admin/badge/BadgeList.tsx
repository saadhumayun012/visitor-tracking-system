import { useLoaderData} from "react-router-dom";
import type { Badge } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";
import { DataTable } from "../../../components";

export const BadgeList = () => {
    const { badges } = useLoaderData() as { badges: Badge[] };
    
    const columns = [
        {
            header: "ID",
            accessor: (badge: Badge) => badge.badge_id,
            className: "table-td-muted"
        },
        {
            header: "Badge Code",
            accessor: (badge: Badge) => badge.badge_code
        },
        {
            header: "Badge Status",
            accessor: (badge: Badge) => badge.badge_status
        },
        {
            header: "Created At",
            accessor: (badge: Badge) => formatDateTime(badge.created_at)
        },
        {
            header: "Updated At",
            accessor: (badge: Badge) => formatDateTime(badge.update_at)
        }
    ];
    
    return (
        <DataTable
            title="All Badges"
            backLink="/admin"
            backText="← BACK TO ADMIN DASHBOARD"
            columns={columns}
            data={badges}
            getRowKey={(badge) => badge.badge_id}
        />
    );
};