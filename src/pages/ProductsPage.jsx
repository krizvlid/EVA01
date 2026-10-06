import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/storefront/ProductCard.jsx";
import { categories, products, useStoreData } from "../data/storefrontData.js";

export default function ProductsPage() {
  useStoreData();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categoria") ?? "todas";
  const visibleProducts = activeCategory === "todas"
    ? products
    : products.filter((product) => product.category === activeCategory);
  const activeName = categories.find((category) => category.id === activeCategory)?.name;

  return (
    <section className="page-shell">
      <header className="store-intro">
        <span className="eyebrow">SAKE D. BINKS / COLECCIÓN</span>
        <h1>{activeName ?? "Productos"}</h1>
        <p className="lead">Piezas versátiles y cuidadosamente elegidas para acompañar tu estilo.</p>
      </header>
      <nav className="filter-row" aria-label="Filtrar productos por categoría">
        <button className={activeCategory === "todas" ? "is-active" : ""} onClick={() => setSearchParams({})}>Todo</button>
        {categories.map((category) => (
          <button
            className={activeCategory === category.id ? "is-active" : ""}
            key={category.id}
            onClick={() => setSearchParams({ categoria: category.id })}
          >
            {category.name}
          </button>
        ))}
      </nav>
      <div className="product-grid">
        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {visibleProducts.length === 0 && <p className="empty-state">No hay productos disponibles en esta categoría.</p>}
    </section>
  );
}
