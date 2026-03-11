import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserRoles } from "../../types";
import { roleToPath } from "../../utils/roleToPath";

interface RoleProtectedRouteProps {
  allowedRoles:  UserRoles[];
}

export const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const auth = useAuth();

  const { user, isLoading } = auth;

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // if user trying to access some other role's page - redirect it to its own dashboard or main route
  if (!allowedRoles.includes(user.user_role)) {
    return <Navigate to={roleToPath[user.user_role]} replace />;
  }

  return <Outlet />;
};
