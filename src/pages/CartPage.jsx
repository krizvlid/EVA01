import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/cart/CartContext.jsx";
import { formatPrice, imageUrl } from "../data/storefrontData.js";

export default function CartPage() {
  const { cart, total, storageError, updateQuantity, removeItem } = useCart();
  const [error, setError] = useState("");

  function changeQuantity(item, amount) {
    try {
      updateQuantity(item.id, item.size, item.quantity + amount, item.color);
      setError("");
    } catch (changeError) {
      setError(changeError instanceof Error ? changeError.message : "No se pudo actualizar la cantidad.");
    }
  }

  return (
    <section className="cart-container">
      <h2>TU CESTA</h2>
      {(storageError || error) && <p className="form-error" role="alert">{storageError || error}</p>}
      {cart.length === 0 ? <p>Tu cesta está vacía.</p> : (
        <div id="lista-carrito">
          {cart.map((item) => (
            <article className="cart-item" key={`${item.id}-${item.color}-${item.size}`}>
              {item.image && <img src={imageUrl(item.image)} alt={item.name} />}
              <div className="cart-item__description">
                <strong>{item.name}</strong><br />
                <small>Color: {item.color || "Único"}</small><br />
                <small>{formatPrice(item.price)}</small><br />
                <small>Talla: {item.size || "Única"}</small>
              </div>
              <div className="quantity-controls">
                <button className="btn-qty" type="button" aria-label="Disminuir cantidad" disabled={item.quantity <= 1} onClick={() => changeQuantity(item, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn-qty" type="button" aria-label="Aumentar cantidad" disabled={item.quantity >= item.stock} onClick={() => changeQuantity(item, 1)}>+</button>
              </div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <button className="btn-qty cart-remove" type="button" aria-label={`Eliminar ${item.name}`} onClick={() => removeItem(item.id, item.size, item.color)}>X</button>
            </article>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <h4>TOTAL: <span id="total-carrito">{formatPrice(total)}</span></h4>
        <br />
        <Link className="btn-checkout" to="/tienda/checkout">PROCEDER AL PAGO</Link>
      </div>
    </section>
  );
}
