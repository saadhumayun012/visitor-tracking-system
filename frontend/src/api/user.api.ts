import type { CreateUser, UserListType } from "../utils/types";
import { api } from "./axios";


export const getUsers = async (): Promise<UserListType[]> => {
    const response = await api.get("/admin/users/")
    return response.data.users
}

export const createUser = async (payload: CreateUser): Promise<void> => {
    await api.post("/admin/users/user/", {
        username: payload.username,
        password: payload.password,
        user_role: payload.user_role,
        branch_id: payload.branch_id ? Number(payload.branch_id) : null
    })
}   