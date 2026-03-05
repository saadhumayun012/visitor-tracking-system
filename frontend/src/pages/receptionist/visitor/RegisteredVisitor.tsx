import { useRef, useState } from "react";
import type { VisitorInformation } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { Button } from "../../../components";
import { getVisitorByCnic, extractCnicOcr } from "../../../api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formateDateTime";

export const RegisteredVisitor = () => {
    const navigate = useNavigate();

    const [cnic, setCnic] = useState("");
    const [visitorInfo, setVisitorInfo] = useState<VisitorInformation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    // OCR state
    const [showOcr, setShowOcr] = useState(false);
    const [frontFile, setFrontFile] = useState<File | null>(null);
    const [backFile, setBackFile] = useState<File | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [ocrError, setOcrError] = useState("");

    const frontRef = useRef<HTMLInputElement>(null);
    const backRef = useRef<HTMLInputElement>(null);

    const handleSearch = async () => {
        if (!cnic) {
            setError("CNIC number is required");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            setNotFound(false);
            setShowOcr(false);
            const info = await getVisitorByCnic(cnic);
            setVisitorInfo(info);
        } catch (error: any) {
            setVisitorInfo(null);
            if (error?.response?.status === 404) {
                setNotFound(true);
                setError("");
            } else {
                setError(getErrorMessage(error));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleExtract = async () => {
        if (!frontFile || !backFile) {
            setOcrError("Dono images required hain");
            return;
        }

        try {
            setIsExtracting(true);
            setOcrError("");
            const result = await extractCnicOcr(frontFile, backFile);
            // VisitorForm mein OCR data bhejo
            navigate("/receptionist/visitors-form", {
                state: { ocrData: result.extracted_data }
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
                <div className="nav-back" onClick={() => navigate("/receptionist")}>
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
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Enter CNIC number"
                            className="search-input"
                        />
                        <Button variant="search" isLoading={isLoading} onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </div>

                {error && <div className="error-root">{error}</div>}

                {/* Visitor Not Found */}
                {notFound && !showOcr && (
                    <div className="list-container">
                        <p className="text-sm text-gray-500 mb-4">
                            Visitor not found — naya visitor register karein
                        </p>
                        <div className="flex gap-2">
                            <Button variant="post" onClick={() => setShowOcr(true)}>
                                Scan CNIC
                            </Button>
                            <Button
                                variant="get"
                                onClick={() => navigate("/receptionist/visitors-form")}
                            >
                                Manual Entry
                            </Button>
                        </div>
                    </div>
                )}

                {/* OCR Upload Section */}
                {notFound && showOcr && (
                    <div className="list-container">
                        <p className="form-title text-base mb-4">CNIC Images Upload</p>

                        {/* Front Image */}
                        <div className="list-item flex-col items-start gap-1">
                            <span className="list-item-label">Front Side *</span>
                            <div className="flex gap-2 items-center">
                                <input
                                    ref={frontRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setFrontFile(e.target.files?.[0] ?? null)}
                                />
                                <Button variant="search" onClick={() => frontRef.current?.click()}>
                                    {frontFile ? "Front " + frontFile.name : "Choose File"}
                                </Button>
                            </div>
                        </div>

                        {/* Back Image */}
                        <div className="list-item flex-col items-start gap-1">
                            <span className="list-item-label">Back Side *</span>
                            <div className="flex gap-2 items-center">
                                <input
                                    ref={backRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setBackFile(e.target.files?.[0] ?? null)}
                                />
                                <Button variant="search" onClick={() => backRef.current?.click()}>
                                    {backFile ? "Back " + backFile.name : "Choose File"}
                                </Button>
                            </div>
                        </div>

                        {ocrError && <div className="error-root">{ocrError}</div>}

                        <div className="flex gap-2 mt-2">
                            <Button
                                variant="post"
                                isLoading={isExtracting}
                                onClick={handleExtract}
                            >
                                {isExtracting ? "Extracting..." : "Extract Data"}
                            </Button>
                            <Button variant="delete" onClick={() => setShowOcr(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {/* Visitor Found */}
                {visitorInfo && (
                    <div className="list-container">
                        <div className="list-item">
                            <span className="list-item-label">Visitor Name: </span>
                            <span className="list-item-value">{visitorInfo.visitor_name}</span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">CNIC: </span>
                            <span className="list-item-value">{visitorInfo.cnic_number}</span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">Gender: </span>
                            <span className="list-item-value">{visitorInfo.gender}</span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">Date of Birth: </span>
                            <span className="list-item-value">{formatDate(visitorInfo.date_of_birth)}</span>
                        </div>
                        <div className="list-item">
                            <span className="list-item-label">Phone Number: </span>
                            <span className="list-item-value">{visitorInfo.phone_number}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="found"
                                onClick={() => navigate(`/receptionist/visits-form/${visitorInfo.visitor_id}`)}
                            >
                                Visitor Found - Create Visit
                            </Button>
                            <Button
                                variant="put"
                                onClick={() => navigate("/receptionist/visitors-form", {
                                    state: { visitorInfo }
                                })}
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