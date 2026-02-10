import { useLoaderData, useNavigate } from "react-router-dom";
import type { Branch } from "../../utils/types";

export const BranchList = () => {
    const navigate = useNavigate();
    const  { branches }  = useLoaderData() as { branches: Branch[] };
    
    return (
        <div>
            <div onClick={() => navigate("/admin")}>back to Dashboard</div>
            <h1>All branches list</h1>
            {branches && branches.map((branch) => {
             return (
                <div key={branch.branch_code}>
                    <p>Id: {branch.branch_id}</p>
                    <p>Name: {branch.branch_name}</p>
                    <p>Code: {branch.branch_code}</p>
                </div>
             )   
            })}
        </div>
    );
};
