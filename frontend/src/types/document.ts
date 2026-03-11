export interface AllDocumentType {
    document_type_id: number;
    document_code: string;
    document_name: string;
    is_required: boolean;
    created_at: string;
}

export interface DocumentType {
    document_code: string;
    document_name: string;
    is_required: boolean;
}

export interface DocumentPathItem {
    document_code: string;
    file_path: string;
}
