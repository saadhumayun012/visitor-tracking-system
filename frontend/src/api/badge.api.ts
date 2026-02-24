import type { Badge, CreateBadge, PaginatedResponse } from "../utils/types"
import { api } from "./axios"

export const getBadges = async (
    page: number = 1,
    limit: number = 20
): Promise<PaginatedResponse<Badge>> => {
    const response = await api.get("/admin/badges/", {
        params: { page, limit }
    });
    return response.data;
};

export const createBadge = async (payload: CreateBadge): Promise<void> => {
    await api.post("/admin/badges/badge", {
        badge_code: payload.badge_code,
    })
}

export const getAvailableBadges = async (): Promise<Badge[]> => {
    const response = await api.get("/receptionist/badges/available");
    return response.data;
};