const iframe = document.getElementById('gameframe');

function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

function toggleFullscreen() {
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function refreshIframe() {
    iframe.src = iframe.src; 
    console.log('Iframe refreshed');
}

function goBack() {
    window.location.href = document.referrer || '/';
}

function activateChat() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
    script.async = true;
    document.body.appendChild(script);
    new Crate({
        server: '1271606448878780478',
        channel: '1272275936389103637'
    });
}


function showBrunycraftPopup() {
    const popup = document.createElement('div');
    popup.id = 'brunycraft-popup';
    popup.style.position = 'fixed';
    popup.style.top = '30%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#1e1e1e';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.border = '2px solid #fff';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = '9999';
    popup.style.textAlign = 'center';
    popup.innerHTML = `
        <p style="margin-bottom: 10px;">JOIN THE BRUNYCRAFT SERVER BY PUTTING IN <strong>eplay.brunycraft.xyz</strong>!</p>
        <button id="close-popup" style="padding: 5px 10px; background: #444; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
    `;

    document.body.appendChild(popup);

    document.getElementById('close-popup').addEventListener('click', () => {
        popup.remove();
    });
}

const urlParam = getQueryParam('url');
const savedUrl = localStorage.getItem('iframeUrl');

if (urlParam) {
    const decodedUrl = decodeURIComponent(urlParam);
    iframe.src = decodedUrl;
    localStorage.setItem('iframeUrl', decodedUrl); 
    history.replaceState(null, '', window.location.pathname);
    console.log('Iframe URL set from query param:', decodedUrl);

    if (decodedUrl.includes('/assets/games/eagler112.html')) {
        showBrunycraftPopup();
    }
} else if (savedUrl) {
    iframe.src = savedUrl; 
    console.log('Iframe URL set from localStorage:', savedUrl);

    if (savedUrl.includes('/assets/games/eagler112.html')) {
        showBrunycraftPopup();
    }
} else {
    iframe.src = 'https://example.com'; 
    console.log('Iframe URL set to default:', iframe.src);
}