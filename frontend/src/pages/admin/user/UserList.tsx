import { getUsers } from "../../../api";
import { usePagination } from "../../../hooks/usePagination";
import { DataTable, Pagination } from "../../../components";
import type { UserListType } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";

export const UserList = () => {
    const { items, page, total_pages, loading, error, goNext, goPrev } =
        usePagination<UserListType>(getUsers);

    const columns = [
        {
            header: "ID",
            accessor: (u: UserListType) => u.user_id,
            className: "table-td-muted",
        },
        { 
            header: "Username", 
            accessor: (u: UserListType) => u.username 
        },
        {
            header: "User Role", 
            accessor: (u: UserListType) => u.user_role 
        },
        {
            header: "Branch",
            accessor: (u: UserListType) => u.branch_name || u.branch_id || "N/A"
        },
        {
            header: "Last Login At",
            accessor: (u: UserListType) => formatDateTime(u.last_login_at),
        },
        {
            header: "Created At",
            accessor: (u: UserListType) => formatDateTime(u.created_at),
        },
];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <DataTable
                title="All Users"
                backLink="/admin"
                backText="← BACK TO ADMIN DASHBOARD"
                columns={columns}
                data={items}
                getRowKey={(u) => u.user_id}
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
