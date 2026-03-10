import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ==========+++++==========+++++==========
export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// ==========+++++==========+++++==========
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const is401 = error.response?.status === 401;
        const isLoginRequest = error.config?.url?.includes('/auth/token');
        const isMeRequest = error.config?.url?.includes('/auth/me'); 

        if (is401 && !isLoginRequest && !isMeRequest) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    },
);