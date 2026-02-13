import { useNavigate } from "react-router-dom";

export const ReceptionistDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="p-8 flex flex-col gap-8 max-w-2xl">
            <h1 className="text-xl font-bold border-b pb-2">Receptionist Dashboard</h1>

            <section className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-gray-600 uppercase">Visitors</h2>
                <div className="flex gap-4">
                    {/* <button 
                        className="bg-blue-600 text-white px-4 py-2 text-sm font-bold rounded-sm"
                        onClick={() => navigate("/admin/branches-list")}
                    >
                        VIEW ALL LISTS
                    </button> */}
                    <button 
                        className="border border-blue-600 text-blue-600 px-4 py-2 text-sm font-bold rounded-sm"
                        onClick={() => navigate("/receptionist/visitors-form")}
                    >
                        CREATE NEW
                    </button>
                </div>
            </section>

        </div>
    );
}