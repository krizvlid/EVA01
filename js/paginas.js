const allowedEmailDomains = ['gmail.com', 'duoc.cl', 'profesor.duoc.cl'];

// Lista completa de fotos del desfile
const galleryImages = [
    'Imagenes/Desfile1.jpg',
    'Imagenes/Desfile2.jpg',
    'Imagenes/Desfile3.jpg',
    'Imagenes/Desfile4.jpg',
    'Imagenes/Desfile5.jpg'
];

let currentImageIndex = 0;

/* ==========================================================================
   FUNCIONES GLOBALES DEL MODAL Y CARRUSEL
   ========================================================================== */
window.openModal = function(index) {
    currentImageIndex = index;
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    if (modal && modalImg) {
        modalImg.src = galleryImages[currentImageIndex];
        modal.style.display = 'flex';
    }
};

window.closeModal = function() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};

window.changeModalImage = function(event, direction) {
    if (event) event.stopPropagation(); // Evita que el modal se cierre al pulsar las flechas
    
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    const modalImg = document.getElementById('modal-img');
    if (modalImg) {
        modalImg.src = galleryImages[currentImageIndex];
    }
};

/* ==========================================================================
   VALIDACIONES DE FORMULARIOS
   ========================================================================== */
function validateEmail(value) {
    const email = value.trim().toLowerCase();
    const format = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/;
    if (!format.test(email)) return 'Ingresa un correo válido.';
    const domain = email.split('@')[1];
    return allowedEmailDomains.includes(domain) ? '' : 'Usa un dominio permitido: @gmail, @duoc.cl, @profesor.duoc.cl';
}

function validarRUN(run) {
    const runLimpio = run.trim().toUpperCase();
    const regexRun = /^[0-9]{6,8}[0-9K]$/;
    if (!regexRun.test(runLimpio)) return false;

    const cuerpo = runLimpio.slice(0, -1);
    const dvIngresado = runLimpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    let dvEsperado = '';
    if (resultado === 11) dvEsperado = '0';
    else if (resultado === 10) dvEsperado = 'K';
    else dvEsperado = resultado.toString();

    return dvIngresado === dvEsperado;
}

function setError(id, message) { 
    const el = document.getElementById(id);
    if (el) el.textContent = message; 
}

/* ==========================================================================
   DATOS DE LOS ARTÍCULOS
   ========================================================================== */
const articles = {
    silueta: { 
        category: 'Moda', 
        title: 'Adidas presenta un adelanto de su colaboración con la estrella del K-pop Jennie', 
        image: 'Imagenes/Noticia1.avif', 
        content: [
            'Adidas ha presentado un primer vistazo de su nueva colaboración con la estrella del K-pop Jennie...',
            'Tras protagonizar campañas de Adidas...',
            'La colección incluye las "Superstar SQ Ballet"...',
            '"Con esta colaboración, quería reinterpretar la identidad clásica..."',
            '"Me centré en crear un ambiente general que resultara atemporal..."',
            'En su última actualización de resultados...'
        ] 
    },
    texturas: { 
        category: 'Moda',
        title: 'La Semana de la Moda de Nueva York abraza el renacimiento de las marcas emblemáticas estadounidenses', 
        image: 'Imagenes/Noticia2.avif',  
        content: [
            'Esta “fashion week”, muy seguida, dará comienzo el miércoles —la víspera del inicio oficial— con los desfiles de Ralph Lauren y Coach...',
            'Los jóvenes consumidores de Asia y Norteamérica...',
            'Tommy Hilfiger, también asociado al legado estadounidense...',
            `<div class="carousel-container">
                <div class="carousel-track">
                    <div class="carousel-item">
                        <img src="Imagenes/Desfile1.jpg" alt="Desfile foto 1">
                        <button class="btn-ver-desfile" onclick="openModal(0)">Ver desfile</button>
                    </div>
                    <div class="carousel-item">
                        <img src="Imagenes/Desfile2.jpg" alt="Desfile foto 2">
                    </div>
                    <div class="carousel-item">
                        <img src="Imagenes/Desfile3.jpg" alt="Desfile foto 3">
                    </div>
                    <div class="carousel-item">
                        <img src="Imagenes/Desfile4.jpg" alt="Desfile foto 4">
                    </div>
                    <div class="carousel-item">
                        <img src="Imagenes/Desfile5.jpg" alt="Desfile foto 5">
                    </div>
                </div>
            </div>`,
            '“El regreso de Tommy Hilfiger es una gran incorporación...”',
            'No obstante, la demanda de prendas de gama alta...',
            'La guerra en Oriente Medio ha afectado al turismo...',
            'El diseñador Henry Zankov inaugurará oficialmente...',
            'En la lista de unos 70 desfiles y presentaciones...'
        ] 
    },
    armario: { 
        category: 'Guía', 
        title: 'El armario que sí funciona', 
        image: 'Imagenes/taylor-grote-rnH5ITofDAM-unsplash.jpg', 
        content: [
            'Un armario funcional comienza con prendas que conversan entre sí...',
            'La mejor combinación es la que te permite moverte...'
        ] 
    }
};

