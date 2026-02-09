import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { ProtectedRoute, RoleProtectedRoute } from "./components/index";

import { Login, Dashboard, AdminDashboard, ReceptionistDashboard, OfficerDashboard, NotFound } from "./pages/index";
import { NavBar } from "./components/layout/NavBar";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<NavBar />}>
            {/* Public routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                {/* admin section */}
                <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
                {/* receptionist section */}
                <Route element={<RoleProtectedRoute allowedRoles={["receptionist"]} />}>
                  <Route path="/receptionist" element={<ReceptionistDashboard />} />
                </Route>
                {/* branch_officer section */}
                <Route element={<RoleProtectedRoute allowedRoles={["branch_officer"]} />}>
                  <Route path="/officer" element={<OfficerDashboard />} />
                </Route>
              </Route>

          </Route>
            {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;