import type { LoginFormData, User } from "../utils/types";
import { api }from "./axios";


export const login = async (payload: LoginFormData): Promise<void> => {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    await api.post("/auth/token", formData);
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
};
