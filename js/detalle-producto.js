let selectedSize = null;
let originalImages = [];
let extraColorImages = [];
let thirdColorImages = [];
let selectedProductImage = '';
let selectedProductColor = '';

let color1Name = "Negro";
let color2Name = "";
let color3Name = "";

const stockPorProducto = {
    'BOLSO DE CUERO MINIMALIST': 12,
    'COLLAR PLATED GOLD': 18,
    'GAFAS DE SOL RETRO BLACK': 7,
    'BUCKET HAT COTTON': 15,
    'CAMISA REGULAR FIT': 8,
    'CAMISA ESTRUCTURADA OXFORD': 11,
    'POLERA HEAVY COTTON OVERSIZED': 6,
    'CHAQUETA CAZADORA OXFORD': 9,
    'PANTALON CHINO TAPERED': 13,
    'ABRIGO MEZCLA LANA': 4,
    'MOCASINES DE CUERO DERBY': 5,
    'VESTIDO BOHO CHIC BORLAS': 10,
    'VESTIDO LARGO SATINADO': 14,
    'CAMISA OVERSIZED LINO': 16,
    'BLUSA CUELLO BOBO BORDADO': 17,
    'TOP ESTRUCTURADO BLANCO': 19,
    'POLERA COTTON GRAPHIC': 20,
    'CHAQUETA OVERSIZED STRUCTURAL': 3,
    'JEANS HIGH WAIST STRAIGHT': 8,
    'MOCASINES DE CUERO MINIMAL': 6,
    'POLERA ALGODON ESTAMPADA': 21,
    'PANTALON FELPA RELAXED FIT': 22,
    'CHAQUETA DENIM MINI': 23,
    'ZAPATILLAS URBANAS KIDS': 24
};

const skuPorProducto = {
    'BOLSO DE CUERO MINIMALIST': 'SKU-025',
    'COLLAR PLATED GOLD': 'SKU-026',
    'GAFAS DE SOL RETRO BLACK': 'SKU-027',
    'BUCKET HAT COTTON': 'SKU-028',
    'CAMISA REGULAR FIT': 'SKU-001',
    'CAMISA ESTRUCTURADA OXFORD': 'SKU-002',
    'POLERA HEAVY COTTON OVERSIZED': 'SKU-003',
    'CHAQUETA CAZADORA OXFORD': 'SKU-004',
    'PANTALON CHINO TAPERED': 'SKU-005',
    'ABRIGO MEZCLA LANA': 'SKU-006',
    'MOCASINES DE CUERO DERBY': 'SKU-007',
    'VESTIDO BOHO CHIC BORLAS': 'SKU-008',
    'VESTIDO LARGO SATINADO': 'SKU-009',
    'CAMISA OVERSIZED LINO': 'SKU-010',
    'BLUSA CUELLO BOBO BORDADO': 'SKU-011',
    'TOP ESTRUCTURADO BLANCO': 'SKU-012',
    'POLERA COTTON GRAPHIC': 'SKU-013',
    'CHAQUETA OVERSIZED STRUCTURAL': 'SKU-014',
    'JEANS HIGH WAIST STRAIGHT': 'SKU-015',
    'MOCASINES DE CUERO MINIMAL': 'SKU-016',
    'POLERA ALGODON ESTAMPADA': 'SKU-017',
    'PANTALON FELPA RELAXED FIT': 'SKU-018',
    'CHAQUETA DENIM MINI': 'SKU-019',
    'ZAPATILLAS URBANAS KIDS': 'SKU-020'
};

function generarSku(nombre) {
    let hash = 0;
    for (let i = 0; i < nombre.length; i++) hash = (hash * 31 + nombre.charCodeAt(i)) % 900;
    return `SKU-${String(hash + 100).padStart(3, '0')}`;
}

function stockTallaKey(codigo, talla) {
    return `sake_stock_${codigo}_${encodeURIComponent(talla)}`;
}

function stockInicialTalla(codigo, talla) {
    const texto = `${codigo}-${talla}`;
    let hash = 0;
    for (let i = 0; i < texto.length; i++) hash = (hash * 31 + texto.charCodeAt(i)) % 15;
    return hash + 1;
}

