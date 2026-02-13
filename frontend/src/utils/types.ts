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
    created_at: string;
    update_at: string | null;
}

export interface CreateBranch {
    branch_code: string;
    branch_name: string;
}

export type BadgeStatus = "available" | "is_use" | "lost" | "disabled";

export interface Badge {
    badge_id: number;
    badge_code: string;
    badge_status: BadgeStatus;
    created_at: string;
    update_at: string | null;
}

export interface CreateBadge {
    badge_code: string;
}

export interface UserListType {
    user_id: number;
    username: string;
    user_role: UserRoles;
    branch_id: number;
    last_login_at: string;
    created_at: string;
    update_at: string | null;
}

export interface CreateUser {
    username: string;
    password: string;
    user_role: UserRoles;
    branch_id: number | null;
}

export type GenderType = "male" | "female" | "other";

//recheck the null things
export interface Visitor {
    visitor_id: number;
    visitor_name: string;
    father_name: string | null;
    gender: GenderType | null;
    cnic_number: string;
    date_of_birth: string;
    cnic_date_of_issue: string | null;
    cnic_date_of_expiry: string | null;
    current_address: string;
    permanent_address: string | null;
    phone_number: string;
    created_at: string;
    update_at: string | null;
}

export interface Visit {
    visit_id: number;
    visitor_id: number;
    purpose: string;
    purpose_description: string;
    check_in_time: string;
    check_out_time: string | null;
    status: string;
    branch_id: number;
    badge_id: number;
    created_by: number;
    updated_by: number | null;
    created_at: string;
    visit_vehicle: VisitVehicle | null;
    visit_item: VisitItem | null;
}

export interface VisitVehicle {
    visit_vehicle_id: number;
    vehicle_number: string;
    vehicle_type: string;
    vehicle_color: string;
    visit_id: number;
    created_at: string;
}

export interface VisitItem {
    visit_item_id: number;
    items_description: string;
    visit_id: number;
    created_at: string;
}
//-------------------------------

export interface CreateVisitor {
    visitor_name: string;
    father_name: string | null;
    gender: GenderType | null;
    date_of_birth: string;
    cnic_number: string;
    cnic_date_of_issue: string | null;
    cnic_date_of_expiry: string | null;
    current_address: string;
    permanent_address: string | null;
    phone_number: string;
}

export type VisitStatus = "checked_in" | "checked_out";

export interface CreateVisit {
    purpose: string;
    purpose_description: string | null;
    visitor_id: number;
    branch_id: number;
    badge_id: number;
    visit_vehicle: CreateVisitVehicle | null;
    visit_item: CreateVisitItem | null;
}

export interface CreateVisitVehicle {
    visit_id: number;
    vehicle_number: string;
    vehicle_color: string;
    vehicle_type: string;
}

export interface CreateVisitItem {
    visit_id: number;
    items_description: string;
}