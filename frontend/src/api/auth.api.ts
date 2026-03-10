import type { LoginFormData, User } from "../utils/types";
import { api }from "./axios";

// ==========+++++==========+++++==========
export const login = async (payload: LoginFormData): Promise<User> => {
    const formData = new FormData();
    formData.append("username", payload.username);
    formData.append("password", payload.password);

    const { data } = await api.post("/auth/token", formData);
    return data
};

// ==========+++++==========+++++==========
export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

// ==========+++++==========+++++==========
export const getCurrentUser = async (): Promise<User> => {
    const { data } = await api.get<User>("/auth/me");
    return data;
};
