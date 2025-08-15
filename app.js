const startTime = Date.now();
const loader = document.getElementById('initial-loading-overlay');

function hideLoader() {
    const elapsed = Date.now() - startTime;
    const minDuration = 200;
    
    if (elapsed >= minDuration) {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 300);
    } else {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 300);
        }, minDuration - elapsed);
    }
}

function showLoader() {
    document.getElementById('app').style.visibility = 'visible';
}

const { createApp } = Vue;

createApp({
    data() {
        return {
            isLoading: true,
            name: "Adam Bekkar",
            tagline: "Aspiring computer science student interested in research and problem-solving.",
            projects: [
                {
                    id: 1,
                    title: "Vestibulum",
                    description: "Project description.",
                    category: "Personal",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 2,
                    title: "ICMon",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 3,
                    title: "ChaCuN",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 4,
                    title: "Game of Life",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 5,
                    title: "Boids Simulation",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 6,
                    title: "Pixel Construction",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 7,
                    title: "Small-scale MLmodels",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 8,
                    title: "Exploring Computer Graphic",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 9,
                    title: "Distributed Key-ValueStore",
                    description: "Project description.",
                    category: "Academic",
                    tags: ["tag1", "tag2", "tag3"]
                },
                {
                    id: 10,
                    title: "S4S-Connect",
                    description: "Project description.",
                    category: "Personal",
                    tags: ["tag1", "tag2", "tag3"]
                }
            ],
            background: {
                programming: [
                    { name: "Java", iconClass: "fab fa-java" },
                    { name: "Scala", iconClass: "devicon-scala-plain colored" },
                    { name: "Rust", iconClass: "devicon-rust-plain" },
                    { name: "Python", iconClass: "fab fa-python" },
                    { name: "SQL", iconClass: "fas fa-database" },
                    { name: "Verilog", imgSrc: "https://www.svgrepo.com/show/374163/verilog.svg" },
                    { name: "LaTeX", iconClass: "devicon-latex-plain" },
                    { name: "RISC-V", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/8/82/RISC-V_icon.svg" }
                ],
                spoken: [
                    { name: "Arabic", level: "C2", iconClass: "fi fi-ma" },
                    { name: "French", level: "C2", iconClass: "fi fi-fr" },
                    { name: "English", level: "C1", iconClass1: "fi fi-us", iconClass2: "fi fi-gb" },
                    { name: "Deutsch", level: "A2", iconClass: "fi fi-de" }
                ],
                experiences: [
                    { id: 1, position: "Some experience.", place: "Some place.", period: "Some period.", details: "Some details." },
                    { id: 2, position: "Some experience.", place: "Some place.", period: "Some period.", details: "Some details." }
                ],
            },
            contact: {
                email: "adam.bekkar@epfl.ch",
                linkedin: "https://www.linkedin.com/in/adam-bekkar/",
            }
        }
    },
    mounted() {
        function preventScrollRestoration() {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
        }

        preventScrollRestoration();

        window.addEventListener('load', () => {
            hideLoader();
            showLoader();

            const themeToggleBtn = document.getElementById('theme-toggle');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

            function setTheme(theme) {
                const isMobile = window.matchMedia('(max-width: 768px)').matches;

                if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    themeToggleBtn.innerHTML = isMobile ? 'White mode' : '<i class="fas fa-sun"></i>';
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    themeToggleBtn.innerHTML = isMobile ? 'Dark mode' : '<i class="fas fa-moon"></i>';
                }
                localStorage.setItem('theme', theme);
            }

            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else if (prefersDarkScheme.matches) {
                setTheme('dark');
            } else {
                setTheme('light');
            }

            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });

            window.addEventListener('resize', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                setTheme(currentTheme);
            });
        });
    },
    methods: {
        langPercentage(level) {
            switch(level) {
                case 'A1': return 20;
                case 'A2': return 40;
                case 'B1': return 60;
                case 'B2': return 75;
                case 'C1': return 90;
                case 'C2': return 100;
                default: return 0;
            }
        }
    }
}).mount('#app');
