import type { Visitor, Visit } from "../utils/types";
import { api } from "./axios";


export const getVisitors = async (): Promise<Visitor[]> => {
    const response = await api.get("/admin/visitors/");
    return response.data.visitors;
}

export const getVisitsOfVisitor = async (visitor_id: string): Promise<Visit[]> => {
    const response = await api.get(`/admin/visitors/${visitor_id}/visits/`);
    return response.data.visits;
}