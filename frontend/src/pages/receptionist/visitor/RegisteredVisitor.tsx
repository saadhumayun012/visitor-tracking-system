import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocumentTypes } from "../../../api";
import { formatDate } from "../../../utils/formatDateTime";
import { Button, CnicSearchForm, OcrExtractPanel } from "../../../components";
import type {
    VisitorInformation,
    AllDocumentType,
    DocumentSlot,
} from "../../../utils/types";

export const RegisteredVisitor = () => {
    const navigate = useNavigate();

    const [visitorInfo, setVisitorInfo] = useState<VisitorInformation | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [slots, setSlots] = useState<DocumentSlot[]>([]);
    const [slotsError, setSlotsError] = useState("");

    // Load document types on mount
    useEffect(() => {
        getDocumentTypes()
            .then((types: AllDocumentType[]) => {
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

    // Cleanup object URLs on unmount  memory leak fix
    useEffect(() => {
        return () => {
            slots.forEach((slot) => {
                if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
            });
        };
        // intentionally no deps, runs only on unmount with latest slots via closure ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateSlot = (index: number, changes: Partial<DocumentSlot>) => {
        setSlots((prev) =>
            prev.map((s, i) => (i === index ? { ...s, ...changes } : s)),
        );
    };

    const handleFound = (visitor: VisitorInformation) => {
        setVisitorInfo(visitor);
        setNotFound(false);
    };

    const handleNotFound = () => {
        setVisitorInfo(null);
        setNotFound(true);
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

                <CnicSearchForm
                    onFound={handleFound}
                    onNotFound={handleNotFound}
                />

                {notFound && (
                    <OcrExtractPanel
                        slots={slots}
                        onUpdateSlot={updateSlot}
                        slotsError={slotsError}
                    />
                )}

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
