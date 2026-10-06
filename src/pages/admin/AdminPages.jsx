import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  categories,
  createRecord,
  deleteRecord,
  formatPrice,
  getRecord,
  listRecords,
  products,
  updateRecord,
  useStoreData,
} from "../../data/storefrontData.js";

const lowStockLimit = 5;

function PageHeading({ title, description, children }) {
  return (
    <div className="admin-page-heading">
      <div><h1>{title}</h1>{description && <p>{description}</p>}</div>
      {children && <div className="admin-action-row">{children}</div>}
    </div>
  );
}

function Notice({ error, success }) {
  if (!error && !success) return null;
  return <div className={`alert ${error ? "alert-danger" : "alert-success"}`} role={error ? "alert" : "status"}>{error || success}</div>;
}

function Stat({ label, value, detail }) {
  return <div className="admin-stat"><span>{label}</span><strong>{value}</strong>{detail && <small className="text-secondary">{detail}</small>}</div>;
}

function EmptyTable({ children = "No hay registros para mostrar." }) {
  return <div className="admin-empty">{children}</div>;
}

function productCategoryName(product) {
  return categories.find((category) => category.id === product.category)?.name ?? "Sin categoría";
}

function ProductTable({ records, onDelete }) {
  if (records.length === 0) return <div className="admin-card"><EmptyTable>No hay productos que coincidan.</EmptyTable></div>;
  return (
    <div className="admin-table-wrap">
      <table className="table admin-table">
        <thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>{records.map((product) => (
          <tr key={product.id}>
            <td><strong>{product.name}</strong><div className="small text-secondary">{product.id}</div></td>
            <td>{productCategoryName(product)}</td>
            <td>{formatPrice(product.price)}</td>
            <td><span className={`admin-status${product.stock <= lowStockLimit ? " admin-status--low" : ""}`}>{product.stock}</span></td>
            <td>{product.estado || "Activo"}</td>
            <td><div className="admin-action-row">
              <Link className="btn btn-sm btn-outline-dark" to={`/admin/productos/${product.id}/editar`}>Editar</Link>
              <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => onDelete?.(product)}>Eliminar</button>
            </div></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export function AdminDashboardPage() {
  useStoreData();
  const orders = listRecords("ordenes");
  const users = listRecords("usuarios");
  const sales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  return <>
    <PageHeading title="Dashboard" description="Resumen general de la tienda." />
    <div className="row g-3 mb-4">
      <div className="col-6 col-xl-3"><Stat label="Productos" value={products.length} /></div>
      <div className="col-6 col-xl-3"><Stat label="Órdenes" value={orders.length} /></div>
      <div className="col-6 col-xl-3"><Stat label="Usuarios" value={users.length} /></div>
      <div className="col-6 col-xl-3"><Stat label="Ventas registradas" value={formatPrice(sales)} /></div>
    </div>
    <div className="admin-card">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-3"><h2 className="h5 mb-0">Órdenes recientes</h2><Link to="/admin/ordenes">Ver todas</Link></div>
      <OrderTable orders={[...orders].reverse().slice(0, 5)} />
    </div>
  </>;
}

function OrderTable({ orders }) {
  if (orders.length === 0) return <EmptyTable>Aún no hay órdenes registradas.</EmptyTable>;
  return <div className="table-responsive"><table className="table admin-table">
    <thead><tr><th>N° de orden</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Total</th><th>Boleta</th></tr></thead>
    <tbody>{orders.map((order) => <tr key={order.id}>
      <td>{order.numero || order.id}</td><td>{order.nombre || order.correo}</td>
      <td>{order.creadoEn ? new Date(order.creadoEn).toLocaleDateString("es-CL") : "—"}</td>
      <td><span className="admin-status">{order.estado || "Pendiente"}</span></td>
      <td>{formatPrice(Number(order.total || 0))}</td>
      <td><Link className="btn btn-sm btn-outline-dark" to={`/admin/ordenes/${order.id}/boleta`}>Ver boleta</Link></td>
    </tr>)}</tbody>
  </table></div>;
}

export function OrdersPage() {
  useStoreData();
  const orders = listRecords("ordenes");
  return <><PageHeading title="Órdenes / Boletas" description="Pedidos recibidos y sus comprobantes." /><div className="admin-card"><OrderTable orders={[...orders].reverse()} /></div></>;
}

export function ReceiptPage() {
  useStoreData();
  const { id } = useParams();
  const order = getRecord("ordenes", id);
  if (!order) return <><PageHeading title="Boleta" /><div className="admin-card"><EmptyTable>No se encontró la orden solicitada.</EmptyTable><Link to="/admin/ordenes">Volver a órdenes</Link></div></>;
  return <>
    <PageHeading title="Boleta" description={`Orden ${order.numero || order.id}`}><Link className="btn btn-outline-dark" to="/admin/ordenes">Volver a órdenes</Link></PageHeading>
    <section className="admin-card admin-receipt">
      <div className="admin-receipt__brand">SAKE D. BINKS <span className="float-end fw-normal">BOLETA</span></div>
      <dl className="row mt-4">
        <dt className="col-sm-4">N° de orden</dt><dd className="col-sm-8">{order.numero || order.id}</dd>
        <dt className="col-sm-4">Cliente</dt><dd className="col-sm-8">{order.nombre || "—"} · {order.correo || "—"}</dd>
        <dt className="col-sm-4">Dirección</dt><dd className="col-sm-8">{order.direccion || "—"}</dd>
        <dt className="col-sm-4">Estado</dt><dd className="col-sm-8">{order.estado || "Pendiente"}</dd>
        <dt className="col-sm-4">Fecha</dt><dd className="col-sm-8">{order.creadoEn ? new Date(order.creadoEn).toLocaleString("es-CL") : "—"}</dd>
      </dl>
      <div className="table-responsive"><table className="table">
        <thead><tr><th>Artículo</th><th>Talla</th><th>Cantidad</th><th>Precio</th></tr></thead>
        <tbody>{(order.items || []).map((item, index) => <tr key={`${item.id}-${index}`}>
          <td>{item.name || item.nombre}</td><td>{item.size || item.talla || "Única"}</td>
          <td>{item.quantity || item.cantidad || 1}</td><td>{formatPrice(Number(item.price ?? item.precio ?? 0))}</td>
        </tr>)}</tbody>
        <tfoot><tr><th colSpan="3">Total</th><th>{formatPrice(Number(order.total || 0))}</th></tr></tfoot>
      </table></div>
      {order.tarjetaUltimos4 && <p className="small text-secondary mb-0">Tarjeta terminada en ···· {order.tarjetaUltimos4}</p>}
    </section>
  </>;
}

export function ProductsAdminPage() {
  useStoreData();
  const [error, setError] = useState("");

  function removeProduct(product) {
    if (!window.confirm(`¿Eliminar "${product.name}"?`)) return;
    try {
      deleteRecord("productos", product.id);
      setError("");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "No se pudo eliminar el producto.");
    }
  }

  return <>
    <PageHeading title="Productos" description="Administra el catálogo que aparece en la tienda.">
      <Link className="btn btn-outline-dark" to="/admin/productos/criticos">Stock crítico</Link>
      <Link className="btn btn-outline-dark" to="/admin/productos/reportes">Reportes</Link>
      <Link className="btn btn-dark" to="/admin/productos/nuevo">Nuevo producto</Link>
    </PageHeading>
    <Notice error={error} />
    <ProductTable records={products} onDelete={removeProduct} />
  </>;
}

export function ProductFormPage() {
  useStoreData();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getRecord("productos", id) : null;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(id);

  function saveProduct(event) {
    event.preventDefault();
    setError("");
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const image = String(form.get("image") || "").trim();
    const record = {
      name,
      stockName: name.toUpperCase(),
      category: String(form.get("category")),
      price: Number(form.get("price")),
      stock: Number(form.get("stock")),
      estado: String(form.get("estado")),
      image,
      thumbImage: image,
      images: [image],
      catalogImages: [image],
      catalogName: name,
      adminCreated: product?.adminCreated ?? !isEditing,
    };
    try {
      if (isEditing && !product) throw new Error("No se encontró el producto que quieres editar.");
      if (isEditing) updateRecord("productos", id, record);
      else createRecord("productos", record);
      navigate("/admin/productos");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo guardar el producto.");
      setSaving(false);
    }
  }

  if (isEditing && !product) return <><PageHeading title="Editar producto" /><div className="admin-card"><EmptyTable>No se encontró el producto.</EmptyTable><Link to="/admin/productos">Volver a productos</Link></div></>;
  return <>
    <PageHeading title={isEditing ? "Editar producto" : "Nuevo producto"} description="Los cambios se reflejarán en el catálogo de la tienda." />
    <form className="admin-form" onSubmit={saveProduct}>
      <Notice error={error} />
      <div className="mb-3"><label className="form-label" htmlFor="product-name">Nombre</label><input className="form-control" id="product-name" name="name" defaultValue={product?.name ?? ""} maxLength="120" required /></div>
      <div className="row">
        <div className="col-md-6 mb-3"><label className="form-label" htmlFor="product-category">Categoría</label><select className="form-select" id="product-category" name="category" defaultValue={product?.category ?? categories[0]?.id} required>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label" htmlFor="product-price">Precio (CLP)</label><input className="form-control" id="product-price" name="price" type="number" min="0" step="1" defaultValue={product?.price ?? ""} required /></div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3"><label className="form-label" htmlFor="product-stock">Stock</label><input className="form-control" id="product-stock" name="stock" type="number" min="0" step="1" defaultValue={product?.stock ?? 0} required /></div>
        <div className="col-md-6 mb-3"><label className="form-label" htmlFor="product-state">Estado</label><select className="form-select" id="product-state" name="estado" defaultValue={product?.estado ?? "Activo"}><option>Activo</option><option>Inactivo</option></select></div>
      </div>
      <div className="mb-4"><label className="form-label" htmlFor="product-image">Archivo de imagen (en /Imagenes)</label><input className="form-control" id="product-image" name="image" defaultValue={product?.image ?? ""} placeholder="ejemplo.webp" required /><div className="form-text">Escribe el nombre de una imagen disponible en la carpeta Imagenes.</div></div>
      <div className="admin-action-row"><button className="btn btn-dark" type="submit" disabled={saving}>{saving ? "Guardando…" : "Guardar producto"}</button><Link className="btn btn-outline-secondary" to="/admin/productos">Cancelar</Link></div>
    </form>
  </>;
}

export function CriticalStockPage() {
  useStoreData();
  const critical = products.filter((product) => Number(product.stock) <= lowStockLimit);
  return <>
    <PageHeading title="Productos críticos" description={`Productos con ${lowStockLimit} unidades o menos.`}><Link className="btn btn-outline-dark" to="/admin/productos">Volver a productos</Link></PageHeading>
    <ProductTable records={critical} />
  </>;
}

export function ProductReportsPage() {
  useStoreData();
  const orders = listRecords("ordenes");
  const sold = new Map();
  orders.flatMap((order) => order.items || []).forEach((item) => {
    const id = item.id;
    sold.set(id, (sold.get(id) || 0) + Number(item.quantity || item.cantidad || 0));
  });
  const bestSellers = [...sold.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  return <>
    <PageHeading title="Reportes de productos" description="Inventario y unidades vendidas registradas." />
    <div className="row g-3 mb-4"><div className="col-md-4"><Stat label="Productos activos" value={products.filter((product) => product.estado !== "Inactivo").length} /></div><div className="col-md-4"><Stat label="Unidades en inventario" value={products.reduce((sum, product) => sum + Number(product.stock || 0), 0)} /></div><div className="col-md-4"><Stat label="Productos con stock crítico" value={products.filter((product) => Number(product.stock) <= lowStockLimit).length} /></div></div>
    <section className="admin-card"><h2 className="h5">Más vendidos</h2>{bestSellers.length ? <ol className="mb-0">{bestSellers.map(([id, quantity]) => <li key={id} className="py-1">{products.find((product) => product.id === id)?.name || id} — {quantity} unidades</li>)}</ol> : <EmptyTable>Aún no hay ventas registradas.</EmptyTable>}</section>
  </>;
}

export function CategoriesAdminPage() {
  useStoreData();
  const [error, setError] = useState("");
  function removeCategory(category) {
    if (products.some((product) => product.category === category.id)) {
      setError("No se puede eliminar esta categoría mientras tenga productos asociados.");
      return;
    }
    if (!window.confirm(`¿Eliminar la categoría "${category.name}"?`)) return;
    try {
      deleteRecord("categorias", category.id);
      setError("");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "No se pudo eliminar la categoría.");
    }
  }
  return <>
    <PageHeading title="Categorías" description="Organiza las colecciones visibles en la tienda."><Link className="btn btn-dark" to="/admin/categorias/nueva">Nueva categoría</Link></PageHeading>
    <Notice error={error} />
    <div className="admin-table-wrap"><table className="table admin-table">
      <thead><tr><th>Nombre</th><th>Productos</th><th>Acciones</th></tr></thead>
      <tbody>{categories.map((category) => <tr key={category.id}>
        <td><strong>{category.name}</strong></td><td>{products.filter((product) => product.category === category.id).length}</td>
        <td><div className="admin-action-row"><Link className="btn btn-sm btn-outline-dark" to={`/admin/categorias/${category.id}/editar`}>Editar</Link><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeCategory(category)}>Eliminar</button></div></td>
      </tr>)}</tbody>
    </table></div>
  </>;
}

export function CategoryFormPage() {
  useStoreData();
  const { id } = useParams();
  const navigate = useNavigate();
  const category = id ? getRecord("categorias", id) : null;
  const [error, setError] = useState("");
  function saveCategory(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const image = String(form.get("image") || "").trim();
    const description = String(form.get("description") || "").trim();
    try {
      if (id && !category) throw new Error("No se encontró la categoría.");
      if (id) updateRecord("categorias", id, { name, image, description });
      else createRecord("categorias", { name, image, description });
      navigate("/admin/categorias");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo guardar la categoría.");
    }
  }
  if (id && !category) return <><PageHeading title="Editar categoría" /><div className="admin-card"><EmptyTable>No se encontró la categoría.</EmptyTable></div></>;
  return <>
    <PageHeading title={id ? "Editar categoría" : "Nueva categoría"} />
    <form className="admin-form" onSubmit={saveCategory}>
      <Notice error={error} />
      <div className="mb-3"><label className="form-label" htmlFor="category-name">Nombre</label><input className="form-control" id="category-name" name="name" defaultValue={category?.name ?? ""} required maxLength="80" /></div>
      <div className="mb-3"><label className="form-label" htmlFor="category-image">Archivo de imagen (en /Imagenes)</label><input className="form-control" id="category-image" name="image" defaultValue={category?.image ?? ""} required /></div>
      <div className="mb-4"><label className="form-label" htmlFor="category-description">Descripción</label><textarea className="form-control" id="category-description" name="description" rows="3" defaultValue={category?.description ?? ""} /></div>
      <div className="admin-action-row"><button className="btn btn-dark" type="submit">Guardar categoría</button><Link className="btn btn-outline-secondary" to="/admin/categorias">Cancelar</Link></div>
    </form>
  </>;
}

export function UsersPage() {
  useStoreData();
  const users = listRecords("usuarios");
  return <>
    <PageHeading title="Usuarios" description="Cuentas y permisos registrados."><Link className="btn btn-dark" to="/admin/usuarios/nuevo">Nuevo usuario</Link></PageHeading>
    <div className="admin-table-wrap"><table className="table admin-table">
      <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
      <tbody>{users.map((user) => <tr key={user.id}><td>{user.nombre}</td><td>{user.email}</td><td>{user.rol || "cliente"}</td><td>{user.estado || "Activo"}</td>
        <td><div className="admin-action-row"><Link className="btn btn-sm btn-outline-dark" to={`/admin/usuarios/${user.id}/editar`}>Editar</Link><Link className="btn btn-sm btn-outline-secondary" to={`/admin/usuarios/${user.id}/compras`}>Compras</Link></div></td>
      </tr>)}</tbody>
    </table>{users.length === 0 && <EmptyTable>No hay usuarios guardados en el panel.</EmptyTable>}</div>
  </>;
}

export function UserFormPage() {
  useStoreData();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = id ? getRecord("usuarios", id) : null;
  const [error, setError] = useState("");
  function saveUser(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const record = {
      nombre: String(form.get("nombre") || "").trim(),
      email: String(form.get("email") || "").trim(),
      rol: String(form.get("rol")),
      estado: String(form.get("estado")),
    };
    try {
      if (id && !user) throw new Error("No se encontró el usuario.");
      if (id) updateRecord("usuarios", id, record);
      else createRecord("usuarios", record);
      navigate("/admin/usuarios");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo guardar el usuario.");
    }
  }
  if (id && !user) return <><PageHeading title="Editar usuario" /><div className="admin-card"><EmptyTable>No se encontró el usuario.</EmptyTable></div></>;
  return <>
    <PageHeading title={id ? "Editar usuario" : "Nuevo usuario"} description="La contraseña no se almacena en este panel." />
    <form className="admin-form" onSubmit={saveUser}>
      <Notice error={error} />
      <div className="mb-3"><label className="form-label" htmlFor="user-name">Nombre completo</label><input className="form-control" id="user-name" name="nombre" defaultValue={user?.nombre ?? ""} required /></div>
      <div className="mb-3"><label className="form-label" htmlFor="user-email">Correo</label><input className="form-control" id="user-email" name="email" type="email" defaultValue={user?.email ?? ""} required /></div>
      <div className="row">
        <div className="col-md-6 mb-4"><label className="form-label" htmlFor="user-role">Rol</label><select className="form-select" id="user-role" name="rol" defaultValue={user?.rol ?? "cliente"}><option value="cliente">Cliente</option><option value="admin">Administrador</option></select></div>
        <div className="col-md-6 mb-4"><label className="form-label" htmlFor="user-status">Estado</label><select className="form-select" id="user-status" name="estado" defaultValue={user?.estado ?? "Activo"}><option>Activo</option><option>Inactivo</option></select></div>
      </div>
      <div className="admin-action-row"><button className="btn btn-dark" type="submit">Guardar usuario</button><Link className="btn btn-outline-secondary" to="/admin/usuarios">Cancelar</Link></div>
    </form>
  </>;
}

export function PurchaseHistoryPage() {
  useStoreData();
  const { id } = useParams();
  const user = getRecord("usuarios", id);
  const orders = listRecords("ordenes").filter((order) => order.correo === user?.email);
  if (!user) return <><PageHeading title="Historial de compras" /><div className="admin-card"><EmptyTable>No se encontró el usuario.</EmptyTable></div></>;
  return <>
    <PageHeading title="Historial de compras" description={`${user.nombre} · ${user.email}`}><Link className="btn btn-outline-dark" to="/admin/usuarios">Volver a usuarios</Link></PageHeading>
    <div className="admin-card"><OrderTable orders={orders} /></div>
  </>;
}

export function ReportsPage() {
  useStoreData();
  const orders = listRecords("ordenes");
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const average = orders.length ? revenue / orders.length : 0;
  return <>
    <PageHeading title="Reportes" description="Indicadores a partir de los pedidos guardados en este navegador." />
    <div className="row g-3 mb-4"><div className="col-sm-6 col-xl-3"><Stat label="Ventas" value={formatPrice(revenue)} /></div><div className="col-sm-6 col-xl-3"><Stat label="Órdenes" value={orders.length} /></div><div className="col-sm-6 col-xl-3"><Stat label="Ticket promedio" value={formatPrice(Math.round(average))} /></div><div className="col-sm-6 col-xl-3"><Stat label="Productos" value={products.length} /></div></div>
    <section className="admin-card"><h2 className="h5">Últimas órdenes</h2><OrderTable orders={[...orders].reverse().slice(0, 10)} /></section>
  </>;
}

export function AdminProfilePage() {
  const navigate = useNavigate();
  let session = {};
  try {
    session = JSON.parse(localStorage.getItem("sake_sesion") || "{}");
  } catch {
    session = {};
  }
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  function saveProfile(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const updated = { ...session, nombre: String(form.get("nombre") || "").trim(), email: String(form.get("email") || "").trim(), correo: String(form.get("email") || "").trim() };
    try {
      localStorage.setItem("sake_sesion", JSON.stringify(updated));
      localStorage.setItem("usuario_actual", JSON.stringify(updated));
      localStorage.setItem("usuarioCorreo", updated.email);
      setSuccess("Perfil actualizado.");
      setError("");
      navigate("/admin/perfil", { replace: true });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo guardar el perfil.");
    }
  }
  return <>
    <PageHeading title="Perfil" description="Actualiza los datos de tu cuenta de administrador." />
    <form className="admin-form" onSubmit={saveProfile}>
      <Notice error={error} success={success} />
      <div className="mb-3"><label className="form-label" htmlFor="profile-name">Nombre</label><input className="form-control" id="profile-name" name="nombre" defaultValue={session.nombre ?? ""} required /></div>
      <div className="mb-4"><label className="form-label" htmlFor="profile-email">Correo</label><input className="form-control" id="profile-email" name="email" type="email" defaultValue={session.email ?? session.correo ?? ""} required /></div>
      <button className="btn btn-dark" type="submit">Guardar perfil</button>
    </form>
  </>;
}
