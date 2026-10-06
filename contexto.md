# Proyecto: SAKE D. BINKS (tienda de moda) — migración a React (EP2 DSY1104)
Stack: Vite + React 18 + React Router + Bootstrap 5. Tests: Karma + Jasmine (ChromeHeadless, karma-coverage).
Origen: repo EP1 en HTML/CSS/JS vanilla (https://github.com/krizvlid/EVA01).
Backend ya hecho (REST/JSON):
- ms-usuarios :8081 -> POST /api/usuarios/registro, POST /api/usuarios/login, GET /api/usuarios/{id}
- ms-pagos :8082 -> POST /api/pagos, GET /api/pagos/historial?correo=
Datos de productos/categorías/órdenes: archivo JS simulado con CRUD + localStorage.
Tienda: Home, Productos, Detalle, Categorías, Ofertas, Registro, Login, Nosotros, Blogs (+2 detalles), Contacto, Carrito, Checkout, Pago correcto, Pago con error.
Admin (/admin): Dashboard, Órdenes/Boletas, Productos (nuevo/editar/críticos/reportes), Categorías, Usuarios (+historial), Reportes, Perfil.
Reglas: componentes pequeños (Single Responsibility), comentarios claros, no innerHTML con datos no confiables, solo últimos 4 dígitos de tarjeta, rutas protegidas.
Mínimo 10 pruebas unitarias con mocks y reporte de cobertura.
Yo debo poder explicar todo en una presentación oral individual: explica brevemente lo que hagas.