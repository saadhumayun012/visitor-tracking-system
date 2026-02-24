import { useLoaderData } from "react-router-dom";
import type { Branch } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";
import { DataTable } from "../../../components";

export const BranchList = () => {
    const { branches } = useLoaderData() as { branches: Branch[] };
    
    const columns = [
        {
            header: "ID",
            accessor: (branch: Branch) => branch.branch_id,
            className: "table-td-muted"
        },
        {
            header: "Branch Name",
            accessor: (branch: Branch) => branch.branch_name
        },
        {
            header: "Code",
            accessor: (branch: Branch) => branch.branch_code
        },
        {
            header: "Created At",
            accessor: (branch: Branch) => formatDateTime(branch.created_at)
        },
    ];
    
    return (
        <DataTable
            title="All Branches"
            backLink="/admin"
            backText="← BACK TO ADMIN DASHBOARD"
            columns={columns}
            data={branches}
            getRowKey={(branch) => branch.branch_id}
        />
    );
};