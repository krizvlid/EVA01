import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  let session = null;
  try {
    session = JSON.parse(localStorage.getItem("sake_sesion") || "null");
  } catch {
    session = null;
  }

  if (!session?.logueado) {
    return <Navigate to="/tienda/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
