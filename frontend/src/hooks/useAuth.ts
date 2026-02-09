import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("use Auth must be withing auth provider")
    }
    return context;
}