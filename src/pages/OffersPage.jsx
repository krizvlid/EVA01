import { Link } from "react-router-dom";
import { formatPrice, imageUrl, products } from "../data/storefrontData.js";

export default function OffersPage() {
  const offers = products.filter((product) => ["vestido-midi", "camisa-negra", "polera-kids", "collares"].includes(product.id));

  return (
    <section className="page-shell">
      <header className="store-intro">
        <span className="eyebrow">SAKE D. BINKS / SELECCIÓN ESPECIAL</span>
        <h1>Ofertas</h1>
        <p className="lead">Una selección de piezas esenciales para descubrir esta temporada.</p>
      </header>
      <div className="product-grid">
        {offers.map((product) => (
          <article className="product-card" key={product.id}>
            <Link className="product-card__image offer-card__image" to={`/tienda/detalle/${product.id}`}>
              <img src={imageUrl(product.image)} alt={product.name} />
              <span>−20%</span>
            </Link>
            <div className="product-card__info">
              <span>{product.name}</span>
              <strong><del>{formatPrice(Math.round(product.price / 0.8))}</del> {formatPrice(product.price)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
