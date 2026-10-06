import { Link } from "react-router-dom";
import { categories, imageUrl, useStoreData } from "../data/storefrontData.js";

export default function HomePage() {
  useStoreData();
  return (
    <div className="slider-container" aria-label="Colecciones destacadas">
      {categories.map((category) => (
        <section className="slide" id={category.id === "ninos" ? "nino" : category.id} key={category.id}>
          <img src={imageUrl(category.image)} alt={category.name === "Niños" ? "NIÑO" : category.name} />
          <div className="slide-content">
            <h2 className="slide-title">{category.name.toUpperCase()}</h2>
            <Link className="btn-link" to={`/tienda/categoria/${category.id}`}>
              VER MAS
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