function obtenerStockTalla(codigo, talla) {
    const key = stockTallaKey(codigo, talla);
    const guardado = localStorage.getItem(key);
    if (guardado !== null && Number.isInteger(Number(guardado))) return Number(guardado);
    const inicial = stockInicialTalla(codigo, talla);
    localStorage.setItem(key, String(inicial));
    return inicial;
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    const name = params.get('name') || "PRODUCTO SAKE";
    const price = params.get('price') || "-- CLP";
    const type = params.get('type') || "";
    const productCode = document.getElementById('product-code');
    const productStock = document.getElementById('product-stock');
    const quantity = document.getElementById('product-quantity');
    
    color1Name = params.get('color') || "Negro";
    color2Name = params.get('color2_name') || "";
    color3Name = params.get('color3_name') || "";

    const thumb1 = params.get('thumb1');
    const thumb2 = params.get('thumb2');
    const thumb3 = params.get('thumb3');
    
    const c2_img1 = params.get('c2_img1');
    const c2_img2 = params.get('c2_img2');

    const c3_img1 = params.get('c3_img1');
    const c3_img2 = params.get('c3_img2');

    document.getElementById('detail-title').textContent = name;
    document.getElementById('detail-price').textContent = price;
    document.getElementById('detail-color-label').textContent = `COLOR: ${color1Name}`;
    selectedProductColor = color1Name;
    productCode.textContent = params.get('code') || skuPorProducto[name] || generarSku(name);
    productStock.textContent = '--';
    document.getElementById('quantity-decrease').onclick = () => updateQuantity(Number(quantity.value) - 1);
    document.getElementById('quantity-increase').onclick = () => updateQuantity(Number(quantity.value) + 1);
    quantity.addEventListener('input', () => updateQuantity(Number(quantity.value)));

    // 1. Cargar las imágenes del producto principal (Color 1)
    let imgIndex = 1;
    while (params.has(`img${imgIndex}`)) {
        originalImages.push(params.get(`img${imgIndex}`));
        imgIndex++;
    }

    renderGallery(originalImages);

    // Asignar miniatura al color 1
    if (thumb1) {
        document.getElementById('detail-thumb-img1').src = thumb1;
        selectedProductImage = thumb1;
    } else if (originalImages.length > 0) {
        document.getElementById('detail-thumb-img1').src = originalImages[0];
        selectedProductImage = originalImages[0];
    }

    // 2. Si existe un segundo color, mostrarlo y guardar sus imágenes
    if (thumb2) {
        const thumb2Box = document.getElementById('thumb-color2');
        document.getElementById('detail-thumb-img2').src = thumb2;
        thumb2Box.style.display = 'block';

        if (c2_img1) extraColorImages.push(c2_img1);
        if (c2_img2) extraColorImages.push(c2_img2);
    }

    // 3. Si existe un tercer color, mostrarlo y guardar sus imágenes
    if (thumb3) {
        const thumb3Box = document.getElementById('thumb-color3');
        document.getElementById('detail-thumb-img3').src = thumb3;
        thumb3Box.style.display = 'block';

        if (c3_img1) thirdColorImages.push(c3_img1);
        if (c3_img2) thirdColorImages.push(c3_img2);
    }

    // Generar botones de tallas
    const sizeSelector = document.getElementById('size-selector');
    const sizeLabel = document.getElementById('size-label');
    
    let sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const normalizedName = name.toLowerCase();
    const isPants = type.toLowerCase() === 'pantalones'
        || /pantal[oó]n|jeans/.test(normalizedName);

    if (isPants) {
        sizes = ['28/30', '30/30', '32/30', '34/32', '36/32'];
        sizeLabel.textContent = 'CINTURA / LARGO:';
    } else if (type.toLowerCase() === 'zapatos' || normalizedName.includes('mocasines') || normalizedName.includes('zapato')) {
        sizes = ['35', '36', '37', '38', '39', '40', '41', '42'];
        sizeLabel.textContent = 'TALLA CALZADO (EU):';
    }else if (type.toLowerCase() === 'zapatillas' || normalizedName.includes('zapatilla') || normalizedName.includes('zapato')) {
        sizes = ['24', '26', '28', '30', '32', '34'];
        sizeLabel.textContent = 'TALLA CALZADO (EU):'; 
    }else {
        sizeLabel.textContent = 'TALLA:';
    }

    sizeSelector.innerHTML = '';
    sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.textContent = size;
        btn.onclick = () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = size;
            const stockTalla = obtenerStockTalla(productCode.textContent.trim(), size);
            productStock.textContent = stockTalla;
            updateQuantity(stockTalla > 0 ? Number(quantity.value) || 1 : 0);
        };
        sizeSelector.appendChild(btn);
    });

    if (sizes.length > 0) {
        const firstSizeButton = sizeSelector.querySelector('.size-btn');
        selectedSize = sizes[0];
        firstSizeButton.classList.add('active');
        const firstSizeStock = obtenerStockTalla(productCode.textContent.trim(), selectedSize);
        productStock.textContent = firstSizeStock;
        updateQuantity(firstSizeStock > 0 ? 1 : 0);
    }
});

