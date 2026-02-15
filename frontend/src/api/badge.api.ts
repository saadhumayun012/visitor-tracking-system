import type { Badge, CreateBadge } from "../utils/types"
import { api } from "./axios"

export const getBadges = async (): Promise<Badge[]> => {
    const response = await api.get("/admin/badges/")
    return response.data.badges
}

export const createBadge = async (payload: CreateBadge): Promise<void> => {
    await api.post("/admin/badges/badge", {
        badge_code: payload.badge_code,
    })
}

export const getAvailableBadges = async (): Promise<Badge[]> => {
    const response = await api.get("/receptionist/badges/available");
    return response.data.badges;
};