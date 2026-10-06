import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

const links = [
  { to: "/tienda/productos", label: "Productos" },
  { to: "/tienda/categorias", label: "Categorías" },
  { to: "/tienda/ofertas", label: "Ofertas" },
  { to: "/tienda/productos?categoria=mujer", label: "Mujer" },
  { to: "/tienda/productos?categoria=hombre", label: "Hombre" },
  { to: "/tienda/productos?categoria=ninos", label: "Niños" },
  { to: "/tienda/productos?categoria=accesorios", label: "Accesorios" },
  { to: "/tienda/nosotros", label: "Nosotros" },
  { to: "/tienda/blogs", label: "Blogs" },
  { to: "/tienda/contacto", label: "Contacto" },
];

export default function StoreNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();

  return (
    <header className="store-header">
      <NavLink className="store-logo" to="/" onClick={() => setMenuOpen(false)}>SAKE D. BINKS</NavLink>
      <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span />
      </button>
      <div className={`store-header__content${menuOpen ? " is-open" : ""}`}>
        <nav className="store-nav" aria-label="Navegación principal">
          {links.map(({ to, label }) => (
            <NavLink
              className={({ isActive }) => {
                const selectedCategory = new URLSearchParams(location.search).get("categoria");
                const categoryLink = to.match(/\?categoria=(.+)$/)?.[1];
                const selected = categoryLink ? selectedCategory === categoryLink : to !== "/tienda/productos" || !selectedCategory;
                return `store-nav__link${isActive && selected ? " active" : ""}`;
              }}
              key={label}
              to={to}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <nav className="store-account" aria-label="Cuenta">
          <NavLink to="/tienda/login" onClick={() => setMenuOpen(false)}>Iniciar sesión</NavLink>
          <NavLink to="/tienda/registro" onClick={() => setMenuOpen(false)}>Registro</NavLink>
          <NavLink to="/tienda/productos">Buscar</NavLink>
          <NavLink to="/carrito">Cesta ({count})</NavLink>
        </nav>
      </div>
    </header>
  );
}
