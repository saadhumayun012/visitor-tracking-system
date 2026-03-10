import type { AllDocumentType, DocumentType } from "../utils/types";
import { api } from "./axios";

// ==========+++++==========+++++==========
export const getDocumentTypes = async (): Promise<AllDocumentType[]> => {
    const { data } = await api.get("/document-types/");
    return data;
};

// ==========+++++==========+++++==========
export const createDocumentType = async (payload: DocumentType) => {
    await api.post("/admin/document-types/", {
        document_code: payload.document_code,
        document_name: payload.document_name,
        is_required: payload.is_required,
    });
};
