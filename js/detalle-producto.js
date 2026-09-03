let selectedSize = null;
let originalImages = [];
let extraColorImages = [];
let thirdColorImages = [];

let color1Name = "Negro";
let color2Name = "";
let color3Name = "";

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    const name = params.get('name') || "PRODUCTO SAKE";
    const price = params.get('price') || "-- CLP";
    const type = params.get('type') || "";
    
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
    } else if (originalImages.length > 0) {
        document.getElementById('detail-thumb-img1').src = originalImages[0];
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
    } else {
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
        };
        sizeSelector.appendChild(btn);
    });
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
        renderGallery(originalImages);
    } else if (selectedColor === 'color2') {
        thumb2.classList.add('active');
        colorLabel.textContent = `COLOR: ${color2Name}`;
        renderGallery(extraColorImages);
    } else if (selectedColor === 'color3') {
        thumb3.classList.add('active');
        colorLabel.textContent = `COLOR: ${color3Name}`;
        renderGallery(thirdColorImages);
    }
}

document.getElementById('btn-add').addEventListener('click', () => {
    if (!selectedSize) {
        alert('Por favor selecciona una talla.');
        return;
    }
    alert(`Añadido al carrito con talla: ${selectedSize}`);
});