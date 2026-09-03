const sections = document.querySelectorAll('.category-section');
const navLinks = document.querySelectorAll('.menu-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-category');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-category');
        }
    });
});
