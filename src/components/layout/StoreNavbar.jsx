import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

const collectionLinks = [
  { path: "/tienda/categoria/mujer", label: "MUJER" },
  { path: "/tienda/categoria/hombre", label: "HOMBRE" },
  { path: "/tienda/categoria/ninos", label: "NIÑOS" },
  { path: "/tienda/categoria/accesorios", label: "ACCESORIOS" },
];

export default function StoreNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(() => readSession());
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();
  const isHome = pathname === "/";
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    function syncSession(event) {
      if (event.key && event.key !== "sake_sesion") return;
      setSession(readSession());
    }
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  function signOut() {
    localStorage.removeItem("sake_sesion");
    localStorage.removeItem("usuario_actual");
    localStorage.removeItem("usuarioCorreo");
    setSession(null);
    closeMenu();
    navigate("/", { replace: true });
  }

  return (
    <header className={`store-navbar${isHome ? " store-navbar--home" : ""}`}>
      <Link className="store-navbar__logo" to="/" onClick={closeMenu}>SAKE D. BINKS</Link>
      <button
        className="store-navbar__toggle"
        type="button"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span /><span />
      </button>
      <nav className={`store-navbar__links${menuOpen ? " is-open" : ""}`} aria-label="Navegación principal">
        <Link to="/tienda/productos" onClick={closeMenu}>Productos</Link>
        <div className="dropdown store-navbar__dropdown">
          <button className="store-navbar__link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
          </button>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/tienda/categorias" onClick={closeMenu}>Todas las categorías</Link></li>
            {collectionLinks.map(({ path, label }) => (
              <li key={path}><Link className="dropdown-item" to={path} onClick={closeMenu}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <Link to="/tienda/ofertas" onClick={closeMenu}>Ofertas</Link>
        <Link to="/tienda/nosotros" onClick={closeMenu}>Nosotros</Link>
        <Link to="/tienda/blogs" onClick={closeMenu}>Blogs</Link>
        <Link to="/tienda/contacto" onClick={closeMenu}>Contacto</Link>
        <div className="store-navbar__account">
          {session?.logueado ? (
            <>
              <Link
                className="store-navbar__user"
                to={["admin", "administrador"].includes(String(session.rol ?? session.role ?? "").toLowerCase()) ? "/admin/perfil" : "/tienda/perfil"}
                onClick={closeMenu}
              >
                Hola, {session.nombre || session.email || "Usuario"}
              </Link>
              <button className="store-navbar__account-action" type="button" onClick={signOut}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/tienda/login" onClick={closeMenu}>Iniciar sesión</Link>
              <Link to="/tienda/registro" onClick={closeMenu}>Registro</Link>
            </>
          )}
          <Link to="/carrito" onClick={closeMenu}>Cesta ({count})</Link>
        </div>
      </nav>
    </header>
  );
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("sake_sesion") || "null");
  } catch {
    return null;
  }
}
