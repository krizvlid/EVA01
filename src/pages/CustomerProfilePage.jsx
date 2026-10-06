import { useMemo, useState } from "react";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../components/admin/admin.css";
import { formatPrice, imageUrl, listRecords, useStoreData } from "../data/storefrontData.js";

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("sake_sesion") || "null");
  } catch {
    return null;
  }
}

export default function CustomerProfilePage() {
  useStoreData();
  const [session, setSession] = useState(readSession);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeView = pathname.endsWith("/datos") ? "datos" : pathname.endsWith("/compras") ? "compras" : "dashboard";
  const role = String(session?.rol ?? session?.role ?? "").toLowerCase();
  const orders = useMemo(() => {
    if (!session) return [];
    const email = String(session.email ?? session.correo ?? "").toLowerCase();
    return listRecords("ordenes")
      .filter((order) => String(order.correo ?? "").toLowerCase() === email)
      .reverse();
  }, [session]);
  const totalSpent = orders.reduce((total, order) => total + Number(order.total || 0), 0);

  if (!session?.logueado) return <Navigate to="/tienda/login" replace />;
  if (["admin", "administrador"].includes(role)) return <Navigate to="/admin/perfil" replace />;

  function saveProfile(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const updated = {
      ...session,
      nombre: String(form.get("nombre") || "").trim(),
      email,
      correo: email,
      direccion: String(form.get("direccion") || "").trim(),
      region: String(form.get("region") || "").trim(),
      comuna: String(form.get("comuna") || "").trim(),
    };

    try {
      localStorage.setItem("sake_sesion", JSON.stringify(updated));
      localStorage.setItem("usuario_actual", JSON.stringify(updated));
      localStorage.setItem("usuarioCorreo", email);
      setSession(updated);
      setError("");
      setSuccess("Tus datos se guardaron en este navegador.");
    } catch (saveError) {
      setSuccess("");
      setError(saveError instanceof Error ? saveError.message : "No se pudieron guardar tus datos.");
    }
  }

  const email = session.email ?? session.correo ?? "";
  let savedCards = [];
  try {
    const parsedCards = JSON.parse(localStorage.getItem(`sake_tarjetas_${session.id || email}`) || "[]");
    if (Array.isArray(parsedCards)) savedCards = parsedCards;
  } catch {
    savedCards = [];
  }

  function signOut() {
    localStorage.removeItem("sake_sesion");
    localStorage.removeItem("usuario_actual");
    localStorage.removeItem("usuarioCorreo");
    setSession(null);
    navigate("/tienda/login", { replace: true });
  }

  const pageContent = activeView === "datos"
    ? <>
      <div className="admin-page-heading"><div><h1>Mi perfil</h1><p>Actualiza tus datos personales.</p></div></div>
      <section className="admin-card">
        <form className="admin-form customer-dashboard__form" onSubmit={saveProfile}>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="status">{success}</div>}
          <div className="mb-3"><label className="form-label" htmlFor="customer-name">Nombre</label><input className="form-control" id="customer-name" name="nombre" defaultValue={session.nombre ?? ""} maxLength="120" required /></div>
          <div className="mb-3"><label className="form-label" htmlFor="customer-email">Correo</label><input className="form-control" id="customer-email" name="email" type="email" defaultValue={email} maxLength="100" required /></div>
          <div className="mb-3"><label className="form-label" htmlFor="customer-address">Dirección</label><input className="form-control" id="customer-address" name="direccion" defaultValue={session.direccion ?? ""} maxLength="200" /></div>
          <div className="row">
            <div className="col-md-6 mb-3"><label className="form-label" htmlFor="customer-city">Comuna</label><input className="form-control" id="customer-city" name="comuna" defaultValue={session.comuna ?? ""} maxLength="100" /></div>
            <div className="col-md-6 mb-3"><label className="form-label" htmlFor="customer-region">Región</label><input className="form-control" id="customer-region" name="region" defaultValue={session.region ?? ""} maxLength="100" /></div>
          </div>
          <div className="mb-4"><span className="form-label d-block">Tarjetas</span><span className="text-secondary">{savedCards.length ? savedCards.map((card, index) => <span key={`${card}-${index}`}>Terminada en ···· {String(card).slice(-4)}{index < savedCards.length - 1 ? " · " : ""}</span>) : "No hay tarjetas guardadas"}</span></div>
          <button className="btn btn-dark" type="submit">Guardar cambios</button>
        </form>
      </section>
    </>
    : activeView === "compras"
      ? <>
        <div className="admin-page-heading"><div><h1>Mis compras</h1><p>Historial de pedidos asociados a tu cuenta.</p></div></div>
        <section className="admin-card">
          {orders.length === 0 ? <div className="admin-empty">Aún no tienes compras registradas.</div> : (
            <div className="customer-profile__table-wrap">
              <table className="table admin-table">
                <thead><tr><th>N° pedido</th><th>Productos</th><th>Dirección</th><th>Total</th><th>Estado</th></tr></thead>
                <tbody>{orders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>#{order.numero || order.id}</strong><div className="small text-secondary">{order.creadoEn ? new Date(order.creadoEn).toLocaleDateString("es-CL") : ""}</div></td>
                    <td><div className="customer-profile__products">{(order.items || []).map((item, index) => (
                      <div className="customer-profile__product" key={`${item.id}-${index}`}>
                        {item.image && <img src={imageUrl(item.image)} alt="" />}
                        <span>{item.name || item.nombre}<small>Cant: {item.quantity || item.cantidad || 1}</small></span>
                      </div>
                    ))}</div></td>
                    <td>{order.direccion || "No registrada"}</td>
                    <td>{formatPrice(Number(order.total || 0))}</td>
                    <td><span className="admin-status">{String(order.estado || "Pendiente").replace(/_/g, " ")}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>
      </>
      : <>
        <div className="admin-page-heading"><div><h1>Dashboard</h1><p>Resumen de tu cuenta y actividad.</p></div></div>
        <div className="row g-3">
          <div className="col-6 col-xl-4"><div className="admin-stat"><span>Compras realizadas</span><strong>{orders.length}</strong></div></div>
          <div className="col-6 col-xl-4"><div className="admin-stat"><span>Total de compras</span><strong>{formatPrice(totalSpent)}</strong></div></div>
          <div className="col-12 col-xl-4"><div className="admin-stat"><span>Cuenta</span><strong className="customer-dashboard__account">{email}</strong></div></div>
        </div>
      </>;

  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <Link className="admin-brand" to="/">
        <span className="admin-brand__mark">S</span>
        <span>SAKE D. BINKS<small>Mi cuenta</small></span>
      </Link>
      <nav className="admin-nav" aria-label="Mi cuenta">
        <NavLink className={({ isActive }) => `admin-nav__link${isActive ? " is-active" : ""}`} to="/tienda/perfil" end><span aria-hidden="true">⌂</span>Dashboard</NavLink>
        <NavLink className={({ isActive }) => `admin-nav__link${isActive ? " is-active" : ""}`} to="/tienda/perfil/datos"><span aria-hidden="true">◎</span>Mi perfil</NavLink>
        <NavLink className={({ isActive }) => `admin-nav__link${isActive ? " is-active" : ""}`} to="/tienda/perfil/compras"><span aria-hidden="true">▤</span>Mis compras</NavLink>
        <Link className="admin-nav__link" to="/carrito"><span aria-hidden="true">◇</span>Mi cesta</Link>
      </nav>
      <button className="admin-signout" type="button" onClick={signOut}>↩ Cerrar sesión</button>
    </aside>
    <div className="admin-workspace">
      <header className="admin-topbar">
        <div><span className="admin-topbar__eyebrow">Mi cuenta</span><strong>Hola, {session.nombre || "Usuario"}</strong></div>
        <Link className="btn btn-outline-dark btn-sm" to="/">Ver tienda</Link>
      </header>
      <main className="admin-content customer-dashboard">{pageContent}</main>
    </div>
  </div>;
}
