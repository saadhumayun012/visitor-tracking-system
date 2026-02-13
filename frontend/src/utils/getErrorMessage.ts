import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {

        const detail = error.response?.data?.detail;

        if (detail) {
            // pydantic validation errors (array)
            if (Array.isArray(detail)) {
                const errors = detail
                    .map((err: any) => {
                        const msg = err.msg || "Invalid Input (ValueError)";
                        return msg.replace(/^Value error,\s*/i, ""); //remove the "value error" keyword
                    })
                    .join(", ");
                return errors;
            }
            
            // simple string errors means the which raised by httpException
            if (typeof detail === "string") {
                return detail;
            }
            
            return "Something went wrong";
        }
        // can handle value error too but fro now no need for it

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