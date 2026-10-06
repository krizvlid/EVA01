import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../components/cart/CartContext.jsx";
import {
  formatPrice,
  getProductSizeStock,
  getProductSizes,
  getProductStockCode,
  imageUrl,
  products,
  useStoreData,
} from "../data/storefrontData.js";

export default function ProductDetailPage() {
  useStoreData();
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const sizes = product ? getProductSizes(product) : [];
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  useEffect(() => {
    if (sizes.length === 0) return;
    if (!sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0]);
      setQuantity(1);
    }
  }, [sizes, selectedSize]);

  if (!product) {
    return <section className="page-shell"><h1>Producto no encontrado</h1><Link className="text-link" to="/tienda/productos">Volver a productos</Link></section>;
  }

  const colorOptions = [
    { name: product.color || "Único", thumb: product.thumbImage || product.image, images: product.images },
    ...(product.colorOptions ?? []),
  ];
  const activeColor = colorOptions[selectedColor] ?? colorOptions[0];
  const stock = getProductSizeStock(product, selectedSize, activeColor.name);

  function addToCart() {
    try {
      addItem({ ...product, image: activeColor.thumb || product.image }, selectedSize, quantity, activeColor.name);
      setNotice("Producto añadido a la cesta.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se pudo añadir el producto.");
    }
  }

  return (
    <div className="product-detail-container">
      <div className="product-gallery" id="gallery-container">
        {activeColor.images.map((image, index) => <img key={`${image}-${index}`} src={imageUrl(image)} alt={`${product.name}, vista ${index + 1}`} />)}
      </div>
      <div className="product-info-panel">
        <h1 className="product-title">{product.stockName ?? product.name}</h1>
        <p className="product-price">{formatPrice(product.price)}</p>
        <span className="color-label">COLOR: {activeColor.name}</span>
        <div className="colors-container">
          {colorOptions.map((color, index) => (
            <button
              className={`color-thumb${index === selectedColor ? " active" : ""}`}
              type="button"
              key={color.name}
              onClick={() => { setSelectedColor(index); setQuantity(1); setNotice(""); }}
              aria-label={`Color ${color.name}`}
              aria-pressed={index === selectedColor}
            >
              <img src={imageUrl(color.thumb || color.images[0])} alt={color.name} />
            </button>
          ))}
        </div>
        <span className="size-label">TALLA:</span>
        {sizes[0] !== "Única" && (
          <div className="size-selector">
            {sizes.map((size) => (
              <button className={`size-btn${selectedSize === size ? " active" : ""}`} type="button" key={size} onClick={() => { setSelectedSize(size); setQuantity(1); setNotice(""); }}>
                {size}
              </button>
            ))}
          </div>
        )}
        <Link to="#size-guide" className="size-guide-link">Guía de tallas</Link>
        <div className="stock-panel">
          <div className="stock-row"><span className="stock-label">CÓDIGO</span><span className="stock-value">{getProductStockCode(product)}</span></div>
          <div className="stock-row"><span className="stock-label">STOCK DISPONIBLE</span><span className="stock-value">{stock}</span></div>
        </div>
        <div className="quantity-selector">
          <span>CANTIDAD</span>
          <button type="button" aria-label="Disminuir cantidad" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
          <input type="number" min="1" max={stock} value={quantity} aria-label="Cantidad" onChange={(event) => setQuantity(Math.max(1, Math.min(stock, Number(event.target.value) || 1)))} />
          <button type="button" aria-label="Aumentar cantidad" disabled={quantity >= stock} onClick={() => setQuantity((value) => Math.min(stock, value + 1))}>+</button>
        </div>
        <button className="btn-add-cart" type="button" onClick={addToCart} disabled={stock === 0}>Añadir al carrito</button>
        {notice && <p className="form-success" role="status">{notice}</p>}
        <div className="shipping-banner">OPCION "ENVÍO RÁPIDO": COMPRA ANTES DE LAS 12H Y RECIBE AL DÍA HÁBIL SIGUIENTE</div>
        <div className="product-accordions">
          <details className="accordion-item">
            <summary className="accordion-button">DESCRIPCIÓN <span aria-hidden="true">˅</span></summary>
            <div className="accordion-body">Prenda confeccionada con tejidos seleccionados de alta calidad. Diseño de la colección actual de SAKE D. BINKS.</div>
          </details>
          <details className="accordion-item">
            <summary className="accordion-button">MATERIALES <span aria-hidden="true">˅</span></summary>
            <div className="accordion-body">100% materiales de primera selección. Lavar a mano o ciclo delicado en agua fría.</div>
          </details>
        </div>
      </div>
    </div>
  );
}
