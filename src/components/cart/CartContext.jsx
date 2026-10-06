import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductSizeStock, getProductSizeStockKey, getProductStockCode, products, updateRecord, usesPerSizeStock, useStoreData } from "../../data/storefrontData.js";

const CartContext = createContext(null);
const getProductById = (id) => products.find((product) => product.id === id);

function readCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart === null) return [];

  const parsedCart = JSON.parse(savedCart);
  if (!Array.isArray(parsedCart)) throw new TypeError("Los datos guardados del carrito no son una lista.");

  return parsedCart.map((item) => {
    const product = getProductById(item.id);
    const color = item.color ?? product?.color;
    const size = item.size ?? "Única";
    return {
      ...item,
      code: product ? getProductStockCode(product) : item.code ?? item.codigo ?? item.id,
      name: item.name ?? item.nombre ?? product?.name ?? "Producto",
      price: product?.price ?? Number(String(item.price ?? item.precio ?? 0).replace(/[^0-9]/g, "")),
      image: product?.thumbImage ?? item.image ?? item.imagen ?? item.img ?? "",
      quantity: Number(item.quantity) || 1,
      size,
      color,
      stock: product ? getProductSizeStock(product, size, color) : Number(item.stock),
    };
  });
}

function stockKey(item) {
  const product = getProductById(item.id);
  return product
    ? getProductSizeStockKey(product, item.size || "Única", item.color)
    : `sake_stock_${item.code}_${encodeURIComponent(item.size || "unica")}`;
}

export function CartProvider({ children }) {
  useStoreData();
  const [cart, setCart] = useState(() => {
    try {
      return readCart();
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState(() => {
    try {
      readCart();
      return "";
    } catch {
      return "No se pudo leer el carrito guardado. Revisa el almacenamiento local del navegador.";
    }
  });

  const persist = useCallback((nextCart) => {
    localStorage.setItem("cart", JSON.stringify(nextCart));
    setCart(nextCart);
    setStorageError("");
  }, []);

  const addItem = useCallback((product, size, quantity, selectedColor = product.color) => {
    const requested = Number(quantity);
    if (!Number.isInteger(requested) || requested < 1) throw new RangeError("La cantidad debe ser un entero mayor que cero.");
    const color = selectedColor;
    const stock = getProductSizeStock(product, size, color);
    const current = cart.find((item) => item.id === product.id && item.size === size && item.color === color);
    const nextQuantity = (current?.quantity ?? 0) + requested;
    if (!size || nextQuantity > stock) {
      throw new RangeError(`Stock insuficiente para la talla ${size || "seleccionada"}. Disponible: ${stock}.`);
    }

    const nextItem = {
      id: product.id,
      code: getProductStockCode(product),
      name: product.name,
      price: product.price,
      image: product.image,
      color,
      size,
      quantity: nextQuantity,
      stock,
    };
    persist(current
      ? cart.map((item) => item.id === product.id && item.size === size && item.color === color ? nextItem : item)
      : [...cart, nextItem]);
  }, [cart, persist]);

  const updateQuantity = useCallback((id, size, quantity, color) => {
    const requested = Number(quantity);
    const product = getProductById(id);
    const selectedColor = color ?? product?.color;
    const item = cart.find((entry) => entry.id === id && entry.size === size && entry.color === selectedColor);
    if (!item) throw new Error("El producto ya no está en el carrito.");
    const available = product ? getProductSizeStock(product, size, selectedColor) : Number(item.stock);
    if (!Number.isInteger(requested) || requested < 1 || requested > available) {
      throw new RangeError(`La cantidad debe estar entre 1 y ${available} para la talla ${size}.`);
    }
    persist(cart.map((entry) => entry.id === id && entry.size === size && entry.color === selectedColor
      ? { ...entry, quantity: requested, stock: available }
      : entry));
  }, [cart, persist]);

  const removeItem = useCallback((id, size, color) => {
    const selectedColor = color ?? getProductById(id)?.color;
    persist(cart.filter((item) => item.id !== id || item.size !== size || item.color !== selectedColor));
  }, [cart, persist]);

  const clearCart = useCallback(() => persist([]), [persist]);

  useEffect(() => {
    function syncCart(event) {
      if (event.key !== null && event.key !== "cart") return;
      try {
        setCart(readCart());
        setStorageError("");
      } catch {
        setStorageError("No se pudo leer el carrito actualizado desde otra pestaña.");
      }
    }
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const value = useMemo(() => ({
    cart,
    count: cart.reduce((total, item) => total + item.quantity, 0),
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    storageError,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }), [cart, storageError, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider.");
  return context;
}

export function validateCartStock(items) {
  const quantitiesByStockKey = new Map();
  const stockByKey = new Map();

  for (const item of items) {
    const product = getProductById(item.id);
    if (!product) throw new Error(`No se encontró el producto "${item.name}".`);
    const managedStock = !usesPerSizeStock(product) && product.stock !== undefined;
    const key = managedStock ? `product:${product.id}` : stockKey(item);
    quantitiesByStockKey.set(key, (quantitiesByStockKey.get(key) ?? 0) + item.quantity);
    stockByKey.set(key, managedStock ? Number(product.stock) : getProductSizeStock(product, item.size, item.color));
  }

  for (const [key, quantity] of quantitiesByStockKey) {
    if (quantity > stockByKey.get(key)) {
      const item = items.find((entry) => {
        const product = getProductById(entry.id);
        const entryKey = product && !usesPerSizeStock(product)
          && product.stock !== undefined ? `product:${product.id}` : stockKey(entry);
        return entryKey === key;
      });
      throw new RangeError(`Stock insuficiente para ${item.name}, talla ${item.size}. Disponible: ${stockByKey.get(key)}.`);
    }
  }
}

export function reduceCartStock(items) {
  const quantitiesByProduct = new Map();
  const quantitiesByStockKey = new Map();
  for (const item of items) {
    const product = getProductById(item.id);
    if (product?.stock !== undefined && !usesPerSizeStock(product)) {
      quantitiesByProduct.set(item.id, (quantitiesByProduct.get(item.id) ?? 0) + item.quantity);
      continue;
    }
    const key = stockKey(item);
    quantitiesByStockKey.set(key, (quantitiesByStockKey.get(key) ?? 0) + item.quantity);
  }

  for (const [id, quantity] of quantitiesByProduct) {
    const product = getProductById(id);
    if (product) updateRecord("productos", id, { stock: Math.max(0, Number(product.stock) - quantity) });
  }

  for (const [key, quantity] of quantitiesByStockKey) {
    const currentStock = Number(localStorage.getItem(key));
    localStorage.setItem(key, String(Math.max(0, currentStock - quantity)));
  }
}
