export interface PaginatedResponse<T> {
    items: T[];
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
}
