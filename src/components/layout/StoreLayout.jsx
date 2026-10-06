import { Outlet } from "react-router-dom";
import StoreNavbar from "./StoreNavbar.jsx";
import { useLocation } from "react-router-dom";

export default function StoreLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={`store-layout${isHome ? " store-layout--home" : ""}`}>
      <StoreNavbar />
      <main>
        <Outlet />
      </main>
      {!isHome && <footer className="store-footer">SAKE D. BINKS <span>Moda con intención.</span></footer>}
    </div>
  );
}
