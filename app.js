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
                    title: "Game of Lif",
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
            experiences: [
                { id: 1, position: "Some experience.", place: "Some place.", period: "Some period.", details: "Some details." },
                { id: 2, position: "Some experience.", place: "Some place.", period: "Some period.", details: "Some details." }
            ],
            skills: {
                programming: ["Some Langage.", "Some Langage.", "Some Langage.", "Some Langage.", "Some Langage.", "Some Langage."],
                tools: ["Some Tool.", "Some Tool.", "Some Tool."],
                spoken: ["Some Langage.", "Some Langage.", "Some Langage."]
            },
            contact: {
                email: "adam.bekkar@epfl.ch",
                linkedin: "https://www.linkedin.com/in/adam-bekkar/",
            }
        }
    },
    mounted() {
        window.addEventListener('load', () => {
            hideLoader();
            showLoader();

            const themeToggleBtn = document.getElementById('theme-toggle');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

            function setTheme(theme) {
                if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
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
        });
    }
}).mount('#app');
