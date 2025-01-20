document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    
    loadingScreen.style.display = 'flex';

    window.addEventListener('load', () => {
        
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';

        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); 
    });
});