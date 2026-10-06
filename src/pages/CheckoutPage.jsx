import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/cart/CartContext.jsx";
import { reduceCartStock, validateCartStock } from "../components/cart/CartContext.jsx";
import { formatPrice, imageUrl } from "../data/storefrontData.js";
import { createRecord } from "../data/mockStore.js";

const regions = [
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso",
  "Metropolitana de Santiago", "Libertador General Bernardo O'Higgins", "Maule", "Ñuble",
  "Biobío", "La Araucanía", "Los Ríos", "Los Lagos", "Aysén del General Carlos Ibáñez del Campo",
  "Magallanes y de la Antártica Chilena",
];

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("sake_sesion") || "null");
  } catch {
    return null;
  }
}

function readSavedAddress(key) {
  const stored = localStorage.getItem(key);
  if (stored === null) return {};
  try {
    const saved = JSON.parse(stored);
    if (typeof saved === "string") return { direccion: saved, region: "", comuna: "" };
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return { direccion: stored };
  }
}

function saveOrder(order) {
  localStorage.setItem("sake_ultima_orden", JSON.stringify(order));
  createRecord("ordenes", {
    id: order.numero,
    numero: order.numero,
    nombre: order.nombre,
    correo: order.correo,
    direccion: order.direccion,
    estado: order.estado,
    total: order.total,
    items: order.items,
    tarjetaUltimos4: order.tarjetaUltimos4,
    creadoEn: new Date().toISOString(),
  });
}

export default function CheckoutPage() {
  const { cart, total, storageError, clearCart } = useCart();
  const navigate = useNavigate();
  const session = readSession();
  const addressKey = `sake_direccion_${session?.id || session?.correo || "invitado"}`;
  const savedAddress = readSavedAddress(addressKey);
  const sessionAddress = {
    ...(session?.direccion ? { direccion: session.direccion } : {}),
    ...(session?.region ? { region: session.region } : {}),
    ...(session?.comuna ? { comuna: session.comuna } : {}),
  };
  const initialAddress = { ...sessionAddress, ...savedAddress };
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) {
      setError("Agrega productos antes de confirmar el pedido.");
      return;
    }

    setError("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const nombre = String(form.get("nombre") || "").trim();
    const correo = String(form.get("correo") || "").trim();
    const calle = String(form.get("direccion") || "").trim();
    const region = String(form.get("region") || "").trim();
    const comuna = String(form.get("comuna") || "").trim();
    const tarjeta = String(form.get("tarjeta") || "").replace(/\D/g, "");
    const direccion = `${calle}, ${comuna}, ${region}`;
    const payload = {
      nombre,
      correo,
      direccion,
      region,
      comuna,
      tarjeta,
      items: cart.map((item) => ({
        id: item.id,
        nombre: item.name,
        precio: item.price,
        cantidad: item.quantity,
        imagen: item.image,
        talla: item.size,
      })),
    };

    try {
      validateCartStock(cart);
      localStorage.setItem(addressKey, JSON.stringify({ direccion: calle, region, comuna }));
      const response = await fetch("http://localhost:8082/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseText = await response.text();
      let result;
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = { mensaje: responseText };
      }
      if (!response.ok) throw new Error(result.mensaje || result.message || `Error del servidor (${response.status}).`);
      if (result.correoEnviado !== true) {
        throw new Error(result.mensaje || "El pedido llegó al servidor, pero no se pudo confirmar el correo.");
      }

      const order = {
        numero: String(result.pedidoId || result.id || crypto.randomUUID()),
        estado: "Pago confirmado",
        nombre,
        correo,
        direccion,
        total,
        items: cart,
        tarjetaUltimos4: tarjeta.slice(-4),
        respaldoLocal: false,
      };
      saveOrder(order);
      reduceCartStock(cart);
      clearCart();
      navigate("/tienda/pago-correcto", { replace: true });
    } catch (requestError) {
      if (requestError instanceof TypeError && /fetch|network|failed/i.test(requestError.message)) {
        try {
          const order = {
            numero: `LOCAL-${Date.now()}`,
            estado: "Pendiente de confirmación",
            nombre,
            correo,
            direccion,
            total,
            items: cart,
            tarjetaUltimos4: tarjeta.slice(-4),
            respaldoLocal: true,
            aviso: "El backend de pagos no respondió. No se confirmó ni se cobró el pago; el pedido quedó guardado localmente para revisión.",
          };
          saveOrder(order);
          navigate("/tienda/pago-correcto", { replace: true });
        } catch (fallbackError) {
          setError(fallbackError instanceof Error ? fallbackError.message : "No se pudo guardar el respaldo local del pedido.");
        }
      } else {
        localStorage.setItem("sake_ultimo_error_pago", requestError instanceof Error ? requestError.message : "No se pudo confirmar el pago.");
        navigate("/tienda/pago-error", { state: { error: requestError instanceof Error ? requestError.message : "" } });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="page-shell">
      <span className="eyebrow">Checkout</span>
      <h1 className="store-page-title">Proceder al pago.</h1>
      {storageError && <p className="form-error" role="alert">{storageError}</p>}
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Tu cesta está vacía.</p>
          <Link className="store-text-link" to="/tienda/productos">Volver a productos</Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-panel" onSubmit={handleSubmit}>
            {session?.logueado && <p className="saved-data">Datos completados desde tu sesión. Puedes actualizarlos para este pedido.</p>}
            <label className="form-field"><span>Nombre completo</span><input name="nombre" autoComplete="name" defaultValue={session?.nombre || ""} required /></label>
            <label className="form-field"><span>Correo electrónico</span><input name="correo" type="email" autoComplete="email" defaultValue={session?.correo || session?.email || ""} required /></label>
            <label className="form-field"><span>Dirección</span><input name="direccion" autoComplete="street-address" defaultValue={initialAddress.direccion || ""} required /></label>
            <label className="form-field"><span>Región</span>
              <select name="region" defaultValue={initialAddress.region || ""} required>
                <option value="" disabled>Selecciona una región</option>
                {regions.map((region) => <option key={region} value={region}>{region}</option>)}
              </select>
            </label>
            <label className="form-field"><span>Comuna</span><input name="comuna" autoComplete="address-level2" defaultValue={initialAddress.comuna || ""} required /></label>
            <label className="form-field"><span>Número de tarjeta</span><input name="tarjeta" inputMode="numeric" autoComplete="cc-number" minLength="12" maxLength="19" placeholder="1111 2222 3333 4444" required /></label>
            <p className="saved-data">La tarjeta solo se envía para procesar el pago. Guardaremos únicamente sus últimos cuatro dígitos.</p>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="store-button" type="submit" disabled={busy}>{busy ? "Procesando..." : "Confirmar pedido"}</button>
          </form>
          <aside className="cart-summary checkout-summary">
            <h2>Resumen</h2>
            {cart.map((item) => (
              <div className="checkout-summary__item" key={`${item.id}-${item.size}`}>
                {item.image && <img src={imageUrl(item.image)} alt="" />}
                <span>{item.name} · {item.size} × {item.quantity}</span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
            <p><span>Total</span><strong>{formatPrice(total)}</strong></p>
            <Link className="store-text-link" to="/carrito">Volver al carrito</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
