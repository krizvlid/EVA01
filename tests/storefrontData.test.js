import * as store from "../src/data/storefrontData.js";
import { mockLocalStorage } from "./testHelpers.js";

function createTestProduct(id, changes = {}) {
  return store.createRecord("productos", {
    id,
    name: "Producto de prueba",
    category: "mujer",
    price: 10000,
    stock: 4,
    image: "Polera1.webp",
    ...changes,
  });
}

describe("datos de la tienda", () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  it("carga el catálogo inicial compartido", () => {
    expect(store.listRecords("productos").length).toBeGreaterThanOrEqual(30);
    expect(store.listRecords("categorias").length).toBeGreaterThanOrEqual(4);
  });

  it("inicializa órdenes y usuarios como colecciones listas para CRUD", () => {
    expect(store.listRecords("ordenes")).toEqual([]);
    expect(store.listRecords("usuarios")).toEqual([]);
  });

  it("devuelve copias defensivas de los registros", () => {
    const firstRead = store.listRecords("productos");
    firstRead[0].name = "Nombre alterado";
    expect(store.getRecord("productos", "vestido-midi").name).not.toBe("Nombre alterado");
  });

  it("crear producto lo persiste en la colección que consume la tienda", () => {
    const product = createTestProduct("test-create");
    expect(store.getRecord("productos", product.id).name).toBe(product.name);
    expect(store.products.some((item) => item.id === product.id)).toBeTrue();
  });

  it("rechaza ids de producto duplicados", () => {
    createTestProduct("test-duplicate");
    expect(() => createTestProduct("test-duplicate")).toThrowError(/Ya existe un registro/);
  });

  it("obtener un id inexistente devuelve null", () => {
    expect(store.getRecord("productos", "missing-product")).toBeNull();
  });

  it("actualizar producto combina cambios y conserva su id", () => {
    createTestProduct("test-update");
    const updated = store.updateRecord("productos", "test-update", { price: 25000, stock: 2 });
    expect(updated.id).toBe("test-update");
    expect(updated.name).toBe("Producto de prueba");
    expect(store.getRecord("productos", "test-update").stock).toBe(2);
  });

  it("rechaza actualizar un producto inexistente", () => {
    expect(() => store.updateRecord("productos", "missing-update", { stock: 1 }))
      .toThrowError(/No existe un registro/);
  });

  it("eliminar producto lo quita de la fuente compartida", () => {
    createTestProduct("test-delete");
    store.deleteRecord("productos", "test-delete");
    expect(store.getRecord("productos", "test-delete")).toBeNull();
    expect(store.products.some((item) => item.id === "test-delete")).toBeFalse();
  });

  it("rechaza eliminar un producto inexistente", () => {
    expect(() => store.deleteRecord("productos", "missing-delete"))
      .toThrowError(/No existe un registro/);
  });

  it("rechaza colecciones desconocidas", () => {
    expect(() => store.listRecords("desconocida")).toThrowError(/Colección no válida/);
  });

  it("migra categorías heredadas al formato actual", () => {
    localStorage.setItem("sake-d-binks:categorias", JSON.stringify([
      { id: "legacy-category", nombre: "Categoría heredada" },
    ]));

    const migrated = store.listRecords("categorias");

    expect(migrated.some((category) => category.name === "Categoría heredada")).toBeTrue();
    expect(migrated.find((category) => category.name === "Categoría heredada").image).toBeTruthy();
  });

  it("migra productos heredados y conserva registros modernos en la misma colección", () => {
    localStorage.setItem("sake-d-binks:productos", JSON.stringify([
      { id: "legacy-product", nombre: "Camisa heredada", categoryId: "c-001", precio: 12000, stock: 2 },
      { id: "modern-product", name: "Producto actual", category: "mujer", image: "actual.jpg", price: 15000 },
    ]));

    const migrated = store.listRecords("productos");

    expect(migrated.find((product) => product.id === "legacy-product")).toEqual(jasmine.objectContaining({
      name: "Camisa heredada",
      category: "mujer",
      price: 12000,
      stock: 2,
      adminCreated: true,
    }));
    expect(migrated.find((product) => product.id === "modern-product").image).toBe("actual.jpg");
  });

  it("rechaza colecciones persistidas que no sean listas", () => {
    localStorage.setItem("sake-d-binks:ordenes", JSON.stringify({ id: "no-es-lista" }));

    expect(() => store.listRecords("ordenes")).toThrowError(/no son una lista/i);
  });

  it("ejecuta el CRUD completo de categorías", () => {
    const category = store.createRecord("categorias", {
      id: "test-category-crud",
      name: "Categoría de prueba",
      image: "categoria.jpg",
      description: "Descripción",
    });
    expect(store.getRecord("categorias", category.id).name).toBe("Categoría de prueba");

    const updated = store.updateRecord("categorias", category.id, { description: "Actualizada" });
    expect(updated.name).toBe("Categoría de prueba");
    expect(updated.description).toBe("Actualizada");
    expect(store.listRecords("categorias").some((item) => item.id === category.id)).toBeTrue();

    store.deleteRecord("categorias", category.id);
    expect(store.getRecord("categorias", category.id)).toBeNull();
  });

  it("ejecuta el CRUD completo de órdenes", () => {
    const order = store.createRecord("ordenes", {
      id: "test-order-crud",
      numero: "ORD-TEST",
      total: 20000,
      estado: "Pendiente",
    });
    expect(store.getRecord("ordenes", order.id).total).toBe(20000);

    const updated = store.updateRecord("ordenes", order.id, { estado: "Pagada" });
    expect(updated.numero).toBe("ORD-TEST");
    expect(updated.estado).toBe("Pagada");
    expect(store.listRecords("ordenes").some((item) => item.id === order.id)).toBeTrue();

    store.deleteRecord("ordenes", order.id);
    expect(store.getRecord("ordenes", order.id)).toBeNull();
  });

  it("publica cambios para que las vistas React vuelvan a renderizar", () => {
    const listener = { notify() {} };
    spyOn(listener, "notify");
    const unsubscribe = store.subscribeStoreData(listener.notify);
    createTestProduct("test-subscribe");
    unsubscribe();
    expect(listener.notify).toHaveBeenCalledTimes(1);
  });

  it("stock de tienda usa el inventario administrado", () => {
    const product = createTestProduct("test-stock", { stock: 3 });
    expect(store.getProductSizeStock(product, "M")).toBe(3);
  });

  it("elige tallas únicas para accesorios y tallas por tipo para prendas", () => {
    expect(store.getProductSizes({ category: "accesorios", name: "Bolso" })).toEqual(["Única"]);
    expect(store.getProductSizes({ category: "hombre", name: "Pantalón", sizeType: "pants" }))
      .toEqual(["28/30", "30/30", "32/30", "34/32", "36/32"]);
    expect(store.getProductSizes({ category: "mujer", name: "Vestido", catalogSku: "CAT-1" }))
      .toEqual(["XS", "S", "M", "L", "XL"]);
  });

  it("obtiene el stock guardado o calcula y persiste un valor inicial", () => {
    const product = { id: "stock-test", name: "Producto de stock", sku: "STOCK-TEST" };
    localStorage.setItem("sake_stock_STOCK-TEST_M", "7");
    expect(store.getProductSizeStock(product, "M")).toBe(7);

    const initialStock = store.getProductSizeStock(product, "L");
    expect(Number.isInteger(initialStock)).toBeTrue();
    expect(Number(localStorage.getItem("sake_stock_STOCK-TEST_L"))).toBe(initialStock);
  });

  it("usa stock independiente de 1 a 15 por talla para el catálogo aunque tenga stock global heredado", () => {
    const product = { ...store.getRecord("productos", "vestido-midi"), stock: 10 };
    const stocks = store.getProductSizes(product).map((size) => store.getProductSizeStock(product, size));

    expect(stocks.every((stock) => stock >= 1 && stock <= 15)).toBeTrue();
    expect(new Set(stocks).size).toBe(stocks.length);
  });

  it("limita a 15 el stock por talla heredado fuera del rango del catálogo", () => {
    const product = store.getRecord("productos", "vestido-midi");
    const key = `sake_stock_${store.getProductStockCode(product)}_XS`;
    localStorage.setItem(key, "20");

    expect(store.getProductSizeStock(product, "XS")).toBe(15);
    expect(localStorage.getItem(key)).toBe("15");
  });

  it("mantiene stock independiente por color y talla y distinto entre los colores ofrecidos", () => {
    const product = store.getRecord("productos", "heavy-cotton-men");
    const colors = [product.color, ...product.colorOptions.map((option) => option.name)];

    for (const size of store.getProductSizes(product)) {
      const stocks = colors.map((color) => store.getProductSizeStock(product, size, color));
      expect(stocks.every((stock) => stock >= 1 && stock <= 15)).toBeTrue();
      expect(new Set(stocks).size).toBe(colors.length);
    }

    const whiteKey = store.getProductSizeStockKey(product, "M", "Blanco");
    expect(Number(localStorage.getItem(whiteKey))).toBe(store.getProductSizeStock(product, "M", "Blanco"));
    expect(whiteKey).not.toBe(store.getProductSizeStockKey(product, "M", product.color));
  });
});
