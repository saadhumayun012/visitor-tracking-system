import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export const NavBar = () => {
    const { isAuthenticated, userLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await userLogout();
        navigate("/login");
    };

    return (
        <>
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
