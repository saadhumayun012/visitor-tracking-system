import { useState } from "react";
import type { VisitorInformation } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { Button } from "../../../components";
import { getVisitorByCnic } from "../../../api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formateDateTime";

export const RegisteredVisitor = () => {
    const navigate = useNavigate();

    const [cnic, setCnic] = useState("");
    const [visitorInfo, setVisitorInfo] = useState<VisitorInformation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!cnic) {
            setError("cnic number is required");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const info = await getVisitorByCnic(cnic);
            setVisitorInfo(info);
        } catch (error) {
            setError(getErrorMessage(error));
            setVisitorInfo(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                 <div className="nav-back" onClick={() => navigate("/receptionist")}>
                    ← BACK TO DASHBOARD
                </div>

                <h1 className="form-title">Find Visitor With Cnic</h1>

                {/* Search */}
                <div className="input-group-container">
                    <div className="flex gap-2 ">
                        <input
                            type="text"
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Enter cnic number"
                            className="px-3 py-2 border border-gray-400 rounded-sm flex-1"
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

                {/* Visitor Info */}
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

                        <Button
                            variant="found"
                            onClick={() =>
                                navigate(`/receptionist/visits-form/${visitorInfo.visitor_id}`)
                            }
                        >
                            Visitor Found - Create Visit
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};