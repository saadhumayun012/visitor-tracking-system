import { api } from "./axios";
import type { Branch, CreateBranch } from "../utils/types";


export const getBranches = async (): Promise<Branch[]> => {
    const response = await api.get("/branches/");
    return response.data.branches;
}

export const createBranch = async (payload: CreateBranch): Promise<void> => {
    await api.post("/admin/branches/branch", {
        branch_code: payload.branch_code,
        branch_name: payload.branch_name,
    });
};
