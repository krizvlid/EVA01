const checkoutCart = JSON.parse(localStorage.getItem('cart') || '[]');
const money = value => `$${Number(value).toLocaleString('es-CL')} CLP`;
const itemsEl = document.getElementById('checkout-items');
const totalEl = document.getElementById('checkout-total');
const messageEl = document.getElementById('checkout-message');
const session = JSON.parse(localStorage.getItem('sake_sesion') || 'null');
const customerFields = document.getElementById('customer-fields');
const nameInput = document.getElementById('checkout-name');
const emailInput = document.getElementById('checkout-email');
const addressInput = document.getElementById('checkout-address');
const addressChoice = document.getElementById('address-choice');
const cardInput = document.getElementById('checkout-card');
const cardChoice = document.getElementById('card-choice');
const addressMessage = document.getElementById('address-message');
const addressStorageKey = session && session.logueado
    ? `sake_direccion_${session.id || session.correo}`
    : 'sake_direccion_invitado';
const cardStorageKey = session && session.logueado
    ? `sake_tarjetas_${session.id || session.correo}`
    : 'sake_tarjetas_invitado';

function actualizarStockLocal(items) {
    const quantitiesByCode = new Map();
    const stockByCode = new Map();

    items.forEach(item => {
        const code = item.code || item.codigo;
        if (!code) return;
        const size = item.size || 'unica';
        const stockKey = `sake_stock_${code}_${encodeURIComponent(size)}`;
        quantitiesByCode.set(stockKey, (quantitiesByCode.get(stockKey) || 0) + (Number(item.quantity) || 1));
        if (!stockByCode.has(stockKey)) stockByCode.set(stockKey, Number(item.stock));
    });

    quantitiesByCode.forEach((quantity, stockKey) => {
        const stockGuardado = localStorage.getItem(stockKey);
        const stockActual = stockGuardado === null ? null : Number(stockGuardado);
        const stockBase = stockByCode.get(code);
        const stockDisponible = Number.isFinite(stockActual)
            ? stockActual
            : (Number.isFinite(stockBase) ? stockBase : null);
        if (stockDisponible === null) return;
        const nuevoStock = Math.max(0, stockDisponible - quantity);
        localStorage.setItem(stockKey, String(nuevoStock));
    });
}
const total = checkoutCart.reduce((sum, item) => sum + Number(String(item.price || item.precio || 0).replace(/[^0-9]/g, '')) * (Number(item.quantity) || 1), 0);

itemsEl.innerHTML = checkoutCart.map(item => {
    const price = Number(String(item.price || item.precio || 0).replace(/[^0-9]/g, ''));
    return `<p><span>${item.name || item.nombre || 'Producto'} x${Number(item.quantity) || 1}</span><strong>${money(price * (Number(item.quantity) || 1))}</strong></p>`;
}).join('') || '<p>Tu cesta está vacía.</p>';
totalEl.textContent = money(total);

if (session && session.logueado) {
    nameInput.value = session.nombre || '';
    emailInput.value = session.correo || '';
    nameInput.readOnly = true;
    emailInput.readOnly = true;
    document.getElementById('saved-user-message').hidden = false;
    addressMessage.textContent = 'Puedes cambiar esta dirección antes de confirmar el pedido.';
}

const savedAddress = (session && session.direccion) || localStorage.getItem(addressStorageKey) || '';
if (savedAddress) {
    const savedOption = document.createElement('option');
    savedOption.value = 'saved';
    savedOption.textContent = `Usar mi dirección registrada: ${savedAddress}`;
    addressChoice.appendChild(savedOption);

    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = 'Usar una dirección nueva';
    addressChoice.appendChild(newOption);
} else {
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = 'Ingresar una dirección nueva';
    addressChoice.appendChild(newOption);
}
if (savedAddress) addressInput.value = savedAddress;

function updateAddressMode() {
    const useNewAddress = addressChoice.value === 'new';
    addressInput.hidden = !useNewAddress;
    addressInput.required = useNewAddress;
    if (!useNewAddress) addressInput.value = savedAddress;
    else addressInput.value = '';
}

addressChoice.addEventListener('change', updateAddressMode);
updateAddressMode();

addressInput.addEventListener('change', () => {
    const address = addressInput.value.trim();
    if (address) localStorage.setItem(addressStorageKey, address);
});

cardInput.addEventListener('input', () => {
    const digits = cardInput.value.replace(/\D/g, '').slice(0, 16);
    cardInput.value = digits.replace(/(.{4})/g, '$1 ').trim();
});

function formatCard(card) {
    return card.replace(/(.{4})/g, '$1 ').trim();
}

function loadCardChoices() {
    const savedCards = JSON.parse(localStorage.getItem(cardStorageKey) || '[]');
    cardChoice.innerHTML = '';
    savedCards.forEach((card, index) => {
        const option = document.createElement('option');
        option.value = `saved-${index}`;
        option.textContent = `Tarjeta terminada en ${card.slice(-4)}`;
        cardChoice.appendChild(option);
    });
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = savedCards.length ? 'Agregar otra tarjeta' : 'Ingresar una tarjeta';
    cardChoice.appendChild(newOption);
    updateCardMode();
}

function updateCardMode() {
    const useNewCard = cardChoice.value === 'new';
    cardInput.hidden = !useNewCard;
    cardInput.required = useNewCard;
    if (!useNewCard) {
        const index = Number(cardChoice.value.replace('saved-', ''));
        const savedCards = JSON.parse(localStorage.getItem(cardStorageKey) || '[]');
        cardInput.value = savedCards[index] ? formatCard(savedCards[index]) : '';
    } else {
        cardInput.value = '';
    }
}

cardChoice.addEventListener('change', updateCardMode);
loadCardChoices();

document.getElementById('checkout-form').addEventListener('submit', async event => {
    event.preventDefault();
    if (!checkoutCart.length) { messageEl.textContent = 'Agrega productos antes de pagar.'; return; }
    const payload = {
        nombre: nameInput.value.trim(),
        correo: emailInput.value.trim(),
        direccion: addressInput.value.trim(),
        tarjeta: cardInput.value.replace(/\s/g, ''),
        items: checkoutCart.map(item => ({ id: item.id, nombre: item.name || item.nombre, precio: Number(String(item.price || item.precio || 0).replace(/[^0-9]/g, '')), cantidad: Number(item.quantity) || 1 }))
    };
    if (payload.direccion) localStorage.setItem(addressStorageKey, payload.direccion);
    try {
        const response = await fetch('http://localhost:8082/api/pagos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const responseText = await response.text();
        let result = {};
        try { result = responseText ? JSON.parse(responseText) : {}; } catch { result.mensaje = responseText; }
        if (!response.ok) throw new Error(result.mensaje || `Error del servidor (${response.status}).`);
        if (result.correoEnviado !== true) {
            throw new Error('El pedido fue recibido, pero no se pudo confirmar el envío del correo.');
        }
        actualizarStockLocal(checkoutCart);
        const savedCards = JSON.parse(localStorage.getItem(cardStorageKey) || '[]');
        if (!savedCards.includes(payload.tarjeta)) {
            savedCards.push(payload.tarjeta);
            localStorage.setItem(cardStorageKey, JSON.stringify(savedCards));
        }
        localStorage.removeItem('cart');
        messageEl.textContent = `Pedido #${result.pedidoId || result.id || ''} confirmado correctamente. Revisa tu correo.`;
        event.target.reset();
    } catch (error) { messageEl.textContent = error.message; }
});