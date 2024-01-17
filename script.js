
document.getElementById('add-player-btn').addEventListener('click', addPlayer);
document.getElementById('analyze-stack-btn').addEventListener('click', analyzeStack);

let playerId = 0;

function addPlayer() {
    playerId++;
    const playerContainer = document.createElement('div');
    playerContainer.id = 'player-' + playerId;
    playerContainer.className = 'player-container';
    playerContainer.innerHTML = '<h3>Player ' + playerId + '</h3>' +
                                '<input type="text" id="card-input-' + playerId + '" placeholder="Enter card name">' +
                                '<button onclick="addCardToBattlefield(' + playerId + ')">Add Card to Battlefield</button>' +
                                '<div class="battlefield" id="battlefield-' + playerId + '"></div>' +
                                '<button onclick="addCardToStack(' + playerId + ')">Add Card to Stack</button>';
    document.getElementById('players-container').appendChild(playerContainer);
}

function addCardToBattlefield(playerId) {
    const cardInput = document.getElementById('card-input-' + playerId);
    const cardName = cardInput.value;
    if (cardName) {
        fetch('https://api.scryfall.com/cards/named?fuzzy=' + cardName)
            .then(response => response.json())
            .then(data => {
                if (!data.object === 'error') {
                    const battlefield = document.getElementById('battlefield-' + playerId);
                    const cardElement = document.createElement('div');
                    cardElement.textContent = data.name; // Using the exact name from Scryfall
                    cardElement.onclick = function() { this.remove(); };
                    battlefield.appendChild(cardElement);
                } else {
                    alert('Card not found: ' + cardName);
                }
            });
    }
    cardInput.value = ''; // Clear the input field
}

function addCardToStack(playerId) {
    const cardInput = document.getElementById('card-input-' + playerId);
    const cardName = cardInput.value;
    if (cardName) {
        fetch('https://api.scryfall.com/cards/named?fuzzy=' + cardName)
            .then(response => response.json())
            .then(data => {
                if (!data.object === 'error') {
                    const stackContainer = document.getElementById('stack-container');
                    const cardElement = document.createElement('div');
                    cardElement.textContent = 'Player ' + playerId + ': ' + data.name; // Using the exact name from Scryfall
                    stackContainer.appendChild(cardElement);
                } else {
                    alert('Card not found: ' + cardName);
                }
            });
    }
}

function analyzeStack() {
    const stackContainer = document.getElementById('stack-container');
    const stackLog = document.getElementById('stack-log');
    const cards = stackContainer.querySelectorAll('div');
    let analysisResult = '';
    cards.forEach(card => {
        analysisResult += card.textContent + ' resolves.\n';
    });
    stackLog.textContent = 'Stack Analysis:\n' + analysisResult;
    stackContainer.innerHTML = ''; // Clear the stack after analysis
}
