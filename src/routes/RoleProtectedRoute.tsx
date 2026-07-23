import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRole: string;
}

export default function RoleProtectedRoute({
  allowedRole,
}: Props) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}