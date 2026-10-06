import assert from "node:assert/strict";
import { after, test } from "node:test";

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.get(String(key)) ?? null;
  }

  setItem(key, value) {
    this.values.set(String(key), String(value));
  }

  removeItem(key) {
    this.values.delete(String(key));
  }
}

globalThis.localStorage = new MemoryStorage();
const store = await import("../src/data/storefrontData.js");
const createdIds = [];

function createTestProduct(id, changes = {}) {
  const record = store.createRecord("productos", {
    id,
    name: "Producto de prueba",
    category: "mujer",
    price: 10000,
    stock: 4,
    image: "Polera1.webp",
    ...changes,
  });
  createdIds.push(id);
  return record;
}

after(() => {
  for (const id of createdIds) {
    try {
      store.deleteRecord("productos", id);
    } catch {
      // A test may already have deleted its fixture.
    }
  }
});

test("carga el catálogo inicial compartido", () => {
  assert.ok(store.listRecords("productos").length >= 30);
  assert.ok(store.listRecords("categorias").length >= 4);
});

test("inicializa órdenes y usuarios como colecciones listas para CRUD", () => {
  assert.deepEqual(store.listRecords("ordenes"), []);
  assert.deepEqual(store.listRecords("usuarios"), []);
});

test("devuelve copias defensivas de los registros", () => {
  const firstRead = store.listRecords("productos");
  firstRead[0].name = "Nombre alterado";
  assert.notEqual(store.getRecord("productos", "vestido-midi").name, "Nombre alterado");
});

test("crear producto lo persiste en la colección que consume la tienda", () => {
  const product = createTestProduct("test-create");
  assert.equal(store.getRecord("productos", product.id).name, product.name);
  assert.ok(store.products.some((item) => item.id === product.id));
});

test("rechaza ids de producto duplicados", () => {
  createTestProduct("test-duplicate");
  assert.throws(() => createTestProduct("test-duplicate"), /Ya existe un registro/);
});

test("obtener un id inexistente devuelve null", () => {
  assert.equal(store.getRecord("productos", "missing-product"), null);
});

test("actualizar producto combina cambios y conserva su id", () => {
  createTestProduct("test-update");
  const updated = store.updateRecord("productos", "test-update", { price: 25000, stock: 2 });
  assert.equal(updated.id, "test-update");
  assert.equal(updated.name, "Producto de prueba");
  assert.equal(store.getRecord("productos", "test-update").stock, 2);
});

test("rechaza actualizar un producto inexistente", () => {
  assert.throws(() => store.updateRecord("productos", "missing-update", { stock: 1 }), /No existe un registro/);
});

test("eliminar producto lo quita de la fuente compartida", () => {
  createTestProduct("test-delete");
  store.deleteRecord("productos", "test-delete");
  assert.equal(store.getRecord("productos", "test-delete"), null);
  assert.equal(store.products.some((item) => item.id === "test-delete"), false);
});

test("rechaza eliminar un producto inexistente", () => {
  assert.throws(() => store.deleteRecord("productos", "missing-delete"), /No existe un registro/);
});

test("rechaza colecciones desconocidas", () => {
  assert.throws(() => store.listRecords("desconocida"), /Colección no válida/);
});

test("publica cambios para que las vistas React vuelvan a renderizar", () => {
  let notified = 0;
  const unsubscribe = store.subscribeStoreData(() => { notified += 1; });
  createTestProduct("test-subscribe");
  unsubscribe();
  assert.equal(notified, 1);
});

test("stock de tienda usa el inventario administrado", () => {
  const product = createTestProduct("test-stock", { stock: 3 });
  assert.equal(store.getProductSizeStock(product, "M"), 3);
});
