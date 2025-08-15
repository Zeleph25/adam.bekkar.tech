window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    const navbar = document.getElementById('main-navbar');
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const heroImage = document.querySelector('.image-wrapper');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaBtn = document.querySelectorAll('.hero-buttons .cta-btn');
    const outlineBtn = document.querySelector('.hero-buttons .cta-btn.outline');
    const networks = document.querySelector('.hero-networks');

    if (!heroImage || !heroTitle || !heroSubtitle || !ctaBtn || !outlineBtn || !networks) return;

    function fade(element, scrollY, start, end, slideFactor = 0.15) {
        const factor = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
        const easedFade = 1 - Math.pow(factor, 3);
        const easedSlide = scrollY * slideFactor;
        element.style.opacity = easedFade;
        element.style.transform = `translateY(${easedSlide}px)`;
    }

    function scaleFade(element, scrollY, start, end, scaleFactor = 0.0008) {
        const factor = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
        const easedFade = 1 - Math.pow(factor, 3);
        element.style.opacity = easedFade;
        element.style.transform = `translateY(${scrollY * 0.15}px) scale(${Math.max(1 - scrollY * scaleFactor, 0.75)})`;
    }

    scaleFade(heroImage, scrollY, 100, 420);
    fade(heroTitle, scrollY, 120, 440);
    fade(heroSubtitle, scrollY, 140, 460);
    ctaBtn.forEach(btn => fade(btn, scrollY, 160, 480));
    fade(outlineBtn, scrollY, 160, 480);
    fade(networks, scrollY, 180, 500);
});
