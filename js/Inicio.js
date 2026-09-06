document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTIÓN DEL ENLACE DE AUTENTICACIÓN / MI CUENTA
    const linkAuth = document.getElementById('link-auth');
    const linkRegister = document.getElementById('link-register');
    const cartLink = document.getElementById('cart-link');
    const sesion = JSON.parse(localStorage.getItem('sake_sesion'));

    if (cartLink) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
        cartLink.textContent = `CESTA (${totalCount})`;
    }

    if (linkRegister) {
        linkRegister.hidden = Boolean(sesion && sesion.logueado);
    }

    if (linkAuth) {
        if (sesion && sesion.logueado) {
            linkAuth.textContent = 'MI PERFIL';
            linkAuth.href = 'perfil.html';
            linkAuth.onclick = null;
        } else {
            // Usuario no autenticado: enlace normal a Login.html
            linkAuth.textContent = 'INICIAR SESIÓN';
            linkAuth.href = 'Login.html';
            linkAuth.onclick = null; // Quita la función de cerrar sesión
        }
    }

    // 2. CHECKOUT GATE (PROTECCIÓN DEL BOTÓN PROCESAR PAGO)
    const btnPagar = document.getElementById('btn-pagar');

    if (btnPagar) {
        btnPagar.addEventListener('click', (e) => {
            e.preventDefault();

            const sesionActiva = JSON.parse(localStorage.getItem('sake_sesion'));

            if (sesionActiva && sesionActiva.logueado) {
                alert('Procesando compra para: ' + sesionActiva.correo);
            } else {
                alert('Debes iniciar sesión para procesar tu pago.');
                window.location.href = 'Login.html';
            }
        });
    }
});