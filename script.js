
document.getElementById('add-player-btn').addEventListener('click', addPlayer);
document.getElementById('analyze-stack-btn').addEventListener('click', analyzeStack);

let playerId = 0;

function addPlayer() {
    playerId++;
    const playerContainer = document.createElement('div');
    playerContainer.id = 'player-' + playerId;
    playerContainer.innerHTML = '<h3>Player ' + playerId + '</h3>' +
                                '<button onclick="addCardToBattlefield(' + playerId + ')">Add Card to Battlefield</button>' +
                                '<div class="battlefield" id="battlefield-' + playerId + '"></div>' +
                                '<button onclick="addCardToStack(' + playerId + ')">Add Card to Stack</button>';
    document.getElementById('players-container').appendChild(playerContainer);
}

function addCardToBattlefield(playerId) {
    const cardName = prompt('Enter the card name:');
    if (cardName) {
        const battlefield = document.getElementById('battlefield-' + playerId);
        const cardElement = document.createElement('div');
        cardElement.textContent = cardName;
        cardElement.onclick = function() { this.remove(); };
        battlefield.appendChild(cardElement);
    }
}

function addCardToStack(playerId) {
    const cardName = prompt('Enter the card name for the stack:');
    if (cardName) {
        const stackContainer = document.getElementById('stack-container');
        const cardElement = document.createElement('div');
        cardElement.textContent = 'Player ' + playerId + ': ' + cardName;
        stackContainer.appendChild(cardElement);
    }
}

function analyzeStack() {
    // Simplified stack analysis logic (placeholder for now)
    const stackContainer = document.getElementById('stack-container');
    const cards = stackContainer.querySelectorAll('div');
    let analysisResult = '';
    cards.forEach(card => {
        analysisResult += card.textContent + ' resolves.\n';
    });
    alert('Stack Analysis:\n' + analysisResult);
    // Clear the stack after analysis
    stackContainer.innerHTML = '';
}
