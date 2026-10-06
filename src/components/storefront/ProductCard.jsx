import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../../data/storefrontData.js";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-card__image" to={`/tienda/detalle/${product.id}`}>
        <img src={imageUrl(product.image)} alt={product.name} />
      </Link>
      <div className="product-card__info">
        <span>{product.name}</span>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </article>
  );
}
