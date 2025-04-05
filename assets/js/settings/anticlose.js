function confirmBeforeUnload(e) {
    if (getCookie('confirmationEnabled') === 'true' && (e.clientY < 0 || e.clientY === undefined)) {
        const confirmationMessage = 'Are you sure you want to leave? You may lose your progress.';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
}

window.addEventListener('beforeunload', confirmBeforeUnload);

document.addEventListener('DOMContentLoaded', function() {
    const toggleConfirmation = document.getElementById('toggleConfirmation');

    if (getCookie('confirmationEnabled') === 'true') {
        toggleConfirmation.checked = true;
    }

    toggleConfirmation.addEventListener('change', function() {
        if (toggleConfirmation.checked) {
            setCookie('confirmationEnabled', 'true', 30);
        } else {
            setCookie('confirmationEnabled', 'false', 30);
        }
    });
});

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
