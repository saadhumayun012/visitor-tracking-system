import type {
    Visitor,
    CreateVisitor,
    VisitorInformation,
    PaginatedResponse,
} from "../utils/types";
import { api } from "./axios";

// get all visitors
export const getVisitors = async (
    page: number = 1,
    limit: number = 20,
): Promise<PaginatedResponse<Visitor>> => {
    const { data } = await api.get("/admin/visitors/", {
        params: { page, limit },
    });
    return data;
};

// get visitor by id
export const getVisitorById = async (visitorId: number): Promise<Visitor> => {
    const { data } = await api.get(`/receptionist/visitors/${visitorId}`);
    return data;
};

// create visitor
export const createVisitor = async (
    payload: CreateVisitor,
): Promise<{ visitor_id: number }> => {
    const { data } = await api.post("/receptionist/visitors/visitor", {
        visitor_name: payload.visitor_name,
        father_name: payload.father_name ?? null,
        gender: payload.gender ?? null,
        date_of_birth: payload.date_of_birth,
        cnic_number: payload.cnic_number,
        cnic_date_of_issue: payload.cnic_date_of_issue || null,
        cnic_date_of_expiry: payload.cnic_date_of_expiry || null,
        current_address: payload.current_address,
        permanent_address: payload.permanent_address ?? null,
        phone_number: payload.phone_number,
    });

    return data;
};

// find visitor by cnic
export const getVisitorByCnic = async (
    cnic_number: string,
): Promise<VisitorInformation> => {
    const { data } = await api.get(`/receptionist/visitors/cnic`, {
        params: { cnic_number },
    });
    return data;
};
