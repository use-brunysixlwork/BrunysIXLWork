document.getElementById('theme-selector').addEventListener('change', function () {
    const selectedTheme = this.value;

    document.body.className = selectedTheme;

    const nameElement = document.getElementById('site-name');

    if (selectedTheme === 'theme-jimmy') {
        nameElement.textContent = "Jimmys Games";
    } else {
        nameElement.textContent = "BrunysIXLWork";
    }
});