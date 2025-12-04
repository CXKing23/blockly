
let workspace = null;

// Initialize Blockly
function initBlockly() {
    workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox'),
        scrollbars: true,
        trashcan: true
    });
}

// Override game UI update
game.updateUI = function() {
    // Update Stats
    document.getElementById('player-hp-text').innerText = `${this.player.currentHealth}/${this.player.maxHealth}`;
    document.getElementById('player-hp-bar').style.width = `${(this.player.currentHealth / this.player.maxHealth) * 100}%`;

    document.getElementById('enemy-hp-text').innerText = `${this.enemy.currentHealth}/${this.enemy.maxHealth}`;
    document.getElementById('enemy-hp-bar').style.width = `${(this.enemy.currentHealth / this.enemy.maxHealth) * 100}%`;

    // Update Hand
    const handContainer = document.getElementById('hand-container');
    handContainer.innerHTML = '';

    this.hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <div class="card-index">${index}</div>
            <div class="card-title">${card.name}</div>
            <div class="card-desc">${card.description}</div>
            <div class="card-cost">${card.type.toUpperCase()}</div>
        `;
        handContainer.appendChild(cardDiv);
    });

    // Update Logs
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '';
    this.logs.forEach(msg => {
        const div = document.createElement('div');
        div.innerText = msg;
        logContainer.appendChild(div);
    });
    logContainer.scrollTop = logContainer.scrollHeight;
};

function runCode() {
    if (game.gameOver) {
        alert("Game is over! Reset to play again.");
        return;
    }

    // Safety for infinite loops
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';

    try {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

        console.log("Generated Code:", code);

        // Execute
        try {
            eval(code);
        } catch (e) {
            console.error(e);
            alert("Error running code: " + e);
        }

    } catch (e) {
        console.error("Generation error", e);
        alert("Error generating code: " + e);
    }
}

function resetGame() {
    game.gameOver = false;
    game.deck = [];
    game.discardPile = [];
    game.initDeck();
    game.start();
    game.logs = ["Game reset."];
    game.updateUI();
}

// Start
window.addEventListener('load', function() {
    initBlockly();
    game.start();
});
