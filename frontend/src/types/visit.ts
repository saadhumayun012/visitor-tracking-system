export type VisitStatus = "checked_in" | "checked_out";

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

export interface CreateVisitVehicleNested {
    vehicle_number: string;
    vehicle_color: string;
    vehicle_type: string;
}

export interface CreateVisitItemNested {
    items_description: string;
}

export interface CreateVisit {
    purpose: string;
    purpose_description: string | null;
    visitor_id: number;
    branch_id: number;
    badge_id: number;
    vehicle: CreateVisitVehicleNested | null;
    items: CreateVisitItemNested | null;
}

export interface VisitInformation {
    visitor_name: string;
    cnic_number: string;
    purpose: string;
    status: VisitStatus;
    check_in_time: string;
    total_time: number;
}

export interface ActiveVisit {
    event: "checkin" | "checkout";
    visit_id: number;
    visitor_name?: string;
    cnic_number?: string;
    purpose?: string;
    badge_id?: number;
    check_in_time?: string;
}
