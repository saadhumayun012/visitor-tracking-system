import type { OcrResponse } from "../utils/types";
import { api } from "./axios";

// ==========+++++==========+++++==========
export const extractCnicOcr = async (
    documents: { file: File; document_code: string }[]
): Promise<OcrResponse> => {
    const formData = new FormData();

    documents.forEach(({ file, document_code }) => {
        formData.append("documents", file);
        formData.append("document_codes", document_code);
    });

    const response = await api.post("/receptionist/ocr/extract", formData);
    return response.data;
};