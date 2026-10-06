import { Link } from "react-router-dom";
import { imageUrl } from "../../data/storefrontData.js";

export default function CategoryCard({ category }) {
  return (
    <Link className="category-card" to={`/tienda/categoria/${category.id}`}>
      <img src={imageUrl(category.image)} alt="" />
      <span className="category-card__content">
        <strong>{category.name}</strong>
        <span>{category.description}</span>
        <span className="store-text-link">Explorar colección</span>
      </span>
    </Link>
  );
}
