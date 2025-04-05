const iframe = document.getElementById('gameframe');


const urlParam = getQueryParam('url');


const savedUrl = localStorage.getItem('iframeUrl');

if (urlParam) {
    const decodedUrl = decodeURIComponent(urlParam);
    iframe.src = decodedUrl;
    localStorage.setItem('iframeUrl', decodedUrl); 
    history.replaceState(null, '', window.location.pathname);
    console.log('Iframe URL set from query param:', decodedUrl);
} else if (savedUrl) {
    iframe.src = savedUrl; 
    console.log('Iframe URL set from localStorage:', savedUrl);
} else {
    iframe.src = 'https://example.com'; 
    console.log('Iframe URL set to default:', iframe.src);
}

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
