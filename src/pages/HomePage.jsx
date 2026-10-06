import { Link } from "react-router-dom";
import { categories, imageUrl } from "../data/storefrontData.js";

export default function HomePage() {
  return (
    <div className="home-slider" aria-label="Colecciones destacadas">
      {categories.map((category, index) => (
        <section className="home-slide" id={`coleccion-${category.id}`} key={category.id}>
          <img src={imageUrl(category.image)} alt={`Colección ${category.name}`} />
          <div className="home-slide__shade" />
          <div className="home-slide__content">
            <span className="home-slide__index">SAKE D. BINKS / 0{index + 1}</span>
            <h1>{category.name}</h1>
            <Link className="home-slide__link" to={`/tienda/productos?categoria=${category.id}`}>
              Ver más <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <span className="home-slide__count">0{index + 1} / 04</span>
        </section>
      ))}
    </div>
  );
}
