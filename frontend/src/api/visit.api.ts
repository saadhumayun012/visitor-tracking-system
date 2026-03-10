import type { Visit, CreateVisit, VisitInformation } from "../utils/types";
import { api } from "./axios";

// ==========+++++==========+++++==========
export const getVisitsOfVisitor = async (
    visitor_id: number,
): Promise<Visit[]> => {
    const { data } = await api.get(`/admin/visitors/${visitor_id}/visits`);
    return data;
};

// ==========+++++==========+++++==========
export const createVisit = async (payload: CreateVisit): Promise<void> => {
    await api.post("/receptionist/visits/", {
        purpose: payload.purpose,
        purpose_description: payload.purpose_description ?? null,
        visitor_id: payload.visitor_id,
        branch_id: payload.branch_id,
        badge_id: payload.badge_id,
        vehicle: payload.vehicle ?? null,
        items: payload.items ?? null,
    });
};

// ==========+++++==========+++++==========
export const findVisitByBadge = async (
    badgeCode: string,
): Promise<VisitInformation> => {
    const { data } = await api.get(`/receptionist/find-visit`, {
        params: { badge_code: badgeCode },
    });
    return data;
};

// ==========+++++==========+++++==========
export const checkoutVisit = async (badgeCode: string): Promise<void> => {
    await api.post(`/receptionist/find-visit/checkout`, null, {
        params: { badge_code: badgeCode },
    });
};
