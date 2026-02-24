import type { CreateUser, PaginatedResponse, UserListType } from "../utils/types";
import { api } from "./axios";


export const getUsers = async (
    page: number = 1,
    limit: number = 20
): Promise<PaginatedResponse<UserListType>> => {
    const response = await api.get("/admin/users/", {
        params: { page, limit }
    });
    return response.data;
};

export const createUser = async (payload: CreateUser): Promise<void> => {
    await api.post("/admin/users/user", {
        username: payload.username,
        password: payload.password,
        user_role: payload.user_role,
        branch_id: payload.branch_id ? Number(payload.branch_id) : null
    })
}   