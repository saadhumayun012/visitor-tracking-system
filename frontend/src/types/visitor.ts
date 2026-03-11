import type { AllDocumentType, DocumentPathItem } from "./document";

export type GenderType = "male" | "female" | "other";

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
    document_paths?: DocumentPathItem[];
}

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

export interface VisitorDocument {
    visitor_document_id: number;
    document_name: string;
    document_code: string;
    file_path: string;
    uploaded_by_username: string | null;
    created_at: string;
}

export interface DocumentSlot {
    type: AllDocumentType;
    file: File | null;
    previewUrl: string | null;
    showCamera: boolean;
}
