document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById('gameframe');
    const urlParam = getQueryParam('url');
    const storedUrl = localStorage.getItem('iframeSrc');

    if (urlParam) {
        const decodedUrl = decodeURIComponent(urlParam);
        iframe.src = decodedUrl;
        localStorage.setItem('iframeSrc', decodedUrl); 
        history.replaceState(null, '', window.location.pathname); 
        console.log('Iframe URL set from query param:', decodedUrl);
    } 
    else if (storedUrl) {
        iframe.src = storedUrl;
        console.log('Iframe URL set from localStorage:', storedUrl);
    } 
    else {
        iframe.src = 'https://example.com'; 
        console.log('Iframe URL set to default');
    }
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function toggleFullscreen() {
    const iframe = document.getElementById('gameframe');
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
    const iframe = document.getElementById('gameframe');
    iframe.src = iframe.src;  
    console.log('Iframe refreshed');
}

function goBack() {
    
    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      
      window.location.href = '/';
    }
  }

  function activateChat() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    new Crate({
        server: '1271606448878780478', // BrunysIXLWork
        channel: '1272275936389103637' // #💬-free-chat
    });
}