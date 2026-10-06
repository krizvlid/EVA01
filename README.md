# SAKE D. BINKS

Tienda de moda migrada a React para EP2 DSY1104. El repositorio conserva también
la versión original en HTML, CSS y JavaScript como referencia visual.

## Estructura

```text
.
├── index.html                 # Entrada de Vite para la aplicación React
├── src/
│   ├── components/            # Componentes compartidos por área
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── layout/
│   │   └── storefront/
│   ├── data/                  # Datos y persistencia local
│   ├── pages/                 # Páginas de tienda y administración
│   │   └── admin/
│   ├── styles/                # Estilos globales de React
│   ├── App.jsx                # Rutas
│   └── main.jsx               # Montaje de React
├── tests/                     # Pruebas y utilidades de test
├── Imagenes/                  # Imágenes usadas por ambas versiones
├── css/                       # Estilos de la versión vanilla original
├── js/                        # Scripts de la versión vanilla original
├── Inicio.html, Login.html…   # Páginas vanilla originales (excepto index.html)
├── vite.config.js
├── karma.conf.cjs
└── contexto.md                # Requisitos y contexto de la evaluación
```

Los archivos HTML originales, `css/` y `js/` se mantienen en la raíz porque
usan rutas relativas entre sí y son la referencia visual de la evaluación. No
son páginas de entrada de la aplicación React. `index.html` sí es la entrada
React que sirve Vite.

## Comandos

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

`dist/`, `coverage/`, `.vite/` y `node_modules/` son carpetas generadas o
instaladas localmente; no contienen el código fuente que se debe editar.

## Datos de demostración

- Administrador: `admin` / `123`
- Cliente: `usuario 1` / `123`
