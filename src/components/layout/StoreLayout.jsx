import { Outlet } from "react-router-dom";
import StoreNavbar from "./StoreNavbar.jsx";
import { useLocation } from "react-router-dom";

export default function StoreLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isLogin = pathname === "/tienda/login";
  const isCustomerProfile = pathname.startsWith("/tienda/perfil");

  return (
    <div className={`store-layout${isHome ? " store-layout--home" : ""}`}>
      {!isLogin && !isCustomerProfile && <StoreNavbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
