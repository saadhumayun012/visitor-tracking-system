import { useLoaderData } from "react-router-dom";
import type { UserListType } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";
import { DataTable } from "../../../components";

export const UserList = () => {
    const { users } = useLoaderData() as { users: UserListType[] };
    
    const columns = [
        {
            header: "ID",
            accessor: (user: UserListType) => user.user_id,
            className: "table-td-muted"
        },
        {
            header: "Username",
            accessor: (user: UserListType) => user.username
        },
        {
            header: "User Role",
            accessor: (user: UserListType) => user.user_role
        },
        {
            header: "Branch ID",
            accessor: (user: UserListType) => user.branch_id || "N/A"
        },
        {
            header: "Last Login At",
            accessor: (user: UserListType) => formatDateTime(user.last_login_at)
        },
        {
            header: "Created At",
            accessor: (user: UserListType) => formatDateTime(user.created_at)
        },
        {
            header: "Updated At",
            accessor: (user: UserListType) => formatDateTime(user.update_at)
        }
    ];
    
    return (
        <DataTable
            title="All Users"
            backLink="/admin"
            backText="← BACK TO ADMIN DASHBOARD"
            columns={columns}
            data={users}
            getRowKey={(user) => user.user_id}
        />
    );
};