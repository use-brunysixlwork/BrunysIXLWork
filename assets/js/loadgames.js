document.addEventListener('DOMContentLoaded', function() {
    let gamesData = [];
    
    fetch('/assets/js/games.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data.games;
            renderGames(gamesData);
            document.getElementById('searchBar').addEventListener('input', filterGames);
        })
        .catch(error => console.error('Error loading games:', error));

    function renderGames(games) {
        const gamesContainer = document.getElementById('games-container');
        gamesContainer.innerHTML = '';
        
        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.className = 'game-box';
            gameElement.innerHTML = `
                <a href="${game.url}">
                    <div class="loader"></div>
                    <img src="" alt="${game.name}" width="170" height="170" style="opacity: 0;">
                    <div class="game-title">${game.name}</div>
                </a>
            `;

            const img = gameElement.querySelector("img");
            const loader = gameElement.querySelector(".loader");

            const tempImg = new Image();
            tempImg.src = game.image;
            tempImg.onload = function() {
                img.src = game.image;
                loader.remove();
                img.style.opacity = "1";
            };

            gamesContainer.appendChild(gameElement);
        });
    }

    function filterGames() {
        const input = document.getElementById('searchBar').value.toLowerCase();
        const filteredGames = gamesData.filter(game => 
            game.name.toLowerCase().includes(input)
        );
        renderGames(filteredGames);
    }
});
