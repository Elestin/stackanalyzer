
document.getElementById('analyze-stack-btn').addEventListener('click', analyzeStack);

let playerId = 0;
const maxPlayers = 4;

// Initialize players
for (playerId = 1; playerId <= maxPlayers; playerId++) {
    addPlayer(playerId);
}

function addPlayer(playerId) {
    const playerContainer = document.createElement('div');
    playerContainer.id = 'player-' + playerId;
    playerContainer.className = 'player-container';
    playerContainer.innerHTML = '<h3 onclick="changePlayer(' + playerId + ')">Player ' + playerId + '</h3>' +
                                '<button onclick="addCardToBattlefield(' + playerId + ')">Add Card to Battlefield</button>' +
                                '<div class="battlefield" id="battlefield-' + playerId + '"></div>';
    document.getElementById('players-container').appendChild(playerContainer);
}

function changePlayer(playerId) {
    // Functionality to change player details (placeholder)
}

function addCardToBattlefield(playerId) {
    const cardName = prompt('Enter the card name:');
    if (cardName) {
        fetch('https://api.scryfall.com/cards/named?exact=' + encodeURIComponent(cardName))
            .then(response => response.json())
            .then(data => {
                if (data.object !== 'error') {
                    const battlefield = document.getElementById('battlefield-' + playerId);
                    const cardElement = document.createElement('div');
                    cardElement.textContent = data.name;
                    cardElement.onclick = function() { cardMenu(this, playerId, data.name); };
                    battlefield.appendChild(cardElement);
                } else {
                    alert('Card not found: ' + cardName);
                }
            });
    }
}

function cardMenu(cardElement, playerId, cardName) {
    const menu = document.createElement('div');
    menu.innerHTML = '<button onclick="duplicateCard('' + cardName + '', ' + playerId + ')">Duplicate</button>' +
                     '<button onclick="addCardToStack('' + cardName + '', ' + playerId + ')">Add to Stack</button>' +
                     '<button onclick="removeFromBattlefield(this)">Remove from Battlefield</button>';
    cardElement.appendChild(menu);
}

function duplicateCard(cardName, playerId) {
    const battlefield = document.getElementById('battlefield-' + playerId);
    const cardElement = document.createElement('div');
    cardElement.textContent = cardName;
    cardElement.onclick = function() { cardMenu(this, playerId, cardName); };
    battlefield.appendChild(cardElement);
}

function addCardToStack(cardName, playerId) {
    const stackContainer = document.getElementById('stack-container');
    const cardElement = document.createElement('div');
    cardElement.textContent = 'Player ' + playerId + ': ' + cardName;
    stackContainer.appendChild(cardElement);
}

function removeFromBattlefield(element) {
    element.parentNode.remove();
}

function analyzeStack() {
    const stackContainer = document.getElementById('stack-container');
    const stackLog = document.getElementById('stack-log');
    const cards = stackContainer.querySelectorAll('div');
    let analysisResult = '';
    cards.forEach(card => {
        analysisResult += card.textContent + ' resolves.
';
    });
    stackLog.textContent = 'Stack Analysis:
' + analysisResult;
    stackContainer.innerHTML = ''; // Clear the stack after analysis
}
