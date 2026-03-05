import { api } from "./axios";
import type { OcrResponse } from "../utils/types";

export const extractCnicOcr = async (
    frontImage: File,
    backImage: File
): Promise<OcrResponse> => {
    const formData = new FormData();
    formData.append("front_image", frontImage);
    formData.append("back_image", backImage);

    const response = await api.post("/receptionist/ocr/extract", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};