document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("theme-selector");
    const savedTheme = localStorage.getItem("selected-theme");


    if (savedTheme && savedTheme !== "default") {
        document.body.classList.add(savedTheme);
        selector.value = savedTheme;
    }

    selector.addEventListener("change", () => {
    
        document.body.classList.remove("theme-light", "theme-blue", "theme-hacker", "theme-amethyst", "theme-sapphire", "theme-emerald", "theme-ruby", "theme-topaz", "theme-opal", "theme-midnight", "theme-storm", "theme-evergreen", "theme-nebula", "theme-volcanic", "theme-autumn", "theme-jimmy", "theme-szvy");

        const selected = selector.value;

        if (selected === "default") {
            localStorage.removeItem("selected-theme");
        } else {
            document.body.classList.add(selected);
            localStorage.setItem("selected-theme", selected);
        }
    });
});