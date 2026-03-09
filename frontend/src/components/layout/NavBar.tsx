import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { Toaster } from "react-hot-toast";

export const NavBar = () => {
    const { isAuthenticated, userLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await userLogout();
        navigate("/");
    };

    return (
        <>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    duration: 3000,
                    className:
                        "bg-gray-900 text-white text-xl px-8 py-8 rounded-xl shadow-xl",
                }}
            />
            <nav className="nav-wrapper">
                {/* Logo / Home Link */}
                <div className="nav-logo">Visitor Tracking</div>

                <div>
                    {isAuthenticated ? (
                        <Button
                            onClick={handleLogout}
                            variant="logout"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
                            variant="login"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="min-h-[calc(100-3.5rem)] bg-gray-50">
                <Outlet />
            </main>
        </>
    );
};
