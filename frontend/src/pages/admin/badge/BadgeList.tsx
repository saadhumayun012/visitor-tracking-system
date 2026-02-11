import { useLoaderData, useNavigate } from "react-router-dom";
import type { Badge } from "../../../utils/types";

export const BadgeList = () => {
    const navigate = useNavigate();
    const { badges } = useLoaderData() as { badges: Badge[] };
    
    return (
    <div className="page-container flex-col pt-10">
        <div className="w-full max-w-4xl">
            <div className="nav-back" onClick={() => navigate("/admin")}>
                ← BACK TO DASHBOARD
            </div>
            
            <h1 className="form-title mb-6">All Badges</h1>
            
            <div className="table-container">
                <table className="data-table">
                    <thead className="table-thead">
                        <tr>
                            <th className="table-th text-left">ID</th>
                            <th className="table-th text-left">Badge Code</th>
                            <th className="table-th text-left">Badge Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {badges && badges.map((badge) => (
                            <tr key={badge.badge_id} className="table-tr">
                                <td className="table-td-muted">{badge.badge_id}</td>
                                <td className="table-td font-medium">{badge.badge_code}</td>
                                <td className="table-td-mono">{badge.badge_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};