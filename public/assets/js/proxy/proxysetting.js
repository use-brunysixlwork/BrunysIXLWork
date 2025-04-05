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


    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
    }

    const savedEngine = getCookie("searchEngine");
    if (savedEngine) {
        document.getElementById("search-engine-selector").value = savedEngine;
    }
});

document.getElementById("search-engine-selector").addEventListener("change", function() {
    setCookie("searchEngine", this.value, 30); 
});
