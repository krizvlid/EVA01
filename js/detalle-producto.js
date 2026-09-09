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

// Cambia la descripción/materiales solo si es perfume o fragancia
function actualizarDetallesSegunProducto(nombre, tipo) {
    const n = nombre.toLowerCase();
    const t = tipo.toLowerCase();

    // Comprobamos si el producto es un perfume / parfum / fragancia
    const esPerfume = n.includes('parfum') || n.includes('perfume') || n.includes('fragancia') || t.includes('parfum') || t.includes('perfume');

    if (esPerfume) {
        // Buscamos cualquier elemento que contenga el texto de materiales para reemplazarlo dinámicamente
        const todosLosElementos = document.querySelectorAll('p, div, span');
        
        // 1. Cambiar texto de Materiales
        todosLosElementos.forEach(el => {
            if (el.children.length === 0 && (el.textContent.includes('100% materiales de primera selección') || el.textContent.includes('Lavar a mano'))) {
                el.textContent = "Extractos de aceites esenciales de primera calidad, alcohol desnaturalizado vegetal y agua desmineralizada. Frasco de vidrio de densidad superior con atomizador de precisión.";
            }
        });

        // 2. Si existe un contenedor de Descripción, agregar las notas olfativas
        const descElement = document.getElementById('detail-description');
        if (descElement) {
            descElement.textContent = `${nombre} es una fragancia exclusiva que destaca por sus notas de salida de violetas frescas y cítricos sutiles, un corazón floral de iris y lavanda, y un fondo de madera noble, ámbar y almizcle.`;
        }
    }
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

    const detailTitle = document.getElementById('detail-title');
    const detailPrice = document.getElementById('detail-price');
    const detailColorLabel = document.getElementById('detail-color-label');

    if (detailTitle) detailTitle.textContent = name;
    if (detailPrice) detailPrice.textContent = price;
    if (detailColorLabel) detailColorLabel.textContent = `COLOR: ${color1Name}`;
    
    selectedProductColor = color1Name;
    if (productCode) productCode.textContent = params.get('code') || skuPorProducto[name] || generarSku(name);
    if (productStock) productStock.textContent = '--';
    
    const btnDecrease = document.getElementById('quantity-decrease');
    const btnIncrease = document.getElementById('quantity-increase');
    if (btnDecrease && quantity) btnDecrease.onclick = () => updateQuantity(Number(quantity.value) - 1);
    if (btnIncrease && quantity) btnIncrease.onclick = () => updateQuantity(Number(quantity.value) + 1);
    if (quantity) quantity.addEventListener('input', () => updateQuantity(Number(quantity.value)));

    // Aplicar reemplazo dinámico solo para Perfumes
    actualizarDetallesSegunProducto(name, type);

    // 1. Cargar las imágenes del producto principal (Color 1)
    let imgIndex = 1;
    while (params.has(`img${imgIndex}`)) {
        originalImages.push(params.get(`img${imgIndex}`));
        imgIndex++;
    }

    renderGallery(originalImages);

    // Asignar miniatura al color 1
    const thumbImg1 = document.getElementById('detail-thumb-img1');
    if (thumb1 && thumbImg1) {
        thumbImg1.src = thumb1;
        selectedProductImage = thumb1;
    } else if (originalImages.length > 0) {
        if (thumbImg1) thumbImg1.src = originalImages[0];
        selectedProductImage = originalImages[0];
    }

    // 2. Si existe un segundo color, mostrarlo
    if (thumb2) {
        const thumb2Box = document.getElementById('thumb-color2');
        const thumbImg2 = document.getElementById('detail-thumb-img2');
        if (thumbImg2) thumbImg2.src = thumb2;
        if (thumb2Box) thumb2Box.style.display = 'block';

        if (c2_img1) extraColorImages.push(c2_img1);
        if (c2_img2) extraColorImages.push(c2_img2);
    }

    // 3. Si existe un tercer color, mostrarlo
    if (thumb3) {
        const thumb3Box = document.getElementById('thumb-color3');
        const thumbImg3 = document.getElementById('detail-thumb-img3');
        if (thumbImg3) thumbImg3.src = thumb3;
        if (thumb3Box) thumb3Box.style.display = 'block';

        if (c3_img1) thirdColorImages.push(c3_img1);
        if (c3_img2) thirdColorImages.push(c3_img2);
    }

    // Gestión del selector de Tallas
    const sizeSelector = document.getElementById('size-selector');
    const sizeLabel = document.getElementById('size-label');
    const sizeGuideLink = document.querySelector('.size-guide-link, a[href*="guia"]');
    
    let sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const normalizedName = name.toLowerCase();
    const isPants = type.toLowerCase() === 'pantalones' || /pantal[oó]n|jeans/.test(normalizedName);
    const isAccesorios = type.toLowerCase() === 'accesorios' || /collar|bolso|maleta|guantes|parfum|perfume|gafas|bucket/i.test(normalizedName);

    if (isAccesorios) {
        // Ocultar la fila de selección de tallas para accesorios
        if (sizeLabel) sizeLabel.style.display = 'none';
        if (sizeSelector) sizeSelector.style.display = 'none';
        if (sizeGuideLink) sizeGuideLink.style.display = 'none';
        
        selectedSize = 'Única';
        const accesorioStock = obtenerStockTalla(productCode ? productCode.textContent.trim() : name, selectedSize);
        if (productStock) productStock.textContent = accesorioStock;
        updateQuantity(accesorioStock > 0 ? 1 : 0);
    } else {
        if (sizeLabel) sizeLabel.style.display = 'block';
        if (sizeSelector) sizeSelector.style.display = 'flex';
        if (sizeGuideLink) sizeGuideLink.style.display = 'inline-block';

        if (isPants) {
            sizes = ['28/30', '30/30', '32/30', '34/32', '36/32'];
            if (sizeLabel) sizeLabel.textContent = 'CINTURA / LARGO:';
        } else if (type.toLowerCase() === 'zapatos' || normalizedName.includes('mocasines') || normalizedName.includes('zapato')) {
            sizes = ['35', '36', '37', '38', '39', '40', '41', '42'];
            if (sizeLabel) sizeLabel.textContent = 'TALLA CALZADO (EU):';
        } else if (type.toLowerCase() === 'zapatillas' || normalizedName.includes('zapatilla')) {
            sizes = ['24', '26', '28', '30', '32', '34'];
            if (sizeLabel) sizeLabel.textContent = 'TALLA CALZADO (EU):'; 
        } else {
            if (sizeLabel) sizeLabel.textContent = 'TALLA:';
        }

        if (sizeSelector) {
            sizeSelector.innerHTML = '';
            sizes.forEach(size => {
                const btn = document.createElement('button');
                btn.className = 'size-btn';
                btn.textContent = size;
                btn.onclick = () => {
                    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedSize = size;
                    const stockTalla = obtenerStockTalla(productCode ? productCode.textContent.trim() : name, size);
                    if (productStock) productStock.textContent = stockTalla;
                    updateQuantity(stockTalla > 0 ? Number(quantity.value) || 1 : 0);
                };
                sizeSelector.appendChild(btn);
            });

            if (sizes.length > 0) {
                const firstSizeButton = sizeSelector.querySelector('.size-btn');
                selectedSize = sizes[0];
                if (firstSizeButton) firstSizeButton.classList.add('active');
                const firstSizeStock = obtenerStockTalla(productCode ? productCode.textContent.trim() : name, selectedSize);
                if (productStock) productStock.textContent = firstSizeStock;
                updateQuantity(firstSizeStock > 0 ? 1 : 0);
            }
        }
    }
});

