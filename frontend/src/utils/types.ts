//in types i am using snake case (which is linked with backend) instead of camel case because, so can backend names and frontend names are same

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

export interface Branch {
    branch_id: number;
    branch_code: string;
    branch_name: string;
}

export interface CreateBranch {
    branch_code: string;
    branch_name: string;
}

export type BadgeStatus = "available" | "is_use" | "lost" | "disabled"

export interface Badge {
    badge_id: number;
    badge_code: string,
    badge_status: BadgeStatus
}

export interface CreateBadge {
    badge_code: string,
    badge_status: BadgeStatus
}