import { useNavigate } from "react-router-dom";
import { Button, Section } from "../../components";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Admin Dashboard</h1>

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

            <Section title="Document Types">
                <Button
                    onClick={() => navigate("/admin/document-types-list")}
                    variant="get"
                >
                    View All Document Types
                </Button>
                 <Button
                    onClick={() => navigate("/admin/document-type-form")}
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
                 <Button
                    onClick={() => navigate("/admin/reset-password")}
                    variant="put"
                >
                    CHANGE PASSWORD
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
