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
                    variant="get"
                >
                    View All Branches
                </Button>
                 <Button
                    onClick={() => navigate("/admin/branch-form")}
                    variant="post"
                >
                    CREATE NEW
                </Button>
            </Section>

            <Section title="Badges">
                <Button
                    onClick={() => navigate("/admin/badges-list")}
                    variant="get"
                >
                    View All Badges
                </Button>
                 <Button
                    onClick={() => navigate("/admin/badge-form")}
                    variant="post"
                >
                    CREATE NEW
                </Button>
            </Section>

            <Section title="Users">
                <Button
                    onClick={() => navigate("/admin/users-list")}
                    variant="get"
                >
                    View All Users
                </Button>
                 <Button
                    onClick={() => navigate("/admin/user-form")}
                    variant="post"
                >
                    CREATE NEW
                </Button>
            </Section>

            <Section title="Visitors And Their Visits">
                <Button
                    onClick={() => navigate("/admin/visitors-list")}
                    variant="get"
                >
                    View All Visitors
                </Button>
            </Section>
        </div>
    );
};
