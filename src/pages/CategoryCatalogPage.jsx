import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/storefront/ProductCard.jsx";
import { categories, getProductSizeStock, getProductSizes, imageUrl, products, useStoreData } from "../data/storefrontData.js";

const catalogSections = {
  mujer: [
    { id: "vestidos", label: "VESTIDOS", products: ["vestido-midi", "vestido-satinado"] },
    { id: "camisas", label: "CAMISAS | BLUSAS", products: ["camisa-lino", "blusa-bordada"] },
    { id: "tops", label: "TOPS | BODIES", products: ["top-estructurado"] },
    { id: "poleras", label: "POLERAS", products: ["polera-cotton-graphic"] },
    { id: "chaquetas", label: "CHAQUETAS", products: ["chaqueta-oversized-women"] },
    { id: "jeans", label: "JEANS", products: ["jeans-high-waist"] },
    { id: "zapatos", label: "ZAPATOS", products: ["mocasines-minimal"] },
  ],
  hombre: [
    { id: "camisas", label: "CAMISAS", products: ["camisa-negra", "camisa-oxford"] },
    { id: "poleras", label: "POLERAS", products: ["heavy-cotton-men"] },
    { id: "chaquetas", label: "CHAQUETAS", products: ["chaqueta-cazadora"] },
    { id: "pantalones", label: "PANTALÓNES", products: ["pantalon-chino"] },
    { id: "trajes", label: "TRAJES", products: ["chaqueta-abrigo"] },
    { id: "calzado", label: "CALZADO", products: ["mocasines-derby"] },
  ],
  ninos: [
    { id: "nino-poleras", label: "POLERAS", products: ["polera-kids"] },
    { id: "nino-pantalones", label: "PANTALONES", products: ["pantalon-kids"] },
    { id: "nino-chaquetas", label: "CHAQUETAS", products: ["chaqueta-kids"] },
    { id: "nino-calzado", label: "CALZADO", products: ["zapatillas-kids"] },
  ],
  accesorios: [
    { id: "collares", label: "COLLARES", products: ["collares"] },
    { id: "bolsos", label: "BOLSOS | MOCHILAS", products: ["bolso"] },
    { id: "guantes", label: "GUANTES", products: ["guantes"] },
    { id: "perfumes", label: "PERFUMES", products: ["perfume"] },
  ],
};

const imageLayouts = {
  "vestido-midi": "staggered",
  "vestido-satinado": "grid",
  "camisa-lino": "asymmetric",
  "blusa-bordada": "triptych",
  "top-estructurado": "staggered",
  "polera-cotton-graphic": "duo",
  "chaqueta-oversized-women": "staggered",
  "jeans-high-waist": "triptych",
  "mocasines-minimal": "shoe",
  "camisa-negra": "grid",
  "camisa-oxford": "grid",
  "heavy-cotton-men": "duo",
  "chaqueta-cazadora": "staggered",
  "chaqueta-abrigo": "asymmetric",
  "pantalon-chino": "triptych",
  "mocasines-derby": "shoe",
  "polera-kids": "duo",
  "pantalon-kids": "staggered",
  "chaqueta-kids": "shoe",
  "zapatillas-kids": "shoe",
  collares: "duo",
  bolso: "shoe",
  guantes: "staggered",
  perfume: "shoe",
};

