export type BadgeStatus = "available" | "in_use" | "lost" | "disabled";

export interface Badge {
    badge_id: number;
    badge_code: string;
    badge_status: BadgeStatus;
    created_at: string;
}

export interface CreateBadge {
    badge_code: string;
}
