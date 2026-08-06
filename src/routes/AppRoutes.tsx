import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";

import AdminLayout from "../layouts/AdminLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";

import Dashboard from "../components/admin/Dashboard";
import CabinManagement from "../components/admin/CabinManagement";
import PendingBookings from "../components/admin/PendingBookings";
import BookingHistory from "../components/admin/BookingHistory";
import UserManagement from "../components/admin/UserManagement";

import EmployeeDashboard from "../components/employee/Dashboard";
import CabinList from "../components/employee/CabinList";
import MyBookings from "../components/employee/MyBookings";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import LandingPage from "../pages/LandingPage";

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Routes>
      {/* Root */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate
              to={user.role === "ADMIN" ? "/admin/dashboard" : "/employee/dashboard"}
              replace
            />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Public */}
      <Route path="/login" element={<Login />} />
    
      <Route path="/change-password" element={<ChangePassword />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        {/* ---------------- ADMIN ---------------- */}
        <Route element={<RoleProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cabins" element={<CabinManagement />} />
            <Route path="pending" element={<PendingBookings />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="history" element={<BookingHistory />} />
          </Route>
        </Route>

        {/* ---------------- EMPLOYEE ---------------- */}
        <Route element={<RoleProtectedRoute allowedRole="EMPLOYEE" />}>
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="cabins" element={<CabinList />} />
            <Route path="bookings" element={<MyBookings />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}