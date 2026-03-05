//in types i am using snake case (which is linked with backend) instead of camel case because, so can backend names and frontend names are same

/* 
ALl types List 
1- User
2- AuthContextType
3- UserRoles
4- LoginFormData
5- Branch
6- CreateBranch
7- BadgeStatus
8- Badge
9- CreateBadge
10- UserList
11- CreateUser
12- GenderType
13- Visitor
14- CreateVisitor
15- Visit
16- CreateVisit
17- CreateVisitor
18- VisitVehicle
19- CreateVisitVehicleNested
20- VisitItem
21- CreateVisitItemNested
22- VisitInformation
23- VisitorInformation
24- PaginatedResponse
25- ActiveVisit
26- OcrExtractedData
27- OcrResponse
*/

 // 1- User
export interface User {
    user_id: number;
    username: string;
    user_role: UserRoles;
}

// 2- AuthContextType
export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    userLogin: (username: string, password: string) => Promise<void>;
    userLogout: () => Promise<void>;
}

// 3- UserRoles
export type UserRoles = "admin" | "receptionist" | "branch_officer";

// 4- LoginFormData
export interface LoginFormData {
    username: string;
    password: string;
}

// 5- Branch
export interface Branch {
    branch_id: number;
    branch_code: string;
    branch_name: string;
    created_at: string;
    updated_at: string | null;
}

// 6- CreateBranch
export interface CreateBranch {
    branch_code: string;
    branch_name: string;
}

// 7- BadgeStatus
export type BadgeStatus = "available" | "in_use" | "lost" | "disabled";

// 8- Badge
export interface Badge {
    badge_id: number;
    badge_code: string;
    badge_status: BadgeStatus;
    created_at: string;
    updated_at: string | null;
}

// 9- CreateBadge
export interface CreateBadge {
    badge_code: string;
}

// 10- UserList
export interface UserListType {
    user_id: number;
    username: string;
    user_role: string;
    branch_id: number | null;
    branch_name?: string;        
    last_login_at: string | null;
    created_at: string;
    update_at: string | null;
}

// 11- CreateUser
export interface CreateUser {
    username: string;
    password: string;
    user_role: UserRoles;
    branch_id: number | null;
}

// 12- GenderType
export type GenderType = "male" | "female" | "other";

// 13- Visitor
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
    updated_at: string | null;
}

// 14- Visit
export interface Visit {
    visit_id: number;
    visitor_id: number;
    purpose: string;
    purpose_description: string;
    check_in_time: string;
    check_out_time: string | null;
    status: string;
    branch_id: number;
    branch_name?: string;           
    badge_id: number;
    badge_code?: string;           
    created_by: number;
    created_by_username?: string;  
    created_at: string;
    visit_vehicle: VisitVehicle | null;
    visit_item: VisitItem | null;
}
// 15- VisitVehicle
export interface VisitVehicle {
    visit_vehicle_id: number;
    vehicle_number: string;
    vehicle_type: string;
    vehicle_color: string;
    visit_id: number;
    created_at: string;
}

// 16- VisitItem
export interface VisitItem {
    visit_item_id: number;
    items_description: string;
    visit_id: number;
    created_at: string;
}

// 17- CreateVisitor
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

// 18- VisitStatus
export type VisitStatus = "checked_in" | "checked_out";

// 19- CreateVisit
export interface CreateVisit {
    purpose: string;
    purpose_description: string | null;
    visitor_id: number;
    branch_id: number;
    badge_id: number;
    vehicle: CreateVisitVehicleNested | null;
    items: CreateVisitItemNested | null;
}

// 20- CreateVisitVehicle
export interface CreateVisitVehicleNested {
    vehicle_number: string;
    vehicle_color: string;
    vehicle_type: string;
}

// 21- CreateVisitItem
export interface CreateVisitItemNested {
    items_description: string;
}

// 22- VisitInformation
export interface VisitInformation {
    visitor_name: string;
    cnic_number: string;
    purpose: string;
    status: VisitStatus;
    check_in_time: string;
    total_time: number;
}

// 23- VisitorInformation
export interface VisitorInformation {
    visitor_id: number;
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

// 24- PaginatedResponse
export interface PaginatedResponse<T> {
    items: T[];
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
}

// 25- Active Visit For branch officer
export interface ActiveVisit {
    event: "checkin" | "checkout";
    visit_id: number;
    visitor_name?: string;
    cnic_number?: string;
    purpose?: string;
    badge_id?: number;
    check_in_time?: string;
}

// 26- Ocr Extracted Data
export interface OcrExtractedData {
    name: string | null;
    father_name: string | null;
    cnic_number: string | null;
    date_of_birth: string | null;
    date_of_issue: string | null;
    date_of_expiry: string | null;
    gender: string | null;
}

// 27- OCR response
export interface OcrResponse {
    extracted_data: OcrExtractedData;
    front_image_path: string;
    back_image_path: string;
}
