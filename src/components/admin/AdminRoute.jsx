import { Navigate, Outlet, useLocation } from "react-router-dom";

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("sake_sesion") || "null");
  } catch {
    return null;
  }
}

export default function AdminRoute() {
  const location = useLocation();
  const session = readSession();
  const role = String(session?.rol ?? session?.role ?? "").toLowerCase();

  if (!session?.logueado) {
    return <Navigate to="/tienda/login" replace state={{ from: location.pathname }} />;
  }
  if (!["admin", "administrador"].includes(role)) return <Navigate to="/" replace />;
  return <Outlet />;
}
