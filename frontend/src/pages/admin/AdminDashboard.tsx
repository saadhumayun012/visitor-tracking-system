import { useNavigate } from "react-router-dom";
import { Button, Section } from "../../components";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="p-8 flex flex-col gap-8 max-w-2xl">
            <h1 className="text-xl font-bold border-b pb-2">Admin Dashboard</h1>

            <Section title="Branches">
                <Button
                    onClick={() => navigate("/admin/branches-list")}
                    className="bg-blue-600 text-white"
                >
                    View All Branches
                </Button>
                 <Button
                    onClick={() => navigate("/admin/branch-form")}
                    className="bg-yellow-600 text-white"
                >
                    CREATE NEW
                </Button>
            </Section>

            <Section title="Badges">
                <Button
                    onClick={() => navigate("/admin/badges-list")}
                    className="bg-blue-600 text-white"
                >
                    View All Users
                </Button>
                 <Button
                    onClick={() => navigate("/admin/badge-form")}
                    className="bg-yellow-600 text-white"
                >
                    CREATE NEW
                </Button>
            </Section>

            <Section title="Users">
                <Button
                    onClick={() => navigate("/admin/users-list")}
                    className="bg-blue-600 text-white"
                >
                    View All Users
                </Button>
                 <Button
                    onClick={() => navigate("/admin/user-form")}
                    className="bg-yellow-600 text-white"
                >
                    CREATE NEW
                </Button>
            </Section>

            <Section title="Visitors And Their Visits">
                <Button
                    onClick={() => navigate("/admin/visitors-list")}
                    className="bg-blue-600 text-white"
                >
                    View All Visitors
                </Button>
            </Section>
        </div>
    );
};
