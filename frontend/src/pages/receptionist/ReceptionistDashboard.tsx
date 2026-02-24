import { useNavigate } from "react-router-dom";
import { Section, Button } from "../../components";

export const ReceptionistDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="p-8 flex flex-col gap-8 max-w-2xl">
            <h1 className="text-xl font-bold border-b pb-2">Receptionist Dashboard</h1>

            <Section title="Visitors">
                <Button
                    onClick={() => navigate("/receptionist/visitors-form")}
                    variant="post"
                >
                    Create New Visit
                </Button>
                 <Button
                    onClick={() => navigate("/receptionist/find-visit")}
                    variant="find"
                >
                    Find Visit
                </Button>
                <Button
                    onClick={() => navigate("/receptionist/cnic")}
                    variant="find"
                >
                    Find Visitor By Cnic
                </Button>
            </Section>

        </div>
    );
}