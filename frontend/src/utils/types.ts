export interface User {
    user_id: number;
    username: string;
    user_role: UserRoles;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    userLogin: (username: string, password: string) => Promise<void>;
    userLogout: () => Promise<void>;
}

export type UserRoles = "admin" | "receptionist" | "branch_officer";

export interface LoginFormData {
    username: string;
    password: string;
}
