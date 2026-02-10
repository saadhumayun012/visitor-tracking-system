import { useNavigate } from "react-router-dom"

export const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>All Branches List</h1>
            <button onClick={() => navigate("/admin/branches-list")}>lists</button>
            <h1>Add Branch</h1>
            <button onClick={() => navigate("/admin/branch-form")}>create</button>
        </div>
    )
}