
window.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('selectedTheme');
    const nameElement = document.getElementById('site-name');

    if (savedTheme) {
        document.body.className = savedTheme;
        document.getElementById('theme-selector').value = savedTheme;

        nameElement.textContent = (savedTheme === 'theme-jimmy') ? "Jimmys Games" : "BrunysIXLWork";
    }
});


document.getElementById('theme-selector').addEventListener('change', function () {
    const selectedTheme = this.value;
    document.body.className = selectedTheme;
    localStorage.setItem('selectedTheme', selectedTheme);

    const nameElement = document.getElementById('site-name');
    nameElement.textContent = (selectedTheme === 'theme-jimmy') ? "Jimmys Games" : "BrunysIXLWork";
});
