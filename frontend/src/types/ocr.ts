import type { DocumentPathItem } from "./document";

export interface OcrExtractedData {
    name: string | null;
    father_name: string | null;
    cnic_number: string | null;
    date_of_birth: string | null;
    date_of_issue: string | null;
    date_of_expiry: string | null;
    gender: string | null;
}

export interface OcrResponse {
    extracted_data: OcrExtractedData | null;
    document_paths: DocumentPathItem[];
}
