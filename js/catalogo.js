// 1. LISTA DE PRODUCTOS
const productosGlobales = [
    // Hombre (1-11)
    { id: 1, code: "SKU-001", nombre: "POLERA BÁSICA HEAVYWEIGHT", precio: 29990, imagen: "Imagenes/PoleraNegra1.jpg" },
    { id: 2, code: "SKU-002", nombre: "POLERA OVERSIZED GRAPHIC", precio: 32990, imagen: "Imagenes/PoleraBlanca1.jpg" },
    { id: 3, code: "SKU-003", nombre: "PANTALÓN CARGO TAILORED", precio: 59990, imagen: "Imagenes/CargoHombre1.webp" },
    { id: 4, code: "SKU-004", nombre: "PANTALÓN CHINO STRAIGHT", precio: 49990, imagen: "Imagenes/PantalonLino1.webp" },
    { id: 5, code: "SKU-005", nombre: "CHAQUETA DENIM VINTAGE WASH", precio: 79990, imagen: "Imagenes/ChaquetaHombre1.webp" },
    { id: 6, code: "SKU-006", nombre: "BOMBER JACKET MINIMAL", precio: 89990, imagen: "Imagenes/ChaquetaCuero1.webp" },
    { id: 7, code: "SKU-007", nombre: "POLERÓN HOODIE HEAVY COTTON", precio: 45990, imagen: "Imagenes/PoleronGris1.webp" },
    { id: 8, code: "SKU-008", nombre: "POLERÓN CREWNECK ESSENTIAL", precio: 39990, imagen: "Imagenes/PoleronNegro1.jpg" },
    { id: 9, code: "SKU-009", nombre: "CAMISA LINO ESSENTIAL", precio: 42990, imagen: "Imagenes/CamisaHombre1.webp" },
    { id: 10, code: "SKU-010", nombre: "ZAPATILLAS LEATHER URBAN", precio: 69990, imagen: "Imagenes/ZapatoHombre1.jpg" },
    { id: 11, code: "SKU-011", nombre: "BOTAS LEATHER CHELSEA", precio: 89990, imagen: "Imagenes/BotaHombre1.jpg" },

    // Mujer (12-20)
    { id: 12, code: "SKU-012", nombre: "VESTIDO BOHO CHIC BORLAS", precio: 79990, imagen: "Imagenes/vestidojaponm.jpg" },
    { id: 13, code: "SKU-013", nombre: "VESTIDO LARGO SATINADO", precio: 69990, imagen: "Imagenes/mcpeter-5FdfBNJXo3k-unsplash.jpg" },
    { id: 14, code: "SKU-014", nombre: "CAMISA OVERSIZED LINO", precio: 49990, imagen: "Imagenes/amin-naderloei-Mg2chTCMzhk-unsplash.jpg" },
    { id: 15, code: "SKU-015", nombre: "BLUSA CUELLO BOBO BORDADO", precio: 45990, imagen: "Imagenes/praja-nugraha-v9A8fYRhrHA-unsplash.jpg" },
    { id: 16, code: "SKU-016", nombre: "TOP ESTRUCTURADO BLANCO", precio: 34990, imagen: "Imagenes/dwayne-joe-_6W3BYh6jGc-unsplash.jpg" },
    { id: 17, code: "SKU-017", nombre: "POLERA COTTON GRAPHIC", precio: 25990, imagen: "Imagenes/04424819250-p.jpg" },
    { id: 18, code: "SKU-018", nombre: "CHAQUETA OVERSIZED STRUCTURAL", precio: 89990, imagen: "Imagenes/04391810800-a1.jpg" },
    { id: 19, code: "SKU-019", nombre: "JEANS HIGH WAIST STRAIGHT", precio: 54990, imagen: "Imagenes/02569210400-p.jpg" },
    { id: 20, code: "SKU-020", nombre: "MOCASINES DE CUERO MINIMAL", precio: 65990, imagen: "Imagenes/13595610709-p.jpg" },

    // Niños (21-24)
    { id: 21, code: "SKU-021", nombre: "POLERA ALGODÓN ESTAMPADA", precio: 19990, imagen: "Imagenes/PoleraNino1.webp" },
    { id: 22, code: "SKU-022", nombre: "PANTALÓN FELPA", precio: 29990, imagen: "Imagenes/PantalonNino1.jpg" },
    { id: 23, code: "SKU-023", nombre: "CHAQUETA DENIM MINI", precio: 39990, imagen: "Imagenes/ChaquetaNino1.jpg" },
    { id: 24, code: "SKU-024", nombre: "ZAPATILLAS URBANAS KIDS", precio: 34990, imagen: "Imagenes/ZapatillaNino1.jpg" },

    // Accesorios (25-28)
    { id: 25, code: "SKU-025", nombre: "BOLSO DE CUERO MINIMALIST", precio: 89990, imagen: "Imagenes/Bolso1.jpg" },
    { id: 26, code: "SKU-026", nombre: "COLLAR PLATED GOLD", precio: 24990, imagen: "Imagenes/Collar1.jpg" },
    { id: 27, code: "SKU-027", nombre: "GAFAS DE SOL RETRO BLACK", precio: 32990, imagen: "Imagenes/Gafas1.jpg" },
    { id: 28, code: "SKU-028", nombre: "BUCKET HAT COTTON", precio: 18990, imagen: "Imagenes/Gorro1.jpg" }
];

// Obtener el correo almacenado al iniciar sesión
const obtenerCorreoUsuario = () => localStorage.getItem('usuarioCorreo') || 'usuario@ejemplo.com';

// 2. FUNCIÓN PARA AGREGAR AL CARRITO VÍA API
async function agregarAlCarrito(idProducto) {
    const producto = productosGlobales.find(item => item.id === idProducto);
    const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!producto) return;
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) existente.quantity = (Number(existente.quantity) || 1) + 1;
    else carrito.push({ id: producto.id, name: producto.nombre, price: producto.precio, image: producto.imagen, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(carrito));
    alert('¡Producto añadido a la cesta!');
    actualizarContadorCarrito();
}

// 3. ACTUALIZAR EL CONTADOR "CESTA (X)" DESDE LA API
async function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartLink = document.getElementById('cart-link');
    if (cartLink) cartLink.innerText = `CESTA (${carrito.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)})`;
}

// 4. SCROLL DEL MENÚ LATERAL
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.category-section');
    const navLinks = document.querySelectorAll('.menu-item');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-category');
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
            link.classList.add('active-category');
        }
    });
});

document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);