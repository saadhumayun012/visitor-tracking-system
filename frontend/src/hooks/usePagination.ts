import { useState, useEffect } from "react";
import type { PaginatedResponse } from "../utils/types";

export const usePagination = <T>(
    fetchFn: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
    limit: number = 15
) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<PaginatedResponse<T> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchFn(page, limit)
            .then(setData)
            .catch(() => setError("Failed to load data"))
            .finally(() => setLoading(false));
    }, [page, limit, fetchFn]);

    return {
        items: data?.items ?? [],
        total_pages: data?.total_pages ?? 1,
        page,
        loading,
        error,
        goNext: () => setPage(p => p + 1),
        goPrev: () => setPage(p => p - 1),
    };
};