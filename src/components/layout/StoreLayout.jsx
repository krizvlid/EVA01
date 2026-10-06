import { Outlet } from "react-router-dom";
import StoreNavbar from "./StoreNavbar.jsx";

export default function StoreLayout() {
  return (
    <>
      <StoreNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