function EditorialImages({ product, layout }) {
  const catalogImages = product.catalogImages ?? product.images;
  const images = catalogImages.slice(0, layout === "grid" || layout === "triptych" ? 3 : layout === "asymmetric" ? 3 : 2);
  const image = (source, index) => (
    <img
      key={`${source}-${index}`}
      className={product.id === "camisa-oxford" && index === 0 ? "object-contain-top" : product.id === "mocasines-derby" ? "object-bottom" : ["polera-kids", "chaqueta-kids"].includes(product.id) && index === 0 ? "object-top" : ""}
      src={imageUrl(source)}
      alt={`${product.name} vista ${index + 1}`}
    />
  );

  if (layout === "grid") {
    return <div className="editorial-grid">
      <div className="editorial-image-wrapper full-width">{image(images[0], 0)}</div>
      {images.slice(1, 3).map((source, index) => <div className="editorial-image-wrapper half-width" key={source}>{image(source, index + 1)}</div>)}
    </div>;
  }
  if (layout === "asymmetric") {
    return <div className="editorial-asymmetric">
      <div className="asymmetric-main">{image(images[0], 0)}</div>
      <div className="asymmetric-stack">
        {images.slice(1, 3).map((source, index) => <div className="asymmetric-sub" key={source}>{image(source, index + 1)}</div>)}
      </div>
    </div>;
  }
  if (layout === "triptych") {
    return <div className="editorial-triptych">{images.map((source, index) => <div className="triptych-item" key={source}>{image(source, index)}</div>)}</div>;
  }
  if (layout === "shoe") {
    return <div className="single-shoe-wrapper">{image(images[0], 0)}</div>;
  }
  if (layout === "staggered") {
    return <div className="editorial-staggered">
      {images.map((source, index) => <div className={`staggered-item ${index % 2 === 0 ? "align-left" : "align-right"}`} key={source}>{image(source, index)}</div>)}
    </div>;
  }
  return <div className="editorial-duo">
    {images.map((source, index) => <div className="duo-item" key={source}>{image(source, index)}</div>)}
  </div>;
}

export default function CategoryCatalogPage() {
  const { categoryId } = useParams();
  useStoreData();
  const sections = catalogSections[categoryId];
  if (!sections) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return <section className="page-shell"><h1>Categoría no encontrada</h1><Link className="text-link" to="/">Volver a la tienda</Link></section>;
    const categoryProducts = products.filter((product) => product.category === categoryId);
    return <section className="page-shell">
      <header className="store-intro"><span className="eyebrow">SAKE D. BINKS / CATEGORÍAS</span><h1>{category.name}</h1><p className="lead">{category.description}</p></header>
      <div className="product-grid">{categoryProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      {categoryProducts.length === 0 && <p className="empty-state">Aún no hay productos en esta categoría.</p>}
    </section>;
  }

  const label = { mujer: "MUJER", hombre: "HOMBRE", ninos: "NIÑOS", accesorios: "ACCESORIOS" }[categoryId];
  const sectionProductIds = new Set(sections.flatMap((section) => section.products));
  const addedProducts = products.filter((product) => product.category === categoryId && product.adminCreated && !sectionProductIds.has(product.id));
  return (
    <div className={`layout-wrapper category-catalog category-catalog--${categoryId}`}>
      <aside className="sidebar-menu">
        <ul>{sections.map(({ id, label: sectionLabel }, index) => <li key={id}><a className={`menu-item${index === 0 ? " active-category" : ""}`} href={`#${id}`}>{sectionLabel}</a></li>)}</ul>
      </aside>
      <div className="catalog-content" aria-label={label}>
        {sections.map((section) => (
          <section className="category-section" id={section.id} key={section.id}>
            <div className="editorial-container">
              {section.products.map((productId) => {
                const product = products.find((item) => item.id === productId);
                if (!product) return null;
                const sizes = getProductSizes(product);
                const stock = sizes.reduce((sum, size) => sum + getProductSizeStock(product, size), 0);
                return (
                  <article className="editorial-product" key={product.id}>
                    <Link className="product-link-group" to={`/tienda/detalle/${product.id}`}>
                      <EditorialImages product={product} layout={imageLayouts[product.id] ?? "duo"} />
                      <div className="editorial-info">
                        <span className="product-name">{product.catalogName ?? product.stockName ?? product.name}</span>
                        <span className="product-price">{new Intl.NumberFormat("es-CL").format(product.catalogPrice ?? product.price)} CLP</span>
                        <span className="catalog-stock">STOCK DISPONIBLE: {stock}</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        {addedProducts.length > 0 && <section className="page-shell"><h2>Productos nuevos</h2><div className="product-grid">{addedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>}
      </div>
    </div>
  );
}
