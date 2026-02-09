import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {

        const detail = error.response?.data?.detail;
        
        if (detail) {
            return typeof detail === "string" ? detail : "Something went wrong";
        }
        
        if (!error.response) {
            return "Network error. Check your connection.";
        }
        
        return "Something went wrong";
    }
    
    
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};