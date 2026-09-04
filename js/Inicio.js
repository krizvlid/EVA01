document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTIÓN DEL ENLACE DE AUTENTICACIÓN / MI CUENTA
    const linkAuth = document.getElementById('link-auth');
    const sesion = JSON.parse(localStorage.getItem('sake_sesion'));

    if (linkAuth) {
        if (sesion && sesion.logueado) {
            // Usuario autenticado: cambia el texto a MI CUENTA
            linkAuth.textContent = 'MI CUENTA';
            linkAuth.href = '#';

            // Asignación directa para sobrescribir cualquier evento previo
            linkAuth.onclick = (e) => {
                e.preventDefault();
                const confirmar = confirm(`Sesión activa: ${sesion.correo}\n\n¿Deseas cerrar sesión?`);
                if (confirmar) {
                    localStorage.removeItem('sake_sesion');
                    window.location.reload(); // Recarga la página ya deslogueado
                }
            };
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