document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar el contador de la cesta desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartLink = document.getElementById('cart-link');
    
    if (cartLink) {
        cartLink.textContent = `CESTA (${totalCount})`;
    }

    // 2. Resaltar enlace del menú lateral activo según el scroll del usuario
    const sections = document.querySelectorAll('.category-section');
    const navLinks = document.querySelectorAll('.menu-item');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-category');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active-category');
            }
        });
    });
});