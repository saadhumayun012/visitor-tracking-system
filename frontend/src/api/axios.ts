import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000";

export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const is401 = error.response?.status === 401;
        const isLoginRequest = error.config?.url?.includes('/auth/token');
        const isOnLoginPage = window.location.pathname === '/login';

        if (is401 && !isLoginRequest && !isOnLoginPage) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);