const themeNameMap = {
    'theme-jimmy': 'Jimmys Games'
};

function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('selectedTheme', theme);

    const nameElement = document.getElementById('site-name');
    if (nameElement) {
        nameElement.textContent = themeNameMap[theme] || '';
    }

    const selector = document.getElementById('theme-selector');
    if (selector) {
        selector.value = theme;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-default';
    applyTheme(savedTheme);

    const selector = document.getElementById('theme-selector');
    if (selector) {
        selector.addEventListener('change', function () {
            applyTheme(this.value);
        });
    }
});
