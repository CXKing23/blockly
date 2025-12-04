# Blockly Card Battler

A simple programmable card game built with Blockly.

## Project Structure

*   `index.html`: The main entry point. Contains the UI layout.
*   `game_logic.js`: The core game engine (Health, Deck, Turn logic).
*   `game_blocks.js`: Definitions for the custom Blockly blocks and their JavaScript generators.
*   `index.js`: Initializes Blockly and handles the "Run Code" execution.
*   `style.css`: Styles for the game UI.

## How to use in Visual Studio Code

1.  **Open the Folder:**
    *   Open Visual Studio Code.
    *   Go to **File** > **Open Folder...** and select the `blockly-card-game` folder.

2.  **Install Live Server (Recommended):**
    *   Go to the Extensions view (Ctrl+Shift+X).
    *   Search for "Live Server" by Ritwick Dey.
    *   Install it.

3.  **Run the Game:**
    *   Right-click on `index.html` in the file explorer.
    *   Select **Open with Live Server**.
    *   The game will open in your default browser.

## How to Play

1.  Drag blocks from the **Game Actions** category to the workspace.
2.  Use `play card at index` to play cards from your hand (0 is the first card).
3.  Use `end turn` to finish your turn and let the enemy attack.
4.  Use Logic and Loop blocks to create more complex strategies (e.g., "While enemy health > 0, play card 0").
5.  Click **Run Code** to execute your strategy.
