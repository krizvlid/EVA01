import { act, useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CartPage from "../src/pages/CartPage.jsx";
import CheckoutPage from "../src/pages/CheckoutPage.jsx";
import ContactPage from "../src/pages/ContactPage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import PaymentErrorPage from "../src/pages/PaymentErrorPage.jsx";
import ProductsPage from "../src/pages/ProductsPage.jsx";
import RegisterPage from "../src/pages/RegisterPage.jsx";
import ProductCard from "../src/components/storefront/ProductCard.jsx";
import { CartProvider, useCart } from "../src/components/cart/CartContext.jsx";
import { createRecord, getProductStockCode, products } from "../src/data/storefrontData.js";
import { cleanUp, mockLocalStorage, render, setFieldValue } from "./testHelpers.js";
import { ProductsAdminPage } from "../src/pages/admin/AdminPages.jsx";

function router(element, initialEntry = "/") {
  return <MemoryRouter initialEntries={[initialEntry]}>{element}</MemoryRouter>;
}

function cartFixture(quantity = 1, stock = 5) {
  const product = products[0];
  const size = "M";
  localStorage.setItem("cart", JSON.stringify([{ id: product.id, size, quantity }]));
  localStorage.setItem(`sake_stock_${getProductStockCode(product)}_${encodeURIComponent(size)}`, String(stock));
  return product;
}

async function submit(form) {
  await act(async () => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function CartActions({ product, size = "M" }) {
  const { cart, addItem, removeItem, clearCart } = useCart();
  const [error, setError] = useState("");

  function add() {
    try {
      addItem(product, size, 1);
      setError("");
    } catch (addError) {
      setError(addError.message);
    }
  }

  return (
    <>
      <p data-testid="cart-size">{cart.length}</p>
      <button type="button" onClick={add}>Agregar</button>
      <button type="button" onClick={() => removeItem(product.id, size)}>Eliminar</button>
      <button type="button" onClick={clearCart}>Vaciar</button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

describe("componentes React de la tienda", () => {
  beforeEach(() => mockLocalStorage());

  it("muestra el catálogo como una lista de productos", async () => {
    const container = await render(router(<ProductsPage />));
    expect(container.querySelectorAll(".product-card").length).toBe(products.length);
    expect(container.textContent).toContain(products[0].name);
  });

  it("filtra la lista cuando se elige una categoría", async () => {
    const container = await render(router(<ProductsPage />));
    const categoryButton = [...container.querySelectorAll(".filter-row button")]
      .find((button) => button.textContent === "Mujer");

    await act(async () => categoryButton.click());

    expect(container.querySelectorAll(".product-card").length)
      .toBe(products.filter((product) => product.category === "mujer").length);
    expect(container.querySelector("h1").textContent).toBe("Mujer");
  });

  it("muestra el estado vacío solo si el filtro no encuentra productos", async () => {
    const empty = await render(router(<ProductsPage />, "/?categoria=inexistente"));
    expect(empty.querySelector(".empty-state").textContent).toContain("No hay productos");
    await cleanUp();

    const populated = await render(router(<ProductsPage />));
    expect(populated.querySelector(".empty-state")).toBeNull();
  });

  it("renderiza una tarjeta desde sus props de producto", async () => {
    const product = products[0];
    const container = await render(router(<ProductCard product={product} />));
    const link = container.querySelector(".product-card__image");

    expect(container.textContent).toContain(product.name);
    expect(container.textContent).toContain("CLP");
    expect(link.getAttribute("href")).toBe(`/tienda/detalle/${product.id}`);
    expect(link.querySelector("img").getAttribute("alt")).toBe(product.name);
  });

  it("actualiza el estado y el contador al escribir en el formulario", async () => {
    const container = await render(<ContactPage />);
    const comment = container.querySelector("#contact-comment");

    await act(async () => setFieldValue(comment, "Necesito ayuda con mi pedido"));

    expect(comment.value).toBe("Necesito ayuda con mi pedido");
    expect(container.querySelector(".char-counter").textContent).toBe("28/500");
  });

  it("muestra el mensaje de envío solo después de enviar el formulario", async () => {
    const container = await render(<ContactPage />);
    expect(container.querySelector('[role="status"]')).toBeNull();

    await submit(container.querySelector("form"));

    expect(container.querySelector('[role="status"]').textContent).toBe("Mensaje enviado correctamente.");
  });

  it("muestra el carrito vacío solo cuando no hay productos", async () => {
    const container = await render(router(<CartProvider><CartPage /></CartProvider>));
    expect(container.textContent).toContain("Tu cesta está vacía.");
    expect(container.querySelector("#lista-carrito")).toBeNull();
  });

  it("muestra productos y total al cargar un carrito guardado", async () => {
    const product = cartFixture(2);
    const container = await render(router(<CartProvider><CartPage /></CartProvider>));

    expect(container.querySelector(".cart-item").textContent).toContain(product.name);
    expect(container.querySelector(".quantity-controls").textContent).toContain("2");
    expect(container.querySelector("#total-carrito").textContent).toContain("91.980");
  });

  it("aumenta la cantidad y persiste el carrito al pulsar el botón", async () => {
    cartFixture(1, 5);
    const container = await render(router(<CartProvider><CartPage /></CartProvider>));
    const increaseButton = container.querySelector('[aria-label="Aumentar cantidad"]');

    await act(async () => increaseButton.click());

    expect(container.querySelector(".quantity-controls").textContent).toContain("2");
    expect(JSON.parse(localStorage.getItem("cart"))[0].quantity).toBe(2);
  });

  it("deshabilita disminuir cuando la cantidad está en el mínimo", async () => {
    cartFixture(1, 5);
    const container = await render(router(<CartProvider><CartPage /></CartProvider>));

    expect(container.querySelector('[aria-label="Disminuir cantidad"]').disabled).toBeTrue();
  });

  it("muestra el botón de ingreso con etiqueta accesible y no llama a fetch para el admin demo", async () => {
    const container = await render(router(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<p>Panel administrador</p>} />
      </Routes>,
      "/login",
    ));
    const fetchSpy = spyOn(window, "fetch");

    expect(container.querySelector('button[type="submit"]').textContent).toBe("Ingresar");
    setFieldValue(container.querySelector("#login-email"), "admin");
    setFieldValue(container.querySelector("#login-password"), "123");
    await submit(container.querySelector("form"));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(container.textContent).toContain("Panel administrador");
    expect(JSON.parse(localStorage.getItem("sake_sesion")).rol).toBe("admin");
  });

  it("usa el backend ms-usuarios para autenticar cuentas no demo", async () => {
    const container = await render(router(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<p>Tienda</p>} />
      </Routes>,
      "/login",
    ));
    const fetchSpy = spyOn(window, "fetch").and.resolveTo({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ id: "cliente-42", email: "cliente@sake.cl", rol: "cliente" }),
    });
    setFieldValue(container.querySelector("#login-email"), "cliente@sake.cl");
    setFieldValue(container.querySelector("#login-password"), "clave-segura");

    await submit(container.querySelector("form"));

    expect(fetchSpy).toHaveBeenCalledWith(
      "http://localhost:8081/api/usuarios/login",
      jasmine.objectContaining({ method: "POST" }),
    );
    expect(container.textContent).toContain("Tienda");
  });

  it("permite ingresar como cliente demo y guarda la sesión", async () => {
    const container = await render(router(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<p>Tienda</p>} />
      </Routes>,
      "/login",
    ));
    setFieldValue(container.querySelector("#login-email"), "usuario 1");
    setFieldValue(container.querySelector("#login-password"), "123");

    await submit(container.querySelector("form"));

    expect(container.textContent).toContain("Tienda");
    expect(JSON.parse(localStorage.getItem("sake_sesion")).rol).toBe("cliente");
  });

  it("valida el RUT del registro antes de llamar al backend", async () => {
    const container = await render(<RegisterPage />);
    const fetchSpy = spyOn(window, "fetch");
    setFieldValue(container.querySelector("#register-name"), "Cliente de prueba");
    setFieldValue(container.querySelector("#register-run"), "123");
    setFieldValue(container.querySelector("#register-email"), "prueba@sake.cl");
    setFieldValue(container.querySelector("#register-address"), "Calle 1");
    setFieldValue(container.querySelector("#register-password"), "abcd");
    setFieldValue(container.querySelector("#register-confirm"), "abcd");

    await submit(container.querySelector("form"));

    expect(container.querySelector('[role="alert"]').textContent).toContain("RUT");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("envía el registro al backend ms-usuarios y presenta su respuesta", async () => {
    const container = await render(<RegisterPage />);
    const fetchSpy = spyOn(window, "fetch").and.resolveTo({
      ok: true,
      status: 201,
      text: async () => JSON.stringify({ mensaje: "Cuenta creada correctamente." }),
    });
    setFieldValue(container.querySelector("#register-name"), "Cliente de prueba");
    setFieldValue(container.querySelector("#register-run"), "12345678-9");
    setFieldValue(container.querySelector("#register-email"), "prueba@sake.cl");
    setFieldValue(container.querySelector("#register-address"), "Calle 1");
    setFieldValue(container.querySelector("#register-password"), "abcd");
    setFieldValue(container.querySelector("#register-confirm"), "abcd");

    await submit(container.querySelector("form"));

    expect(fetchSpy).toHaveBeenCalledWith(
      "http://localhost:8081/api/usuarios/registro",
      jasmine.objectContaining({ method: "POST" }),
    );
    expect(container.querySelector('[role="status"]').textContent).toContain("Cuenta creada");
  });

  it("muestra el error de pago solo si la navegación trae un error", async () => {
    const container = await render(router(
      <Routes>
        <Route path="/tienda/pago-error" element={<PaymentErrorPage />} />
      </Routes>,
      { pathname: "/tienda/pago-error", state: { error: "Pago rechazado" } },
    ));

    expect(container.querySelector('[role="alert"]').textContent).toBe("Pago rechazado");
  });

  it("muestra el error de pago guardado y permite borrarlo al reintentar", async () => {
    localStorage.setItem("sake_ultimo_error_pago", "Pago rechazado por el banco");
    const container = await render(router(
      <Routes>
        <Route path="/tienda/pago-error" element={<PaymentErrorPage />} />
      </Routes>,
      "/tienda/pago-error",
    ));

    expect(container.querySelector('[role="alert"]').textContent).toBe("Pago rechazado por el banco");
    await act(async () => container.querySelector('a[href="/tienda/checkout"]').click());
    expect(localStorage.getItem("sake_ultimo_error_pago")).toBeNull();
  });

  it("muestra un mensaje predeterminado de pago cuando no hay error guardado", async () => {
    const container = await render(router(
      <Routes>
        <Route path="/tienda/pago-error" element={<PaymentErrorPage />} />
      </Routes>,
      "/tienda/pago-error",
    ));

    expect(container.querySelector('[role="alert"]').textContent)
      .toBe("Inténtalo nuevamente. Tu carrito sigue guardado.");
  });

  it("renderiza filas de productos en el panel admin y elimina al confirmar", async () => {
    const product = createRecord("productos", {
      id: "admin-test-delete",
      name: "Producto admin de prueba",
      category: "mujer",
      price: 12000,
      stock: 8,
      image: "prueba.jpg",
    });
    const initialProductCount = products.length;
    const confirmSpy = spyOn(window, "confirm").and.returnValue(true);
    const container = await render(router(<ProductsAdminPage />));

    expect(container.querySelectorAll("tbody tr").length).toBe(initialProductCount);
    const row = [...container.querySelectorAll("tbody tr")]
      .find((tableRow) => tableRow.textContent.includes(product.name));
    expect(row).toBeDefined();

    await act(async () => row.querySelector("button").click());

    expect(confirmSpy).toHaveBeenCalledWith(`¿Eliminar "${product.name}"?`);
    expect(container.querySelectorAll("tbody tr").length).toBe(initialProductCount - 1);
    expect(container.textContent).not.toContain(product.name);
  });

  it("rechaza agregar un producto cuando supera el stock disponible", async () => {
    const product = { ...products[0], stock: 0 };
    localStorage.setItem(`sake_stock_${getProductStockCode(product)}_M`, "0");
    const container = await render(
      <CartProvider><CartActions product={product} /></CartProvider>,
    );

    await act(async () => container.querySelector("button").click());

    expect(container.querySelector('[role="alert"]').textContent).toContain("Stock insuficiente");
    expect(JSON.parse(localStorage.getItem("cart") || "[]")).toEqual([]);
  });

  it("elimina el producto seleccionado del carrito y persiste el cambio", async () => {
    const product = cartFixture(1, 5);
    const container = await render(
      <CartProvider><CartActions product={product} /></CartProvider>,
    );

    await act(async () => container.querySelectorAll("button")[1].click());

    expect(container.querySelector('[data-testid="cart-size"]').textContent).toBe("0");
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([]);
  });

  it("vacía el carrito y persiste una lista vacía", async () => {
    const product = cartFixture(2, 5);
    const container = await render(
      <CartProvider><CartActions product={product} /></CartProvider>,
    );

    await act(async () => container.querySelectorAll("button")[2].click());

    expect(container.querySelector('[data-testid="cart-size"]').textContent).toBe("0");
    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([]);
  });

  it("envía el checkout a ms-pagos y conserva solo los últimos cuatro dígitos", async () => {
    cartFixture(1, 5);
    const container = await render(router(
      <CartProvider>
        <Routes>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/tienda/pago-correcto" element={<p>Pago confirmado</p>} />
        </Routes>
      </CartProvider>,
      "/checkout",
    ));
    const fetchSpy = spyOn(window, "fetch").and.resolveTo({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ correoEnviado: true, pedidoId: "pedido-test" }),
    });
    setFieldValue(container.querySelector('[name="nombre"]'), "Cliente de prueba");
    setFieldValue(container.querySelector('[name="correo"]'), "cliente@sake.cl");
    setFieldValue(container.querySelector('[name="direccion"]'), "Calle 1");
    setFieldValue(container.querySelector('[name="region"]'), "Metropolitana de Santiago");
    setFieldValue(container.querySelector('[name="comuna"]'), "Santiago");
    setFieldValue(container.querySelector('[name="tarjeta"]'), "4111111111111234");

    await submit(container.querySelector("form"));

    expect(fetchSpy).toHaveBeenCalledWith(
      "http://localhost:8082/api/pagos",
      jasmine.objectContaining({ method: "POST" }),
    );
    expect(JSON.parse(localStorage.getItem("sake_ultima_orden")).tarjetaUltimos4).toBe("1234");
    expect(container.textContent).toContain("Pago confirmado");
  });
});
