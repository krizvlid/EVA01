const profilePanel = document.getElementById('profile-panel');
const session = JSON.parse(localStorage.getItem('sake_sesion') || 'null');
const cardStorageKey = session && session.logueado
    ? `sake_tarjetas_${session.id || session.correo}`
    : 'sake_tarjetas_invitado';

function tarjetasGuardadasMarkup() {
    const cards = JSON.parse(localStorage.getItem(cardStorageKey) || '[]');
    if (!cards.length) return 'No hay tarjetas guardadas';
    return cards
        .map(card => `Tarjeta terminada en ${card.slice(-4)}`)
        .join('<br>');
}

if (!session || !session.logueado || !session.id) {
    profilePanel.innerHTML = '<p class="profile-message">Debes iniciar sesión para ver tu perfil.</p><a class="profile-action" href="Login.html">Iniciar sesión</a>';
} else {
    fetch(`http://localhost:8081/api/usuarios/${session.id}`)
        .then(response => {
            if (!response.ok) throw new Error('No se pudieron cargar los datos.');
            return response.json();
        })
        .then(user => {
            profilePanel.innerHTML = `
                <div class="profile-row"><span class="profile-label">Nombre</span><strong class="profile-value">${user.nombre || ''}</strong></div>
                <div class="profile-row"><span class="profile-label">Correo</span><strong class="profile-value">${user.email || ''}</strong></div>
                <div class="profile-row"><span class="profile-label">Dirección</span><strong class="profile-value">${user.direccion || 'No registrada'}</strong></div>
                <div class="profile-row"><span class="profile-label">Tarjetas</span><strong class="profile-value">${tarjetasGuardadasMarkup()}</strong></div>
                <a class="profile-action" href="carrito.html">Ver mi cesta</a>
                <button class="profile-action" id="logout-button" type="button" style="background:none;border:0;cursor:pointer">Cerrar sesión</button>`;
            document.getElementById('logout-button').addEventListener('click', () => {
                localStorage.removeItem('sake_sesion');
                localStorage.removeItem('usuarioCorreo');
                window.location.reload();
            });
        })
        .catch(error => { profilePanel.innerHTML = `<p class="profile-message">${error.message}</p>`; });
}