import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DocumentSlot } from "../../utils/types";
import { extractCnicOcr } from "../../api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { DocumentSlotUploader } from "./DocumentSlotUploader";
import { Button } from "../ui/Button";

interface Props {
    slots: DocumentSlot[];
    onUpdateSlot: (index: number, changes: Partial<DocumentSlot>) => void;
    slotsError: string;
}

export const OcrExtractPanel = ({ slots, onUpdateSlot, slotsError }: Props) => {
    const navigate = useNavigate();
    const [isExtracting, setIsExtracting] = useState(false);
    const [ocrError, setOcrError] = useState("");

    const handleExtract = async () => {
        const missing = slots.filter((s) => s.type.is_required && !s.file);
        if (missing.length > 0) {
            setOcrError(
                `Required: ${missing.map((s) => s.type.document_name).join(", ")}`,
            );
            return;
        }

        const documents = slots
            .filter((s) => s.file)
            .map((s) => ({
                file: s.file!,
                document_code: s.type.document_code,
            }));

        try {
            setIsExtracting(true);
            setOcrError("");
            const result = await extractCnicOcr(documents);
            navigate("/receptionist/visitors-form", {
                state: {
                    ocrData: result.extracted_data,
                    documentPaths: result.document_paths,
                },
            });
        } catch (err) {
            setOcrError(getErrorMessage(err));
        } finally {
            setIsExtracting(false);
        }
    };

    return (
        <div className="list-container">
            <p className="text-sm text-gray-500 mb-4">
                Visitor not found — please upload documents to register
            </p>

            {slotsError && <div className="error-root">{slotsError}</div>}

            {slots.map((slot, index) => (
                <DocumentSlotUploader
                    key={slot.type.document_type_id}
                    slot={slot}
                    index={index}
                    onUpdate={onUpdateSlot}
                />
            ))}

            {ocrError && <div className="error-root">{ocrError}</div>}

            <div className="flex gap-2 mt-4">
                <Button
                    variant="post"
                    isLoading={isExtracting}
                    onClick={handleExtract}
                >
                    {isExtracting ? "Extracting..." : "Extract & Continue →"}
                </Button>
                <Button
                    variant="get"
                    onClick={() => navigate("/receptionist/visitors-form")}
                >
                    Manual Entry
                </Button>
            </div>
        </div>
    );
};
