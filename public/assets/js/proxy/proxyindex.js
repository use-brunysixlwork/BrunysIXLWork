document.addEventListener("DOMContentLoaded", function() {
    
    const savedEngine = localStorage.getItem("searchEngine") || "https://www.duckduckgo.com/?q=%s";
    document.getElementById("uv-search-engine").value = savedEngine;
});