import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/cart/CartContext.jsx";
import { formatPrice, imageUrl } from "../data/storefrontData.js";

export default function CartPage() {
  const { cart, total, storageError, updateQuantity, removeItem } = useCart();
  const [error, setError] = useState("");

  function changeQuantity(item, value) {
    try {
      updateQuantity(item.id, item.size, Number(value));
      setError("");
    } catch (changeError) {
      setError(changeError instanceof Error ? changeError.message : "No se pudo actualizar la cantidad.");
    }
  }

  return (
    <section className="page-shell">
      <span className="eyebrow">Tu selección</span>
      <h1 className="store-page-title">Tu cesta.</h1>
      {(storageError || error) && <p className="form-error" role="alert">{storageError || error}</p>}
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Tu cesta está vacía.</p>
          <Link className="store-text-link" to="/tienda/productos">Explorar productos</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={`${item.id}-${item.size}`}>
                {item.image && <img src={imageUrl(item.image)} alt={item.name} />}
                <div className="cart-item__details">
                  <h2>{item.name}</h2>
                  <p>{item.color ? `Color: ${item.color} · ` : ""}Talla: {item.size}</p>
                  <strong>{formatPrice(item.price)}</strong>
                  <label className="cart-item__quantity">
                    Cantidad
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(event) => changeQuantity(item, event.target.value)}
                      aria-label={`Cantidad de ${item.name}, talla ${item.size}`}
                    />
                  </label>
                  <button className="store-text-link cart-item__remove" type="button" onClick={() => removeItem(item.id, item.size)}>Eliminar</button>
                </div>
                <strong className="cart-item__subtotal">{formatPrice(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Resumen</h2>
            <p><span>Total</span><strong>{formatPrice(total)}</strong></p>
            <Link className="store-button cart-summary__checkout" to="/tienda/checkout">Continuar al checkout</Link>
            <Link className="store-text-link" to="/tienda/productos">Seguir comprando</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
