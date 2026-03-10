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
    RootRedirect,
} from "./components";
import {
    AdminDashboard, 
    Login,
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
    VisitorDocuments,
    VisitorForm,
    VisitForm,
    FindVisitAndCheckout,
    RegisteredVisitor,
    DocumentTypeForm,
    DocumentTypesList,
    PasswordResetForm
} from "./pages";
import {
    branchesLoader,
    visitLoader,
    visitFormLoader,
    documentTypesLoader,
    visitorDocumentsLoader,
} from "./utils/loaderFunctions"


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<NavBar />}>
            {/* public route */}
            <Route path="/" element={<RootRedirect />} />
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
                    <Route path="/admin/document-types-list" element={<DocumentTypesList />} loader={documentTypesLoader} />
                    <Route path="/admin/document-type-form" element={<DocumentTypeForm />} />
                    <Route path="/admin/users-list" element={<UserList />} />
                    <Route path="/admin/user-form" element={<UserForm />} loader={branchesLoader} />
                    <Route path="/admin/reset-password" element={<PasswordResetForm />} />
                    <Route path="/admin/visitors-list" element={<VisitorList />} />
                    <Route path="/admin/visitors/:visitor_id/visits" element={<VisitList />} loader={visitLoader} />
                    <Route path="/admin/visitors/:visitor_id/documents" element={<VisitorDocuments />} loader={visitorDocumentsLoader} />
                </Route>

                {/* receptionist section  */}
                <Route element={<RoleProtectedRoute allowedRoles={["receptionist"]} />}>
                    <Route path="/receptionist" element={<ReceptionistDashboard />} />
                    <Route path="/receptionist/visitors-form" element={<VisitorForm />} />
                    <Route path="/receptionist/visits-form/:visitor_id" element={<VisitForm />} loader={visitFormLoader} />
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
