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
    // 1. Obtener datos del usuario desde ms-usuarios (8081)
    fetch(`http://localhost:8081/api/usuarios/${session.id}`)
        .then(response => {
            if (!response.ok) throw new Error('No se pudieron cargar los datos del perfil.');
            return response.json();
        })
        .then(user => {
            const correoUsuario = user.correo || user.email || session.correo || '';

            profilePanel.innerHTML = `
                <div class="profile-row"><span class="profile-label">Nombre</span><strong class="profile-value">${user.nombre || 'No registrado'}</strong></div>
                <div class="profile-row"><span class="profile-label">Correo</span><strong class="profile-value">${correoUsuario}</strong></div>
                <div class="profile-row"><span class="profile-label">Dirección</span><strong class="profile-value">${user.direccion || 'No registrada'}</strong></div>
                <div class="profile-row"><span class="profile-label">Tarjetas</span><strong class="profile-value">${tarjetasGuardadasMarkup()}</strong></div>
                
                <div class="profile-actions-bar">
                    <a class="profile-action" href="carrito.html">VER MI CESTA</a>
                    <button class="profile-action-btn" id="btn-historial" type="button">VER HISTORIAL</button>
                    <button class="profile-action-btn" id="logout-button" type="button">CERRAR SESIÓN</button>
                </div>
            `;

            // Cierre de Sesión
            document.getElementById('logout-button').addEventListener('click', () => {
                localStorage.removeItem('sake_sesion');
                localStorage.removeItem('usuarioCorreo');
                window.location.reload();
            });

            // Acción para el botón VER HISTORIAL
            document.getElementById('btn-historial').addEventListener('click', () => {
                const historySection = document.getElementById('history-section');
                const historyContent = document.getElementById('history-content');
                const btnHistorial = document.getElementById('btn-historial');

                if (!historySection) return;

                if (historySection.style.display === 'block') {
                    historySection.style.display = 'none';
                    btnHistorial.textContent = 'VER HISTORIAL';
                    return;
                }

                historySection.style.display = 'block';
                btnHistorial.textContent = 'OCULTAR HISTORIAL';
                historyContent.innerHTML = '<p class="profile-message">Cargando compras...</p>';

                // 2. Consulta a PagoController (/api/pagos/historial?correo=...)
                fetch(`http://localhost:8082/api/pagos/historial?correo=${encodeURIComponent(correoUsuario)}`)
                    .then(async res => {
                        const data = await res.json().catch(() => ({}));
                        if (!res.ok) {
                            throw new Error(data.mensaje || `Error de servidor (${res.status})`);
                        }
                        return data;
                    })
                    .then(data => {
                        const pedidos = Array.isArray(data) ? data : (data.pedidos || []);

                        if (pedidos.length > 0) {
                            let html = `
                                <table class="history-table">
                                    <thead>
                                        <tr>
                                            <th>N° PEDIDO</th>
                                            <th>PRODUCTOS</th>
                                            <th>DIRECCIÓN</th>
                                            <th>TOTAL</th>
                                            <th>ESTADO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            `;

                            pedidos.forEach(p => {
                                const idPedido = p.id || p.pedidoId || 'N/A';
                                const direccion = p.direccion || p.direccionEnvio || user.direccion || 'No registrada';
                                const total = p.total ? `$${Number(p.total).toLocaleString('es-CL')} CLP` : '$0 CLP';
                                
                                // Formatear el estado para remover "SIMULADO" o guiones bajos
                                const estadoLimpio = (p.estado || 'PAGADO')
                                    .replace(/_/g, ' ')
                                    .replace(' SIMULADO', '')
                                    .trim();

                                // Construcción visual de la lista de productos con imagen
                                const listaItems = p.items || p.productos || p.detalles || [];
                                let productosHTML = '';

                                if (Array.isArray(listaItems) && listaItems.length > 0) {
                                    productosHTML = listaItems.map(item => {
                                        const nombre = item.nombre || item.nombreProducto || 'Producto';
                                        const cantidad = item.cantidad || 1;
                                        
                                        // Validación de ruta de imagen y fallback seguro
                                        let imagen = item.imagen || item.imagenUrl || item.img || '';
                                        if (!imagen || imagen.trim() === '' || imagen === 'null') {
                                            imagen = 'img/placeholder.png';
                                        }

                                        return `
                                            <div class="history-product-item">
                                                <img src="${imagen}" alt="${nombre}" class="history-product-img" onerror="this.onerror=null; this.src='img/placeholder.png';">
                                                <div class="history-product-info">
                                                    <span class="history-product-name">${nombre}</span>
                                                    <span class="history-product-qty">Cant: ${cantidad}</span>
                                                </div>
                                            </div>
                                        `;
                                    }).join('');
                                } else if (typeof listaItems === 'string') {
                                    productosHTML = `<span class="history-product-name">${listaItems}</span>`;
                                } else {
                                    productosHTML = '<span class="history-product-name">Detalle de productos no disponible</span>';
                                }

                                html += `
                                    <tr>
                                        <td>#${idPedido}</td>
                                        <td><div class="history-products-container">${productosHTML}</div></td>
                                        <td>${direccion}</td>
                                        <td>${total}</td>
                                        <td><span class="badge-estado">${estadoLimpio}</span></td>
                                    </tr>
                                `;
                            });

                            html += '</tbody></table>';
                            historyContent.innerHTML = html;
                        } else {
                            historyContent.innerHTML = '<p class="profile-message">No tienes compras registradas en tu historial.</p>';
                        }
                    })
                    .catch(err => {
                        console.error('Error al obtener el historial:', err);
                        historyContent.innerHTML = `<p class="profile-message">Ocurrió un error al cargar el historial: ${err.message}</p>`;
                    });
            });
        })
        .catch(error => { 
            profilePanel.innerHTML = `<p class="profile-message">${error.message}</p>`; 
        });
}