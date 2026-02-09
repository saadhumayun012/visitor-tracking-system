import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { getCurrentUser, login, logout } from "../api/auth.api";
import type { AuthContextType, User } from '../utils/types'

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = user !== null;

    // 🔹 Load user from cookie (source of truth)
    const loadUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const userLogin = async (username: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);
            await login({ username, password });
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            setUser(null)
            throw error //will handle this at the time of login
        } finally {
            setIsLoading(false);
        }
    };

    const userLogout = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await logout();
        } catch (error) {
            console.log("Logout Error is failed", error);
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                userLogin,
                userLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
