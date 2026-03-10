import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { roleToPath } from "../../utils/roleToPath";
import { Dashboard } from "../../pages";


export const RootRedirect = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return <Navigate to={roleToPath[user.user_role]} replace />;

    return <Dashboard />;
};