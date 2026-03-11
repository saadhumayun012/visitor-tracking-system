import type { UserRoles } from "./auth";

export interface UserListType {
    user_id: number;
    username: string;
    user_role: string;
    branch_id: number | null;
    branch_name?: string;
    last_login_at: string | null;
    created_at: string;
}

export interface CreateUser {
    username: string;
    password: string;
    user_role: UserRoles;
    branch_id: number | null;
}
