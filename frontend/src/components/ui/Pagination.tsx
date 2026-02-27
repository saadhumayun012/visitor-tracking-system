import { Button } from "./Button";

// components/ui/Pagination.tsx
interface PaginationProps {
    page: number;
    total_pages: number;
    onNext: () => void;
    onPrev: () => void;
}

export const Pagination = ({ page, total_pages, onNext, onPrev }: PaginationProps) => {

    return (
        <div className="pagination">
            <Button
                onClick={onPrev}
                disabled={page === 1} // page 1 — prev disable
                 variant="page"
            >
                ← Prev
            </Button>

            <span className="pagination-info">
                Page {page} of {total_pages}
            </span>

            <Button
                onClick={onNext}
                disabled={page === total_pages} // last page — next disable
                variant="page"
            >
                Next →
            </Button>
        </div>
    );
};