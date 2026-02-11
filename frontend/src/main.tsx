import { createRoot } from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {
    NavBar,
    ProtectedRoute,
    RoleProtectedRoute,
} from "./components";
import { 
    AdminDashboard, 
    Dashboard, Login, 
    NotFound, 
    OfficerDashboard, 
    ReceptionistDashboard,  
    BranchForm,
    BranchList,
    BadgeList, 
    BadgeForm
} from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { getBranches } from "./api/branch.api";
import { getBadges } from "./api/badge.api";



//loader functions
export const branchesLoader = async () => {
    const branches = await getBranches();
    return { branches };
};

export const badgesLoader = async () => {
    const badges = await getBadges();
    return { badges };
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<NavBar />}>
            {/* public route */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />

            {/* protected route */}
            <Route element={<ProtectedRoute />}>
                {/* admin section */}
                <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/branches-list" element={<BranchList />} loader={branchesLoader} />
                    <Route path="/admin/branch-form" element={<BranchForm />} />
                    <Route path="/admin/badges-list" element={<BadgeList />} loader={badgesLoader} />
                    <Route path="/admin/badge-form" element={<BadgeForm />} />
                </Route>

                {/* receptionist section  */}
                <Route element={<RoleProtectedRoute allowedRoles={["receptionist"]} />}>
                    <Route path="/receptionist" element={<ReceptionistDashboard />} />
                </Route>

                {/* branch officer section */}
                <Route element={<RoleProtectedRoute allowedRoles={["branch_officer"]} />}>
                    <Route path="/officer" element={<OfficerDashboard />} />
                </Route>
                
            </Route>

            {/* error  */}
            <Route path="*" element={<NotFound/>} />
        </Route>,
    ),
);

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>,
);
