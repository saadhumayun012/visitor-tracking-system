import { useEffect, useRef, useState } from "react";
import type { VisitorInformation } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { Button } from "../../../components";
import {
    getVisitorByCnic,
    extractCnicOcr,
    getAllDocumentTypes,
} from "../../../api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formateDateTime";
import Webcam from "react-webcam";

interface DocumentType {
    document_type_id: number;
    document_code: string;
    document_name: string;
    is_required: boolean;
}

interface DocumentSlot {
    type: DocumentType;
    file: File | null;
    previewUrl: string | null;
    showCamera: boolean;
}

export const RegisteredVisitor = () => {
    const navigate = useNavigate();

    const [cnic, setCnic] = useState("");
    const [visitorInfo, setVisitorInfo] = useState<VisitorInformation | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    const [slots, setSlots] = useState<DocumentSlot[]>([]);
    const [slotsError, setSlotsError] = useState("");
    const [isExtracting, setIsExtracting] = useState(false);
    const [ocrError, setOcrError] = useState("");

    const webcamRefs = useRef<{ [index: number]: Webcam | null }>({});
    const fileInputRefs = useRef<{ [index: number]: HTMLInputElement | null }>(
        {},
    );

    useEffect(() => {
        getAllDocumentTypes()
            .then((types: DocumentType[]) => {
                setSlots(
                    types.map((t) => ({
                        type: t,
                        file: null,
                        previewUrl: null,
                        showCamera: false,
                    })),
                );
            })
            .catch(() =>
                setSlotsError("Failed to load document types. Please refresh."),
            );
    }, []);

    // Search visitor by CNIC
    const handleSearch = async () => {
        if (!cnic) {
            setError("CNIC number is required");
            return;
        }
        try {
            setIsLoading(true);
            setError("");
            setNotFound(false);
            const info = await getVisitorByCnic(cnic);
            setVisitorInfo(info);
        } catch (error: any) {
            setVisitorInfo(null);
            setNotFound(true); 
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to update a specific slot by index
    const updateSlot = (index: number, changes: Partial<DocumentSlot>) => {
        setSlots((prev) =>
            prev.map((s, i) => (i === index ? { ...s, ...changes } : s)),
        );
    };

    // Capture image from webcam
    const captureImage = (index: number) => {
        const webcam = webcamRefs.current[index];
        if (!webcam) return;

        const imageSrc = webcam.getScreenshot();
        if (!imageSrc) return;

        fetch(imageSrc)
            .then((r) => r.blob())
            .then((blob) => {
                const file = new File(
                    [blob],
                    `${slots[index].type.document_code}_${Date.now()}.jpg`,
                    { type: "image/jpeg" },
                );
                const previewUrl = URL.createObjectURL(blob);
                updateSlot(index, { file, previewUrl, showCamera: false });
            });
    };

    // Handle file selection from input
    const handleFileSelect = (index: number, file: File) => {
        const previewUrl = URL.createObjectURL(file);
        updateSlot(index, { file, previewUrl });
    };

    // Retake or remove selected image
    const retake = (index: number) => {
        if (slots[index].previewUrl)
            URL.revokeObjectURL(slots[index].previewUrl!);
        updateSlot(index, { file: null, previewUrl: null, showCamera: false });
    };

    // Extract OCR and navigate to form
    const handleExtract = async () => {
        // Required slots check
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
        } catch (error) {
            setOcrError(getErrorMessage(error));
        } finally {
            setIsExtracting(false);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <div
                    className="nav-back"
                    onClick={() => navigate("/receptionist")}
                >
                    ← BACK TO DASHBOARD
                </div>

                <h1 className="form-title">Find Visitor With CNIC</h1>

                {/* Search */}
                <div className="input-group-container">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                            placeholder="Enter CNIC number"
                            className="search-input"
                        />
                        <Button
                            variant="search"
                            isLoading={isLoading}
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </div>
                </div>

                {error && <div className="error-root">{error}</div>}

                {/* Visitor Not Found */}
                {notFound && (
                    <div className="list-container">
                        <p className="text-sm text-gray-500 mb-4">
                            Visitor not found — please upload documents to
                            register
                        </p>

                        {slotsError && (
                            <div className="error-root">{slotsError}</div>
                        )}

                        {slots.map((slot, index) => (
                            <div
                                key={slot.type.document_type_id}
                                className="mb-6"
                            >
                                <p className="list-item-label mb-2">
                                    {slot.type.document_name}
                                    {slot.type.is_required && (
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    )}
                                </p>

                                {/* No file yet */}
                                {!slot.file && !slot.showCamera && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="post"
                                            onClick={() =>
                                                updateSlot(index, {
                                                    showCamera: true,
                                                })
                                            }
                                        >
                                            Camera
                                        </Button>
                                        <Button
                                            variant="get"
                                            onClick={() =>
                                                fileInputRefs.current[
                                                    index
                                                ]?.click()
                                            }
                                        >
                                            Select File
                                        </Button>
                                        <input
                                            ref={(el) => {
                                                fileInputRefs.current[index] =
                                                    el;
                                            }}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file)
                                                    handleFileSelect(
                                                        index,
                                                        file,
                                                    );
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Camera */}
                                {slot.showCamera && (
                                    <div className="flex flex-col gap-2">
                                        <Webcam
                                            ref={(el) => {
                                                webcamRefs.current[index] = el;
                                            }}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={{
                                                facingMode: "environment",
                                            }}
                                            className="w-full max-w-md rounded-lg border"
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                variant="post"
                                                onClick={() =>
                                                    captureImage(index)
                                                }
                                            >
                                                Capture
                                            </Button>
                                            <Button
                                                variant="delete"
                                                onClick={() =>
                                                    updateSlot(index, {
                                                        showCamera: false,
                                                    })
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Preview */}
                                {slot.file && (
                                    <div className="flex flex-col gap-2">
                                        <img
                                            src={slot.previewUrl!}
                                            alt="preview"
                                            className="w-full max-w-md rounded-lg border"
                                        />
                                        <div className="flex gap-2 items-center">
                                            <span className="text-green-600 text-sm">
                                                {slot.file.name}
                                            </span>
                                            <Button
                                                variant="delete"
                                                onClick={() => retake(index)}
                                            >
                                                Retake
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {ocrError && (
                            <div className="error-root">{ocrError}</div>
                        )}

                        <div className="flex gap-2 mt-4">
                            <Button
                                variant="post"
                                isLoading={isExtracting}
                                onClick={handleExtract}
                            >
                                {isExtracting
                                    ? "Extracting..."
                                    : "Extract & Continue →"}
                            </Button>
                            <Button
                                variant="get"
                                onClick={() =>
                                    navigate("/receptionist/visitors-form")
                                }
                            >
                                Manual Entry
                            </Button>
                        </div>
                    </div>
                )}

                {/* Visitor Found */}
                {visitorInfo && (
                    <div className="list-container">
                        <div className="list-item">
                            <span className="list-item-label">
                                Visitor Name:{" "}
                            </span>
                            <span className="list-item-value">
                                {visitorInfo.visitor_name}
                            </span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">CNIC: </span>
                            <span className="list-item-value">
                                {visitorInfo.cnic_number}
                            </span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">Gender: </span>
                            <span className="list-item-value">
                                {visitorInfo.gender}
                            </span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">
                                Date of Birth:{" "}
                            </span>
                            <span className="list-item-value">
                                {formatDate(visitorInfo.date_of_birth)}
                            </span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">
                                Phone Number:{" "}
                            </span>
                            <span className="list-item-value">
                                {visitorInfo.phone_number}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="found"
                                onClick={() =>
                                    navigate(
                                        `/receptionist/visits-form/${visitorInfo.visitor_id}`,
                                    )
                                }
                            >
                                Visitor Found - Create Visit
                            </Button>
                            <Button
                                variant="put"
                                onClick={() =>
                                    navigate("/receptionist/visitors-form", {
                                        state: { visitorInfo },
                                    })
                                }
                            >
                                Update Visitor
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
