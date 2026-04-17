import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  // safer fallback (prevents role bug)
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;