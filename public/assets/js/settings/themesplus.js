   
    window.addEventListener('DOMContentLoaded', function () {
        const savedTheme = localStorage.getItem('selectedTheme');
        const nameElement = document.getElementById('site-name');
        const selector = document.getElementById('theme-selector');

        if (savedTheme) {
            document.body.className = savedTheme;

            if (selector) {
                selector.value = savedTheme;
            }

            if (nameElement) {
                nameElement.textContent = (savedTheme === 'theme-jimmy') ? "Jimmys Games" : "BrunysIXLWork";
            }
        }
    });


    document.addEventListener('DOMContentLoaded', function () {
        const selector = document.getElementById('theme-selector');
        const nameElement = document.getElementById('site-name');

        if (selector) {
            selector.addEventListener('change', function () {
                const selectedTheme = this.value;
                document.body.className = selectedTheme;
                localStorage.setItem('selectedTheme', selectedTheme);

                if (nameElement) {
                    nameElement.textContent = (selectedTheme === 'theme-jimmy') ? "Jimmys Games" : "BrunysIXLWork";
                }
            });
        }
    });