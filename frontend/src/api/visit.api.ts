import type { Visit, CreateVisit, VisitInformation } from "../utils/types";
import { api } from "./axios";

// get all visits of a visitor
export const getVisitsOfVisitor = async (
    visitor_id: string,
): Promise<Visit[]> => {
    const { data } = await api.get(`/admin/visitors/${visitor_id}/visits`);
    return data;
};

// create visit
export const createVisit = async (payload: CreateVisit): Promise<void> => {
    await api.post("/receptionist/visits/visit", {
        purpose: payload.purpose,
        purpose_description: payload.purpose_description ?? null,
        visitor_id: payload.visitor_id,
        branch_id: payload.branch_id,
        badge_id: payload.badge_id,
        vehicle: payload.vehicle ?? null,
        items: payload.items ?? null,
    });
};

// find visit by badge
export const findVisitByBadge = async (
    badgeCode: string,
): Promise<VisitInformation> => {
    const { data } = await api.get(`/receptionist/find-visit`, {
        params: { badge_code: badgeCode },
    });
    return data;
};

// checkout visit
export const checkoutVisit = async (badgeCode: string): Promise<void> => {
    await api.post(`/receptionist/find-visit/checkout`, null, {
        params: { badge_code: badgeCode },
    });
};