// Función para renderizar la galería lateral
function renderGallery(imagesArray) {
    const gallery = document.getElementById('gallery-container');
    gallery.innerHTML = '';
    imagesArray.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        gallery.appendChild(imgElement);
    });
}

// Función para alternar colores
function changeProductColor(selectedColor) {
    const thumb1 = document.getElementById('thumb-color1');
    const thumb2 = document.getElementById('thumb-color2');
    const thumb3 = document.getElementById('thumb-color3');
    const colorLabel = document.getElementById('detail-color-label');

    thumb1.classList.remove('active');
    thumb2.classList.remove('active');
    thumb3.classList.remove('active');

    if (selectedColor === 'color1') {
        thumb1.classList.add('active');
        colorLabel.textContent = `COLOR: ${color1Name}`;
        selectedProductColor = color1Name;
        selectedProductImage = document.getElementById('detail-thumb-img1').src;
        renderGallery(originalImages);
    } else if (selectedColor === 'color2') {
        thumb2.classList.add('active');
        colorLabel.textContent = `COLOR: ${color2Name}`;
        selectedProductColor = color2Name;
        selectedProductImage = document.getElementById('detail-thumb-img2').src;
        renderGallery(extraColorImages);
    } else if (selectedColor === 'color3') {
        thumb3.classList.add('active');
        colorLabel.textContent = `COLOR: ${color3Name}`;
        selectedProductColor = color3Name;
        selectedProductImage = document.getElementById('detail-thumb-img3').src;
        renderGallery(thirdColorImages);
    }
}

function normalizarDatoCarrito(valor) {
    return String(valor || '').trim().toLocaleUpperCase('es-CL');
}

function ejecutarAgregarAlCarrito() {
    if (!selectedSize) {
        alert('Por favor selecciona una talla.');
        return;
    }
    const code = document.getElementById('product-code');
    const stock = document.getElementById('product-stock');
    const requested = Number(document.getElementById('product-quantity').value);
    let valid = true;
    document.getElementById('product-code-error').textContent = '';
    document.getElementById('product-stock-error').textContent = '';
    if (code.textContent.trim().length < 3) { document.getElementById('product-code-error').textContent = 'Mínimo 3 caracteres.'; valid = false; }
    if (!Number.isInteger(Number(stock.textContent)) || Number(stock.textContent) < 0) { document.getElementById('product-stock-error').textContent = 'Debe ser un entero igual o mayor a 0.'; valid = false; }
    if (requested > Number(stock.textContent)) { document.getElementById('product-stock-error').textContent = 'La cantidad supera el stock disponible.'; valid = false; }
    if (Number(stock.textContent) === 0) { document.getElementById('product-stock-error').textContent = 'Producto sin stock disponible.'; valid = false; }
    if (!valid) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
        code: code.textContent.trim(),
        name: document.getElementById('detail-title').textContent,
        price: document.getElementById('detail-price').textContent,
        image: selectedProductImage || originalImages[0] || '',
        color: selectedProductColor,
        size: selectedSize,
        quantity: requested,
        stock: Number(stock.textContent)
    };
    const existingProduct = cart.find(item =>
        normalizarDatoCarrito(item.code) === normalizarDatoCarrito(product.code)
        && normalizarDatoCarrito(item.name) === normalizarDatoCarrito(product.name)
        && normalizarDatoCarrito(item.size) === normalizarDatoCarrito(product.size)
        && normalizarDatoCarrito(item.color) === normalizarDatoCarrito(product.color)
    );
    if (existingProduct) {
        if (existingProduct.quantity + requested > Number(stock.textContent)) {
            document.getElementById('product-stock-error').textContent = 'La cantidad total supera el stock disponible.';
            return;
        }
        existingProduct.quantity += requested;
        existingProduct.stock = Number(stock.textContent);
        existingProduct.image = product.image;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarContadorLocal();
    alert(`Añadido al carrito: ${requested} unidad(es), talla ${selectedSize}.`);
}

document.getElementById('btn-add').addEventListener('click', ejecutarAgregarAlCarrito);

function actualizarContadorLocal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = total;
}

function updateQuantity(value) {
    const quantity = document.getElementById('product-quantity');
    const stock = Number(document.getElementById('product-stock').textContent);
    const maximum = Number.isInteger(stock) && stock >= 0 ? stock : 0;
    quantity.value = maximum === 0 ? 0 : Math.max(1, Math.min(maximum, Number.isFinite(value) ? value : 1));
}