/* ==========================================================================
   INICIALIZACIÓN DE LA PÁGINA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const article = articles[new URLSearchParams(window.location.search).get('id')] || articles.silueta;
    const title = document.getElementById('article-title');
    
    if (title) {
        document.getElementById('article-category').textContent = article.category;
        title.textContent = article.title;
        const image = document.getElementById('article-image');
        if (image) {
            image.src = article.image;
            image.alt = article.title;
            image.className = 'img-subida';
        }
        
        const contentContainer = document.getElementById('article-content');
        if (contentContainer) {
            contentContainer.innerHTML = article.content
                .map(item => item.startsWith('<div') ? item : `<p>${item}</p>`)
                .join('');
        }
    }

    // Comentarios
    const comment = document.getElementById('contact-comment');
    if (comment) {
        comment.addEventListener('input', () => { 
            document.getElementById('comment-count').textContent = comment.value.length; 
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            setError('contact-name-error', ''); setError('contact-email-error', ''); setError('contact-comment-error', '');
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const commentValue = document.getElementById('contact-comment').value.trim();
            if (!name || name.length > 100) setError('contact-name-error', !name ? 'El nombre es obligatorio.' : 'Máximo 100 caracteres.');
            const emailError = validateEmail(email);
            if (!email || email.length > 100) setError('contact-email-error', !email ? 'El correo es obligatorio.' : 'Máximo 100 caracteres.');
            else if (emailError) setError('contact-email-error', emailError);
            if (!commentValue || commentValue.length > 500) setError('contact-comment-error', !commentValue ? 'El comentario es obligatorio.' : 'Máximo 500 caracteres.');
            if (document.querySelector('#contact-form .field-error:not(:empty)')) return;
            document.getElementById('contact-success').textContent = 'Mensaje enviado correctamente.';
            contactForm.reset(); document.getElementById('comment-count').textContent = '0';
        });
    }

    // Formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', event => {
            event.preventDefault();
            ['name', 'run', 'email', 'password', 'confirm'].forEach(field => setError(`register-${field}-error`, ''));
            const name = document.getElementById('register-name').value.trim();
            const runInput = document.getElementById('register-run');
            const run = runInput ? runInput.value.trim() : '';
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            
            if (!name) setError('register-name-error', 'El nombre completo es obligatorio.');
            if (!run) setError('register-run-error', 'El RUN es obligatorio.');
            else if (/[.-]/.test(run)) setError('register-run-error', 'El RUN debe ser sin puntos ni guión.');
            else if (run.length < 7 || run.length > 9) setError('register-run-error', 'El RUN debe tener entre 7 y 9 caracteres.');
            else if (!validarRUN(run)) setError('register-run-error', 'El RUN ingresado no es válido.');

            if (!email) setError('register-email-error', 'El correo es obligatorio.'); else if (validateEmail(email)) setError('register-email-error', validateEmail(email));
            if (!password) setError('register-password-error', 'La contraseña es obligatoria.');
            if (!confirm) setError('register-confirm-error', 'Confirma tu contraseña.'); else if (password !== confirm) setError('register-confirm-error', 'Las contraseñas no coinciden.');
            if (document.querySelector('#register-form .field-error:not(:empty)')) return;
            document.getElementById('register-success').textContent = 'Cuenta creada correctamente.';
            registerForm.reset();
        });
    }
});