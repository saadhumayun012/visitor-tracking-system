import { useState } from "react";
import type { VisitInformation } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { Button } from "../../../components";
import { checkoutVisit, findVisitByBadge } from "../../../api";
import { formatDateTime } from "../../../utils/formateDateTime";
import { useNavigate } from "react-router-dom";

export const FindVisitAndCheckout = () => {
    const navigate = useNavigate();

    const [badgeCode, setBadgeCode] = useState("");
    const [visitInfo, setVisitInfo] = useState<VisitInformation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!badgeCode.trim()) {
            setError("Enter badge code");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const info = await findVisitByBadge(badgeCode);
            setVisitInfo(info);
        } catch (error) {
            setError(getErrorMessage(error));
            setVisitInfo(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckout = async () => {
        try {
            setIsCheckout(true);
            await checkoutVisit(badgeCode);
            setBadgeCode("");
            setVisitInfo(null);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsCheckout(false);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                 <div className="nav-back" onClick={() => navigate("/receptionist")}>
                    ← BACK TO DASHBOARD
                </div>

                <h1 className="form-title">Visitor Checkout</h1>

                {/* Search */}
                <div className="input-group-container">
                    <div className="flex gap-2 ">
                        <input
                            type="text"
                            value={badgeCode}
                            onChange={(e) => setBadgeCode(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Enter Badge Code"
                            className="search-input"
                        />
                        <Button
                            onClick={handleSearch}
                            isLoading={isLoading}
                            variant="search"
                        >
                            Search
                        </Button>
                    </div>
                </div>

                {error && <div className="error-root">{error}</div>}

                {/* Visit Info */}
                {visitInfo && (
                    <div className="list-container">
                        <div className="list-item">
                            <span className="list-item-label">Visitor Name: </span>
                            <span className="list-item-value">{visitInfo.visitor_name}</span>
                        </div>

                        <div className="list-item">
                            <span className="list-item-label">CNIC: </span>
                            <span className="list-item-value">{visitInfo.cnic_number}</span>
                        </div>

                        <div className="list-item">
                            <span className="list-item-label">Purpose: </span>
                            <span className="list-item-value">{visitInfo.purpose}</span>
                        </div>

                        <div className="list-item">
                            <span className="list-item-label">Check-in Time: </span>
                            <span className="list-item-value">{formatDateTime(visitInfo.check_in_time)}</span>
                        </div>

                        <div className="list-item">
                            <span className="list-item-label">Duration: </span>
                            <span className="list-item-value text-blue-600 font-bold">
                                {visitInfo.total_time} minutes
                            </span>
                        </div>

                        <Button
                            onClick={handleCheckout}
                            isLoading={isCheckout}
                            variant="found"
                        >
                            Check Out
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};