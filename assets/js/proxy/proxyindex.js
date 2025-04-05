document.addEventListener("DOMContentLoaded", function() {
    
    function getCookie(name) {
        const cookieArr = document.cookie.split("; ");
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if (cookiePair[0] === name) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }
    
    
    const savedEngine = getCookie("searchEngine") || "https://www.duckduckgo.com/?q=%s";
    document.getElementById("uv-search-engine").value = savedEngine;
});
