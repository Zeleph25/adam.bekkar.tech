function handleNavbarScroll(scrollY) {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function handleScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const backToTop = document.querySelector('.back-to-top');

    if (!progressBar || !backToTop) return;

    const updateElements = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

        progressBar.style.width = `${scrollPercent * 100}%`;

        backToTop.classList.toggle('visible', scrollTop > 100);
    };

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => requestAnimationFrame(updateElements));
    window.addEventListener('resize', () => requestAnimationFrame(updateElements));

    updateElements();
}

function scrollToSection() {
    function smoothScrolling(targetElement, options = {}) {
        const {
            duration = 1200,
            offset = 0,
            easing = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        } = options;

        const navbar = document.getElementById('main-navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition - navbarHeight - offset;
        let startTime = null;

        function animateScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);

            window.scrollTo(0, startPosition + distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }
    
    document.querySelectorAll('.navbar-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbar = document.getElementById('main-navbar');
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
                
                smoothScrolling(targetElement, {
                    duration: 1000,
                    offset: 20
                });
            }
        });
    });

    document.querySelectorAll('.hero-buttons a[href^="#"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                scrollToSection(targetElement, {
                    duration: 1200,
                    offset: -50
                });
            }
        });
    });
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

    scaleFade(heroImage, scrollY, 50, 450);
    fade(heroTitle, scrollY, 0, 400);
    fade(heroSubtitle, scrollY, 40, 440);
    ctaBtn.forEach(btn => fade(btn, scrollY, 80, 480));
    fade(outlineBtn, scrollY, 20, 420);
    fade(networks, scrollY, 60, 460);
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

document.addEventListener('DOMContentLoaded', () => {
    handleScrollProgress();
});

document.addEventListener('DOMContentLoaded', scrollToSection);
