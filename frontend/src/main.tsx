import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
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
    BadgeForm,
    UserList,
    UserForm,
    VisitorList,
    VisitList,
    VisitorForm,
    VisitForm,
    FindVisitAndCheckout,
    RegisteredVisitor
} from "./pages";
import {
    branchesLoader,
    visitLoader,
    visitFormLoader,
} from "./utils/loaderFunctions"


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
                    <Route path="/admin/badges-list" element={<BadgeList />} />
                    <Route path="/admin/badge-form" element={<BadgeForm />} />
                    <Route path="/admin/users-list" element={<UserList />} />
                    <Route path="/admin/user-form" element={<UserForm />} loader={branchesLoader} />
                    <Route path="/admin/visitors-list" element={<VisitorList />} />
                    <Route path="/admin/visitors/:visitor_id/visits" element={<VisitList />} loader={visitLoader} />
                </Route>

                {/* receptionist section  */}
                <Route element={<RoleProtectedRoute allowedRoles={["receptionist"]} />}>
                    <Route path="/receptionist" element={<ReceptionistDashboard />} />
                    <Route path="/receptionist/visitors-form" element={<VisitorForm />} />
                    <Route path="/receptionist/visits-form" element={<VisitForm />} loader={visitFormLoader} />
                    <Route path="/receptionist/find-visit" element={<FindVisitAndCheckout />} />
                    <Route path="/receptionist/cnic" element={<RegisteredVisitor />} />
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
