import { useLoaderData, useNavigate } from "react-router-dom";
import type { Branch } from "../../../utils/types";

export const BranchList = () => {
    const navigate = useNavigate();
    const { branches } = useLoaderData() as { branches: Branch[] };
    
    return (
    <div className="page-container flex-col pt-10">
        <div className="w-full max-w-4xl">
            <div className="nav-back" onClick={() => navigate("/admin")}>
                ← BACK TO DASHBOARD
            </div>
            
            <h1 className="form-title mb-6">All Branches</h1>
            
            <div className="table-container">
                <table className="data-table">
                    <thead className="table-thead">
                        <tr>
                            <th className="table-th text-left">ID</th>
                            <th className="table-th text-left">Branch Name</th>
                            <th className="table-th text-left">Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches && branches.map((branch) => (
                            <tr key={branch.branch_id} className="table-tr">
                                <td className="table-td-muted">{branch.branch_id}</td>
                                <td className="table-td font-medium">{branch.branch_name}</td>
                                <td className="table-td-mono">{branch.branch_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};