function renderGallery(imagesArray) {
    const gallery = document.getElementById('gallery-container');
    if (!gallery) return;
    gallery.innerHTML = '';
    imagesArray.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        gallery.appendChild(imgElement);
    });
}

function changeProductColor(selectedColor) {
    const thumb1 = document.getElementById('thumb-color1');
    const thumb2 = document.getElementById('thumb-color2');
    const thumb3 = document.getElementById('thumb-color3');
    const colorLabel = document.getElementById('detail-color-label');

    if (thumb1) thumb1.classList.remove('active');
    if (thumb2) thumb2.classList.remove('active');
    if (thumb3) thumb3.classList.remove('active');

    if (selectedColor === 'color1' && thumb1) {
        thumb1.classList.add('active');
        if (colorLabel) colorLabel.textContent = `COLOR: ${color1Name}`;
        selectedProductColor = color1Name;
        const img1 = document.getElementById('detail-thumb-img1');
        if (img1) selectedProductImage = img1.src;
        renderGallery(originalImages);
    } else if (selectedColor === 'color2' && thumb2) {
        thumb2.classList.add('active');
        if (colorLabel) colorLabel.textContent = `COLOR: ${color2Name}`;
        selectedProductColor = color2Name;
        const img2 = document.getElementById('detail-thumb-img2');
        if (img2) selectedProductImage = img2.src;
        renderGallery(extraColorImages);
    } else if (selectedColor === 'color3' && thumb3) {
        thumb3.classList.add('active');
        if (colorLabel) colorLabel.textContent = `COLOR: ${color3Name}`;
        selectedProductColor = color3Name;
        const img3 = document.getElementById('detail-thumb-img3');
        if (img3) selectedProductImage = img3.src;
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
    const reqInput = document.getElementById('product-quantity');
    const requested = reqInput ? Number(reqInput.value) : 1;
    let valid = true;
    
    const errCode = document.getElementById('product-code-error');
    const errStock = document.getElementById('product-stock-error');
    if (errCode) errCode.textContent = '';
    if (errStock) errStock.textContent = '';

    const codeText = code ? code.textContent.trim() : '';
    const stockNum = stock ? Number(stock.textContent) : 0;

    if (codeText.length < 3) { if (errCode) errCode.textContent = 'Mínimo 3 caracteres.'; valid = false; }
    if (!Number.isInteger(stockNum) || stockNum < 0) { if (errStock) errStock.textContent = 'Debe ser un entero igual o mayor a 0.'; valid = false; }
    if (requested > stockNum) { if (errStock) errStock.textContent = 'La cantidad supera el stock disponible.'; valid = false; }
    if (stockNum === 0) { if (errStock) errStock.textContent = 'Producto sin stock disponible.'; valid = false; }
    if (!valid) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const titleElem = document.getElementById('detail-title');
    const priceElem = document.getElementById('detail-price');

    const product = {
        code: codeText,
        name: titleElem ? titleElem.textContent : '',
        price: priceElem ? priceElem.textContent : '',
        image: selectedProductImage || originalImages[0] || '',
        color: selectedProductColor,
        size: selectedSize,
        quantity: requested,
        stock: stockNum
    };

    const existingProduct = cart.find(item =>
        normalizarDatoCarrito(item.code) === normalizarDatoCarrito(product.code)
        && normalizarDatoCarrito(item.name) === normalizarDatoCarrito(product.name)
        && normalizarDatoCarrito(item.size) === normalizarDatoCarrito(product.size)
        && normalizarDatoCarrito(item.color) === normalizarDatoCarrito(product.color)
    );

    if (existingProduct) {
        if (existingProduct.quantity + requested > stockNum) {
            if (errStock) errStock.textContent = 'La cantidad total supera el stock disponible.';
            return;
        }
        existingProduct.quantity += requested;
        existingProduct.stock = stockNum;
        existingProduct.image = product.image;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarContadorLocal();
    
    const mensajeTalla = selectedSize === 'Única' ? '' : `, talla ${selectedSize}`;
    alert(`Añadido al carrito: ${requested} unidad(es)${mensajeTalla}.`);
}

const btnAdd = document.getElementById('btn-add');
if (btnAdd) btnAdd.addEventListener('click', ejecutarAgregarAlCarrito);

function actualizarContadorLocal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = total;
}

function updateQuantity(value) {
    const quantity = document.getElementById('product-quantity');
    const stockElem = document.getElementById('product-stock');
    if (!quantity || !stockElem) return;
    const stock = Number(stockElem.textContent);
    const maximum = Number.isInteger(stock) && stock >= 0 ? stock : 0;
    quantity.value = maximum === 0 ? 0 : Math.max(1, Math.min(maximum, Number.isFinite(value) ? value : 1));
}