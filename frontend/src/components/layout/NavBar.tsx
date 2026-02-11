import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
                <div className="nav-logo">
                    Visitor Tracking
                </div>

                <div>
                    {isAuthenticated ? (
                        <button
                            className="nav-link-btn btn-logout"
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <button
                            className="nav-link-btn btn-login"
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </button>
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
