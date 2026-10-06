import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../components/cart/CartContext.jsx";
import { formatPrice, getProductSizeStock, getProductSizes, imageUrl, products } from "../data/storefrontData.js";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const sizes = product ? getProductSizes(product) : [];
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const { addItem } = useCart();

  if (!product) {
    return <section className="page-shell"><h1>Producto no encontrado</h1><Link className="store-text-link" to="/tienda/productos">Volver a productos</Link></section>;
  }

  const stock = getProductSizeStock(product, selectedSize);

  function addToCart() {
    try {
      addItem(product, selectedSize, quantity);
      setNotice("Producto añadido a la cesta.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se pudo añadir el producto.");
    }
  }

  return (
    <section className="product-detail">
      <div className="product-detail__gallery">
        {product.images.map((image, index) => <img key={image} src={imageUrl(image)} alt={`${product.name}, vista ${index + 1}`} />)}
      </div>
      <div className="product-detail__panel">
        <span className="eyebrow">SAKE D. BINKS / {product.category}</span>
        <h1>{product.name}</h1>
        <p className="product-detail__price">{formatPrice(product.price)}</p>
        <p className="product-detail__meta">Color: {product.color}</p>
        {sizes[0] !== "Única" && (
          <>
            <label className="eyebrow" htmlFor="product-size">Talla{product.sizeType === "pants" ? " cintura / largo" : ["shoes", "kidsShoes"].includes(product.sizeType) ? " calzado (EU)" : ""}</label>
            <div className="size-options" id="product-size">
              {sizes.map((size) => (
                <button className={selectedSize === size ? "is-selected" : ""} key={size} onClick={() => { setSelectedSize(size); setNotice(""); }}>{size}</button>
              ))}
            </div>
          </>
        )}
        <p className="product-detail__stock">Stock disponible ({selectedSize}): <strong>{stock}</strong></p>
        <div className="product-detail__quantity">
          <label htmlFor="product-quantity">Cantidad</label>
          <button type="button" aria-label="Disminuir cantidad" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
          <input id="product-quantity" type="number" min="1" max={stock} value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} />
          <button type="button" aria-label="Aumentar cantidad" disabled={quantity >= stock} onClick={() => setQuantity((value) => Math.min(stock, value + 1))}>+</button>
        </div>
        <button className="store-button" onClick={addToCart} disabled={stock === 0}>Añadir a la cesta</button>
        {notice && <p className="form-success" role="status">{notice}</p>}
        <div className="product-detail__note">Opción de envío rápido: compra antes de las 12 h y recibe al día hábil siguiente.</div>
        <details><summary>Descripción</summary><p>Prenda confeccionada con tejidos seleccionados. Diseño de la colección actual de SAKE D. BINKS.</p></details>
        <details><summary>Materiales y cuidados</summary><p>Materiales de primera selección. Lavar a mano o en ciclo delicado con agua fría.</p></details>
      </div>
    </section>
  );
}
