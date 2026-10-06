import { Link, useLocation } from "react-router-dom";

export default function PaymentErrorPage() {
  const location = useLocation();
  let savedError = "";
  try {
    savedError = localStorage.getItem("sake_ultimo_error_pago") || "";
  } catch {
    savedError = "";
  }

  return (
    <section className="page-shell payment-result">
      <span className="eyebrow">Pago no confirmado</span>
      <h1 className="store-page-title">No pudimos completar el pago.</h1>
      <p className="form-error" role="alert">{location.state?.error || savedError || "Inténtalo nuevamente. Tu carrito sigue guardado."}</p>
      <div className="payment-result__actions">
        <Link className="store-button" to="/tienda/checkout" onClick={() => localStorage.removeItem("sake_ultimo_error_pago")}>Reintentar pago</Link>
        <Link className="store-text-link" to="/carrito">Volver al carrito</Link>
      </div>
    </section>
  );
}
