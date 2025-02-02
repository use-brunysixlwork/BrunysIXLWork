document.addEventListener("DOMContentLoaded", function() {
    const savedEngine = localStorage.getItem("searchEngine");
    if (savedEngine) {
        document.getElementById("search-engine-selector").value = savedEngine;
    }
});

document.getElementById("search-engine-selector").addEventListener("change", function() {
    localStorage.setItem("searchEngine", this.value);
});