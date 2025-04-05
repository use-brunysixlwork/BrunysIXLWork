function setCustomSettings(faviconUrl, newTitle) {
    if (faviconUrl && newTitle) {
        document.querySelector('link[rel="icon"]').href = getRelativeUrl(faviconUrl);
        setCookie('selectedFavicon', getRelativeUrl(faviconUrl), 30);
        document.title = newTitle;
        setCookie('customTitle', newTitle, 30);
    } else {
        var customFaviconUrl = document.getElementById('faviconUrl').value;
        var customTitle = document.getElementById('websiteTitle').value;

        if (customFaviconUrl && customTitle) {
            document.querySelector('link[rel="icon"]').href = getRelativeUrl(customFaviconUrl);
            setCookie('selectedFavicon', getRelativeUrl(customFaviconUrl), 30);
            document.title = customTitle;
            setCookie('customTitle', customTitle, 30);
            document.getElementById('faviconUrl').value = '';
            document.getElementById('websiteTitle').value = '';
        }
    }
}

function resetSettings() {
    deleteCookie('selectedFavicon');
    deleteCookie('customTitle');

    const faviconElement = document.querySelector('link[rel="icon"]');
    if (faviconElement) {
        faviconElement.parentNode.removeChild(faviconElement);
    }
    
    document.title = '';
}

function loadSettings() {
    var selectedFavicon = getCookie('selectedFavicon');
    var customTitle = getCookie('customTitle');
    if (selectedFavicon) {
        document.querySelector('link[rel="icon"]').href = selectedFavicon;
    }
    if (customTitle) {
        document.title = customTitle;
    }
}

window.onload = loadSettings;

function getRelativeUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.href;
}

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

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
