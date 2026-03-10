import { api } from "./axios";
import type { Branch, CreateBranch } from "../utils/types";

// ==========+++++==========+++++==========
export const getBranches = async (): Promise<Branch[]> => {
    const { data } = await api.get("/branches/");
    return data;
}

// ==========+++++==========+++++==========
export const createBranch = async (payload: CreateBranch): Promise<void> => {
    await api.post("/admin/branches/", {
        branch_code: payload.branch_code,
        branch_name: payload.branch_name,
    });
};
