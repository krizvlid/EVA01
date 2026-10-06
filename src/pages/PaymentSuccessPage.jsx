import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../data/storefrontData.js";

function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem("sake_ultima_orden") || "null");
  } catch {
    return null;
  }
}

export default function PaymentSuccessPage() {
  const order = getLastOrder();
  if (!order) {
    return <section className="page-shell"><h1>No hay un pedido reciente para mostrar.</h1><Link className="store-text-link" to="/tienda/productos">Volver a la tienda</Link></section>;
  }

  return (
    <section className="page-shell payment-result">
      <span className="eyebrow">{order.respaldoLocal ? "Respaldo local" : "Pago correcto"}</span>
      <h1 className="store-page-title">{order.respaldoLocal ? "Pedido guardado." : "Gracias por tu compra."}</h1>
      {order.respaldoLocal && <p className="payment-result__notice" role="status">{order.aviso}</p>}
      <p className="payment-result__order">Número de orden: <strong>{order.numero}</strong></p>
      <p>Estado: <strong>{order.estado}</strong></p>
      <p>{order.nombre} · {order.correo}</p>
      <p>{order.direccion}</p>
      <div className="payment-result__items">
        {order.items.map((item) => (
          <div className="checkout-summary__item" key={`${item.id}-${item.size}`}>
            {item.image && <img src={imageUrl(item.image)} alt="" />}
            <span>{item.name} · {item.size} × {item.quantity}</span>
            <strong>{formatPrice(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <p className="payment-result__total">Total <strong>{formatPrice(order.total)}</strong></p>
      {order.tarjetaUltimos4 && <p>Tarjeta terminada en ···· {order.tarjetaUltimos4}</p>}
      {order.respaldoLocal && <Link className="store-button payment-result__button" to="/tienda/checkout">Reintentar pago</Link>}
      <Link className="store-button payment-result__button" to="/tienda/productos">Seguir comprando</Link>
    </section>
  );
}
