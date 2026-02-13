import type {
    Visitor,
    Visit,
    CreateVisitor,
    CreateVisit,
    CreateVisitVehicle,
    CreateVisitItem,
} from "../utils/types";
import { api } from "./axios";

export const getVisitors = async (): Promise<Visitor[]> => {
    const response = await api.get("/admin/visitors/");
    return response.data.visitors;
};

export const getVisitsOfVisitor = async (
    visitor_id: string,
): Promise<Visit[]> => {
    const response = await api.get(`/admin/visitors/${visitor_id}/visits/`);
    return response.data.visits;
};

export const createVisitor = async (payload: CreateVisitor): Promise<void> => {
    await api.post("/receptionist/visitors/visitor", {
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
};

export const createVisit = async (payload: CreateVisit): Promise<void> => {
    console.log(payload);
    await api.post("/receptionist/visits/visit", {
        purpose: payload.purpose,
        purpose_description: payload.purpose_description,
        visitor_id: payload.visitor_id,
        branch_id: payload.branch_id,
        badge_id: payload.badge_id
    });
};


export const createVisitVehicle = async (payload: CreateVisitVehicle): Promise<void> => {
    console.log(payload);
    await api.post("/receptionist/visits/vehicle", {
        visit_id: payload.visit_id,
        vehicle_number: payload.vehicle_number,
        vehicle_color: payload.vehicle_color,
        vehicle_type: payload.vehicle_type
    });
};

export const createVisitItems = async (payload: CreateVisitItem): Promise<void> => {
    console.log(payload);
    await api.post("/receptionist/visits/items", {
        visit_id: payload.visit_id,
        items_description: payload.items_description
    });
};