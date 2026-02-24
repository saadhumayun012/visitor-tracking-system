import type {
    Visitor,
    Visit,
    CreateVisitor,
    CreateVisit,
    VisitInformation,
    VisitorInformation,
    PaginatedResponse,
} from "../utils/types";
import { api } from "./axios";

// get all visitors
export const getVisitors = async (
    page: number = 1,
    limit: number = 20
): Promise<PaginatedResponse<Visitor>> => {
    const response = await api.get("/admin/visitors/", {
        params: { page, limit }
    });
    return response.data;
};

// get all visits of visitor
export const getVisitsOfVisitor = async (
    visitor_id: string,
): Promise<Visit[]> => {
    const response = await api.get(`/admin/visitors/${visitor_id}/visits`);
    return response.data;
};

// create visitor
export const createVisitor = async (payload: CreateVisitor): Promise<{ visitor_id: number }> => {
    const response = await api.post("/receptionist/visitors/visitor", {
        visitor_name: payload.visitor_name,
        father_name: payload.father_name || null,
        gender: payload.gender || null,
        date_of_birth: payload.date_of_birth,
        cnic_number: payload.cnic_number,
        cnic_date_of_issue: payload.cnic_date_of_issue || null,
        cnic_date_of_expiry: payload.cnic_date_of_expiry || null,
        current_address: payload.current_address,
        permanent_address: payload.permanent_address || null,
        phone_number: payload.phone_number,
    });

    return response.data;
};

// get visitor by id
export const getVisitorById = async (visitorId: number): Promise<Visitor> => {
    const response = await api.get(`/receptionist/visitors/${visitorId}`);
    return response.data;
};

// create visit
export const createVisit = async (payload: CreateVisit): Promise<void> => {
    await api.post("/receptionist/visits/visit", {
        purpose: payload.purpose,
        purpose_description: payload.purpose_description || null,
        visitor_id: payload.visitor_id,
        branch_id: payload.branch_id,
        badge_id: payload.badge_id,
        vehicle: payload.vehicle || null,
        items: payload.items || null
    });
};

// find visit by badge
export const findVisitByBadge = async (badgeCode: string): Promise<VisitInformation> => {
    const response = await api.get(`/receptionist/find-visit?badge_code=${badgeCode}`);
    return response.data;
};

// checkout visit
export const checkoutVisit = async (badgeCode: string): Promise<void> => {
    await api.post(`/receptionist/find-visit/checkout?badge_code=${badgeCode}`);
};


//registered visitor (find visitor by cnic)
export const registeredVisitor = async (cnic_number: string): Promise<VisitorInformation> => {
    const response = await api.get(`/receptionist/visitors/cnic?cnic_number=${cnic_number}`);
    console.log(response.data);
    return response.data;
}


// export const createVisitVehicle = async (payload: CreateVisitVehicle): Promise<void> => {
//     console.log(payload);
//     await api.post("/receptionist/visits/vehicle", {
//         visit_id: payload.visit_id,
//         vehicle_number: payload.vehicle_number,
//         vehicle_color: payload.vehicle_color,
//         vehicle_type: payload.vehicle_type
//     });
// };

// export const createVisitItems = async (payload: CreateVisitItem): Promise<void> => {
//     console.log(payload);
//     await api.post("/receptionist/visits/items", {
//         visit_id: payload.visit_id,
//         items_description: payload.items_description
//     });
// };