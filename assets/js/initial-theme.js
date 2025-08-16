(function() {
    try {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('theme-dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    } catch (e) {
        console.error('Theme detection failed.');
    }
})();
