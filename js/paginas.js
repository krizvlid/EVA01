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
    return /^[0-9]{8}-[0-9]$/.test(run.trim());
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
            'Tras protagonizar campañas de Adidas y ejercer como embajadora de la marca alemana, Jennie asume ahora el papel de codiseñadora con el lanzamiento de la colección "Adidas Originals by Jennie".',
            'Con lanzamiento el 1 de septiembre, la colección reimagina la funcionalidad de inspiración deportiva de Adidas a través de la estética distintiva de la cantante, en particular la del ballet, cuyos códigos se dejan ver a lo largo de toda la colección.',
            'La colección incluye las "Superstar SQ Ballet", inspiradas en las zapatillas de punta, junto con chaquetas y pantalones de chándal reinterpretados, camisetas, faldas cruzadas, chaquetas de punto cruzadas, bodies sin mangas transparentes, leggings transparentes y sudaderas de forro polar con media cremallera y capucha; y, en cuanto a los complementos, calentadores altos de punto y calcetines con aberturas.',
            '"Con esta colaboración, quería reinterpretar la identidad clásica de Adidas Originals desde mi propia perspectiva y energía. Mi objetivo era aunar la suavidad y la contención propias del ballet, así como la fuerza que hay detrás de él, con la sensación de un espacio infinito y desconocido", afirmó Jennie, quien alcanzó la fama mundial como miembro del grupo de pop coreano Blackpink antes de iniciar en paralelo una carrera en solitario. ',
            '"Me centré en crear un ambiente general que resultara atemporal y, al mismo tiempo, con visión de futuro —cinematográfico y surrealista—, con una presencia discreta pero poderosa", indicó la artista.',
            'En su última actualización de resultados, publicada en julio, la empresa con sede en Herzogenaurach señaló que los ingresos aumentaron un 13 % en el segundo trimestre, hasta alrededor de 6700 millones de euros, impulsados por la Copa Mundial de la FIFA.'
        ] 
    },
    texturas: { 
        category: 'Moda',
        title: 'La Semana de la Moda de Nueva York abraza el renacimiento de las marcas emblemáticas estadounidenses', 
        image: 'Imagenes/Noticia2.avif',  
        content: [
            'Esta “fashion week”, muy seguida, dará comienzo el miércoles —la víspera del inicio oficial— con los desfiles de Ralph Lauren y Coach, marcas que han registrado un sólido crecimiento en los últimos meses.',
            'Los jóvenes consumidores de Asia y Norteamérica han mostrado preferencia tanto por los renovados jerséis de punto trenzado y los polos de Ralph Lauren como por los bolsos Tabby de Coach.',
            'Tommy Hilfiger, también asociado al legado estadounidense, pone fin a su ausencia en el evento y regresa a la pasarela tras lanzar una colaboración con la estrella de la NFL Travis Kelce.',
            '“El regreso de Tommy Hilfiger es una gran incorporación a las marcas de legado estadounidense que están presentes y siguen vigentes”, afirmó Tori López, editora de moda de la revista W. “Vuelve a encajar muy bien en esa familia”, valoró.',
            'No obstante, la demanda de prendas de gama alta en Estados Unidos ha sido desigual. Michael Kors, que también celebrará un desfile, se ha enfrentado a unas ventas estancadas en los últimos años.',
            'La guerra en Oriente Medio ha afectado al turismo en Europa, lastrando al sector del lujo en su conjunto. El crecimiento en EE. UU., impulsado por marcas nacionales y el gasto de los consumidores más jóvenes, está compensando en parte la desaceleración en Oriente Medio y Europa, según señaló este verano la consultora Bain & Company.',
            'El diseñador Henry Zankov inaugurará oficialmente la Semana de la Moda de Nueva York el jueves con su primera colección para Diane von Furstenberg, mientras que Thom Browne clausurará el evento, que se prolongará hasta el 15 de septiembre.',
            'En la lista de unos 70 desfiles y presentaciones de diseñadores también figuran marcas consolidadas como Carolina Herrera, Christian Siriano y Calvin Klein. Además, Conner Ives, diseñador afincado en Londres y natural de Nueva York, que ha vestido a celebridades para la Gala del Met, hará su debut en la Semana de la Moda de Nueva York.',
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
                </div>
            </div>`
        ] 
    },
    armario: { 
        category: 'Moda', 
        title: 'Donna Karan New York elige a Kendall Jenner', 
        image: 'Imagenes/NoticiaK1.png', 
        content: [
            'Donna Karan New York ha fichado a Kendall Jenner para su campaña de otoño 2026. Fotografiada por Mert Alas, Jenner debuta como imagen de la marca en enclaves emblemáticos de Nueva York. El concepto recupera la idea de una campaña de finales de los años ochenta de Donna Karan, firmada por Dennis Piel y protagonizada por la modelo Rosemary McGrotha, que daba voz a sus pensamientos mientras llegaba a Nueva York en una limusina.',
            'Para otoño 2026, esa premisa se reinterpreta a través de Jenner, que imagina tener Nueva York por completo para ella sola. La campaña transcurre dentro y fuera de un coche, con Jenner recorriendo la ciudad en una serie de escenas cinematográficas que contraponen glamour y actitud.',
            '"Donna Karan siempre ha encarnado la confianza y una sofisticación sin esfuerzo, cualidades con las que conecto de verdad. Formar parte de la campaña de otoño 2026 fue como celebrar la energía de Nueva York y a una mujer que conoce su estilo y acepta abiertamente quien es", afirmó Jenner.',
            'Entre las piezas clave de la colección que aparecen en la campaña figura el ya clásico body de Donna Karan, rescatado de los archivos de la marca y reimaginado para otoño 2026. Jenner luce también una chaqueta y una falda de punto de lana drapeadas, superpuestas bajo un abrigo de cuero, un traje de terciopelo a medida y una chaqueta y falda de inspiración aviador en un profundo marrón espresso.',
            `<div class="stacked-images">
                <img src="Imagenes/NoticiaK2.jpg" alt="Desfile foto 1">
            </div>`,
            'La campaña también pone el foco en un vestido largo de lentejuelas, además de accesorios como el bolso "Cashmere Tote" en ante color chocolate y el bolso "Black Cherry Leno", joyería escultórica en oro y gafas.',
            'La campaña se ha lanzado en las redes sociales de la marca y se extiende a la publicidad digital, impresa y exterior. El año pasado, Kate Moss protagonizó la campaña de Donna Karan New York para la temporada primavera-verano 2025.',
            `<div class="stacked-images">
                <img src="Imagenes/NoticiaK3.jpg" alt="Desfile foto 2">
            </div>`

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
        registerForm.addEventListener('submit', async event => {
            event.preventDefault();
            ['name', 'run', 'email', 'address', 'password', 'confirm'].forEach(field => setError(`register-${field}-error`, ''));
            const name = document.getElementById('register-name').value.trim();
            const runInput = document.getElementById('register-run');
            const run = runInput ? runInput.value.trim() : '';
            const email = document.getElementById('register-email').value.trim();
            const address = document.getElementById('register-address').value.trim();
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            
            if (!name) setError('register-name-error', 'El nombre completo es obligatorio.');
            if (!run) setError('register-run-error', 'El RUN es obligatorio.');
            else if (run.includes('.')) setError('register-run-error', 'El RUN debe escribirse sin puntos.');
            else if (!run.includes('-')) setError('register-run-error', 'El RUN debe incluir un guión, por ejemplo 12456789-0.');
            else if (!validarRUN(run)) setError('register-run-error', 'Usa exactamente 8 números, un guión y 1 número. Ejemplo: 12345678-9.');

            if (!email) setError('register-email-error', 'El correo es obligatorio.'); else if (validateEmail(email)) setError('register-email-error', validateEmail(email));
            if (!address) setError('register-address-error', 'La dirección es obligatoria.');
            if (!password) setError('register-password-error', 'La contraseña es obligatoria.');
            if (!confirm) setError('register-confirm-error', 'Confirma tu contraseña.'); else if (password !== confirm) setError('register-confirm-error', 'Las contraseñas no coinciden.');
            if (document.querySelector('#register-form .field-error:not(:empty)')) return;
            const success = document.getElementById('register-success');
            success.textContent = 'Creando cuenta...';
            try {
                const response = await fetch('http://localhost:8081/api/usuarios/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: name, email, password, direccion: address })
                });
                const responseText = await response.text();
                let result = {};
                try {
                    result = responseText ? JSON.parse(responseText) : {};
                } catch {
                    result.mensaje = responseText;
                }
                if (!response.ok) throw new Error(result.mensaje || `Error del servidor (${response.status}).`);
                success.textContent = result.mensaje;
                registerForm.reset();
            } catch (error) {
                success.textContent = error.message === 'Failed to fetch' ? 'No se pudo conectar con el servidor.' : error.message;
            }
        });
    }

    
});