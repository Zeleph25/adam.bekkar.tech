function handleNavbarScroll(scrollY) {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleHeroScroll(scrollY) {
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

    const heroImage = document.querySelector('.image-wrapper');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaBtn = document.querySelectorAll('.hero-buttons .cta-btn');
    const outlineBtn = document.querySelector('.hero-buttons .cta-btn.outline');
    const networks = document.querySelector('.hero-networks');

    if (!heroImage || !heroTitle || !heroSubtitle || !ctaBtn || !outlineBtn || !networks) return;

    scaleFade(heroImage, scrollY, 100, 420);
    fade(heroTitle, scrollY, 120, 440);
    fade(heroSubtitle, scrollY, 140, 460);
    ctaBtn.forEach(btn => fade(btn, scrollY, 160, 480));
    fade(outlineBtn, scrollY, 160, 480);
    fade(networks, scrollY, 180, 500);
}

function revealOnScroll(optionsArray) {
    const windowHeight = window.innerHeight;

    optionsArray.forEach(({ selector, offset = 0.85, baseStagger = 150, childSelectors = [], activeClass = 'visible' }) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * offset && !el.classList.contains(activeClass)) {
                setTimeout(() => {
                    el.classList.add(activeClass);

                    if (childSelectors.length) {
                        const children = el.querySelectorAll(childSelectors.join(', '));
                        children.forEach(child => child.classList.add(activeClass));
                    }
                }, index * baseStagger);
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    handleNavbarScroll(scrollY);
    handleHeroScroll(scrollY);
    
    revealOnScroll([
        {
            selector: '.project-item',
            childSelectors: ['p', 'h2', 'h3', 'h4', '.project-tag', '.more-details-btn'],
            baseStagger: 100
        },
        {
            selector: '.background-category',
            childSelectors: ['h3', 'ul', 'li', '.background-item', 'i', 'span'],
            baseStagger: 0
        },
    ]);
});
