const imageLinks = [
    {
        image: '/assets/games/10-minutes-till-dawn/splash.png',
        link: '/iframe.html?url=/assets/games/10-minutes-till-dawn/'
    },
    {
        image: '/assets/games/1v1lol/splash.png',
        link: '/iframe.html?url=/assets/games/1v1lol/'
    },
    {
        image: '/assets/games/cookieclicker/splash.png',
        link: '/iframe.html?url=/assets/games/cookieclicker/'
    },
    {
        image: '/assets/games/dreadheadparkour/icons/icon-128.png',
        link: '/iframe.html?url=/assets/games/dreadheadparkour/'
    },
    {
        image: '/assets/games/blockblast/download.jpeg',
        link: '/iframe.html?url=/assets/games/blockblast/'
    },
    {
        image: '/assets/games/fnf/favicon.png',
        link: '/iframe.html?url=/assets/games/fnf/'
    },
    {
        image: '/assets/games/slope/IMG_5256.jpeg',
        link: '/iframe.html?url=/assets/games/slope/'
    },
    {
        image: '/assets/games/gd/logo.png',
        link: '/iframe.html?url=/assets/games/gd/'
    },
    {
        image: '/assets/games/eaglercraft/buddyholly.jpg',
        link: '/iframe.html?url=/assets/games/eaglercraft/'
    },
    {
        image: '/assets/games/learntofly 2/IMG_5305.jpeg',
        link: '/iframe.html?url=/assets/games/learntofly 2/'
    }
];

 
function shuffleArray(array) {
    const shuffled = [...array];  
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
    }
    return shuffled;
}

 
const shuffledImageLinks = shuffleArray(imageLinks).slice(0, 4);

 
const imageBundle = document.getElementById('imageBundle');

 
shuffledImageLinks.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = `Image ${index + 1}`;
    img.addEventListener('click', () => {
        window.location.href = item.link;  
    });
    imageBundle.appendChild(img);
});
