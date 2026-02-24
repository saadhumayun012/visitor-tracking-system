import type { Badge } from "../../../utils/types";
import { formatDateTime } from "../../../utils/formateDateTime";
import { DataTable, Pagination  } from "../../../components";
import { usePagination } from "../../../hooks/usePagination";
import { getBadges } from "../../../api";

export const BadgeList = () => {
    const { items, page, total_pages, loading, error, goNext, goPrev } =
        usePagination<Badge>(getBadges);

    const columns = [
        {
            header: "ID",
            accessor: (b: Badge) => b.badge_id,
            className: "table-td-muted",
        },
        { 
            header: "Badge Code", 
            accessor: (b: Badge) => b.badge_code 
        },
        { 
            header: "Badge Status", 
            accessor: (b: Badge) => b.badge_status 
        },
        {
            header: "Created At",
            accessor: (b: Badge) => formatDateTime(b.created_at),
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <DataTable
                title="All Badges"
                backLink="/admin"
                backText="← BACK TO ADMIN DASHBOARD"
                columns={columns}
                data={items}
                getRowKey={(badge) => badge.badge_id}
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
