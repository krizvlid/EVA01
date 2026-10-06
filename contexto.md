# Proyecto: SAKE D. BINKS (tienda de moda) - migración a React (EP2 DSY1104)
Stack: Vite + React 18 + React Router + Bootstrap 5. Tests: Karma + Jasmine (ChromeHeadless, karma-coverage).
Pruebas: `npm test` (una corrida con cobertura HTML/texto) y `npm run test:watch`.
Accesos demo: administrador `admin` / `123`; cliente `cliente` / `123`.
Origen: versión vanilla (HTML/CSS/JS) en este mismo repo: Inicio.html, css/, js/, Imagenes/.
Backend ya hecho (REST/JSON):
- ms-usuarios :8081 -> POST /api/usuarios/registro, POST /api/usuarios/login, GET /api/usuarios/{id}
- ms-pagos :8082 -> POST /api/pagos, GET /api/pagos/historial?correo=
Datos de productos/categorías/órdenes: `src/data/storefrontData.js` con CRUD + localStorage. Usuarios de demostración y apoyo de autenticación: `src/data/mockStore.js`.
Tienda: Home, Productos, Detalle, Categorías, Ofertas, Registro, Login, Nosotros, Blogs (+2 detalles), Contacto, Carrito, Checkout, Pago correcto, Pago con error.
Admin (/admin): Dashboard, Órdenes/Boletas, Productos (nuevo/editar/críticos/reportes), Categorías, Usuarios (+historial), Reportes, Perfil.
Reglas: componentes pequeños (Single Responsibility), comentarios claros, no innerHTML con datos no confiables, solo últimos 4 dígitos de tarjeta, rutas protegidas.
Mínimo 10 pruebas unitarias con mocks y reporte de cobertura.
Debo poder explicar todo en una presentación oral individual: explica brevemente lo que hagas.
Mantener la identidad visual de la versión vanilla (colores, tipografía, imágenes).
REGLA DE FIDELIDAD: la versión vanilla es la fuente de verdad visual. Portar su HTML y CSS casi literal a JSX (mismas clases, estructura, textos, iconos y orden de elementos). No rediseñar ni "mejorar" nada. Solo se agregan elementos nuevos cuando la EP2 los exige (nuevas vistas y links de navbar).

Estructura: la aplicación React vive en `src/` (componentes, páginas, datos y estilos); sus pruebas están en `tests/`. La versión vanilla original se conserva en los HTML de la raíz y en `css/`, `js/` e `Imagenes/` para mantener sus rutas relativas y usarla como referencia.