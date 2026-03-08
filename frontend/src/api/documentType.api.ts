import type { DocumentType } from "../utils/types";
import { api } from "./axios";

// for receptionist — used when loading document slots on the CNIC page
export const getAllDocumentTypes = async () => {
    const { data } = await api.get("/receptionist/document-types/");
    return data;
};

// for admin — used in admin document types list
export const getAdminDocumentTypes = async () => {
    const { data } = await api.get("/admin/document-types/");
    return data;
};

export const createDocumentType = async (payload: DocumentType) => {
    await api.post("/admin/document-types/type/", {
        document_code: payload.document_code,
        document_name: payload.document_name,
        is_required: payload.is_required,
    });
};
