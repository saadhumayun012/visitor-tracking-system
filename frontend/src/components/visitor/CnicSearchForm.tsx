import { useState } from "react";

import type { VisitorInformation } from "../../types";
import { Button } from "../ui/Button";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getVisitorByCnic } from "../../api";

interface Props {
    onFound: (visitor: VisitorInformation) => void;
    onNotFound: () => void;
}

export const CnicSearchForm = ({ onFound, onNotFound }: Props) => {
    const [cnic, setCnic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!cnic) {
            setError("CNIC number is required");
            return;
        }
        try {
            setIsLoading(true);
            setError("");
            const info = await getVisitorByCnic(cnic);
            onFound(info);
        } catch (err: any) {
            onNotFound();
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
        </>
    );
};
