import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";

const navigation = [
  { label: "Dashboard", to: "/admin", end: true, icon: "⌂" },
  { label: "Órdenes / Boletas", to: "/admin/ordenes", icon: "▤" },
  { label: "Productos", to: "/admin/productos", icon: "◇" },
  { label: "Categorías", to: "/admin/categorias", icon: "▦" },
  { label: "Usuarios", to: "/admin/usuarios", icon: "♙" },
  { label: "Reportes", to: "/admin/reportes", icon: "▥" },
  { label: "Perfil", to: "/admin/perfil", icon: "◎" },
];

function readAdminName() {
  try {
    return JSON.parse(localStorage.getItem("sake_sesion") || "null")?.nombre || "Administrador";
  } catch {
    return "Administrador";
  }
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const adminName = readAdminName();

  function signOut() {
    localStorage.removeItem("sake_sesion");
    localStorage.removeItem("usuario_actual");
    localStorage.removeItem("usuarioCorreo");
    navigate("/tienda/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink className="admin-brand" to="/admin">
          <span className="admin-brand__mark">S</span>
          <span>SAKE D. BINKS<small>Administración</small></span>
        </NavLink>
        <nav className="admin-nav" aria-label="Administración">
          {navigation.map(({ label, to, end, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `admin-nav__link${isActive ? " is-active" : ""}`}
            >
              <span aria-hidden="true">{icon}</span>{label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-signout" type="button" onClick={signOut}>↩ Cerrar sesión</button>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div><span className="admin-topbar__eyebrow">Panel de administración</span><strong>Hola, {adminName}</strong></div>
          <NavLink className="btn btn-outline-dark btn-sm" to="/">Ver tienda</NavLink>
        </header>
        <main className="admin-content"><Outlet /></main>
      </div>
    </div>
  );
}
