import { NavLink } from "react-router-dom";

const links = [
  { to: "/productos", label: "Productos" },
  { to: "/categorias", label: "Categorías" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/blogs", label: "Blogs" },
  { to: "/contacto", label: "Contacto" },
];

function navLinkClass({ isActive }) {
  return `nav-link${isActive ? " active" : ""}`;
}

export default function StoreNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-lg-4">
        <NavLink className="navbar-brand store-brand" to="/">
          SAKE D. BINKS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#store-navbar"
          aria-controls="store-navbar"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="store-navbar">
          <div className="navbar-nav me-auto">
            {links.map(({ to, label }) => (
              <NavLink className={navLinkClass} key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="navbar-nav">
            <NavLink className={navLinkClass} to="/login">Iniciar sesión</NavLink>
            <NavLink className={navLinkClass} to="/registro">Registro</NavLink>
            <NavLink className={navLinkClass} to="/carrito">Cesta (0)</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
