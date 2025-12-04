
class Card {
    constructor(name, type, value, description) {
        this.name = name;
        this.type = type; // 'attack', 'heal'
        this.value = value;
        this.description = description;
    }
}

class Entity {
    constructor(name, maxHealth) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    takeDamage(amount) {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
    }

    heal(amount) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    }

    isDead() {
        return this.currentHealth <= 0;
    }
}

class Game {
    constructor() {
        this.player = new Entity("Player", 30);
        this.enemy = new Entity("Enemy", 30);
        this.deck = [];
        this.hand = [];
        this.discardPile = [];
        this.logs = [];
        this.gameOver = false;

        this.initDeck();
    }

    initDeck() {
        // Create a simple deck
        for (let i = 0; i < 5; i++) this.deck.push(new Card("Strike", "attack", 5, "Deal 5 damage"));
        for (let i = 0; i < 3; i++) this.deck.push(new Card("Big Hit", "attack", 8, "Deal 8 damage"));
        for (let i = 0; i < 4; i++) this.deck.push(new Card("Heal", "heal", 5, "Heal 5 HP"));

        // Shuffle
        this.shuffle(this.deck);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    start() {
        this.player.currentHealth = this.player.maxHealth;
        this.enemy.currentHealth = this.enemy.maxHealth;
        this.hand = [];
        this.drawCards(3);
        this.log("Game started! Player vs Enemy.");
        this.updateUI();
    }

    drawCards(count) {
        for (let i = 0; i < count; i++) {
            if (this.deck.length === 0) {
                if (this.discardPile.length === 0) break;
                this.deck = [...this.discardPile];
                this.discardPile = [];
                this.shuffle(this.deck);
            }
            this.hand.push(this.deck.pop());
        }
    }

    playCard(index) {
        if (this.gameOver) return;

        if (index < 0 || index >= this.hand.length) {
            this.log(`Invalid card index: ${index}`);
            return;
        }

        const card = this.hand[index];
        this.log(`Player played ${card.name}.`);

        if (card.type === 'attack') {
            this.enemy.takeDamage(card.value);
            this.log(`Enemy took ${card.value} damage.`);
        } else if (card.type === 'heal') {
            this.player.heal(card.value);
            this.log(`Player healed ${card.value} HP.`);
        }

        // Remove card from hand and add to discard
        this.hand.splice(index, 1);
        this.discardPile.push(card);

        this.updateUI();

        if (this.enemy.isDead()) {
            this.log("Enemy defeated! You win!");
            this.gameOver = true;
            this.updateUI();
            return;
        }
    }

    endTurn() {
        if (this.gameOver) return;

        this.log("Player turn ended.");

        // Enemy Turn
        const damage = Math.floor(Math.random() * 6) + 3; // 3 to 8 damage
        this.player.takeDamage(damage);
        this.log(`Enemy attacks for ${damage} damage.`);

        if (this.player.isDead()) {
            this.log("Player died! Game Over.");
            this.gameOver = true;
        } else {
            this.drawCards(1);
            this.log("Player draws a card.");
        }

        this.updateUI();
    }

    log(message) {
        console.log(message);
        this.logs.push(message);
        if (this.logs.length > 10) this.logs.shift(); // Keep last 10 logs
    }

    // Placeholder for UI update, will be overridden by main.js
    updateUI() {}
}

const game = new Game();
