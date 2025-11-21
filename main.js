document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnBurger = burgerMenu.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnBurger && mobileMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

