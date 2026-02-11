import type { Badge } from "../utils/types"
import api from "./axios"

export const getBadges = async (): Promise<Badge[]> => {
    const response = await api.get("/admin/badges")
    return response.data.badges
}