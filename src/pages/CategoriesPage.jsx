import CategoryCard from "../components/storefront/CategoryCard.jsx";
import { categories, useStoreData } from "../data/storefrontData.js";

export default function CategoriesPage() {
  useStoreData();
  return (
    <section className="page-shell">
      <header className="store-intro">
        <span className="eyebrow">SAKE D. BINKS / CATEGORÍAS</span>
        <h1>Encuentra tu colección.</h1>
        <p className="lead">Explora nuestras selecciones de temporada.</p>
      </header>
      <div className="category-grid">{categories.map((category) => <CategoryCard key={category.id} category={category} />)}</div>
    </section>
  );
}
