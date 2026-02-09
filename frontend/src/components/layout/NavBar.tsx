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
            <nav>
                <div onClick={() => navigate("/")}>Home</div>
                <div>
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <button onClick={() => navigate("/login")}>
                            Login
                        </button>
                    )}
                </div>
            </nav>
            <Outlet />
            <div>Footer</div>
        </>
    );
};
