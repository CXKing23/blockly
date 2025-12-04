
// Define blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "play_card",
    "message0": "play card at index %1",
    "args0": [
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Play a card from your hand (0-based index)",
    "helpUrl": ""
  },
  {
    "type": "end_turn",
    "message0": "end turn",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "End your turn and let the enemy attack",
    "helpUrl": ""
  },
  {
    "type": "player_health",
    "message0": "player health",
    "output": "Number",
    "colour": 230,
    "tooltip": "Get current player health",
    "helpUrl": ""
  },
  {
    "type": "enemy_health",
    "message0": "enemy health",
    "output": "Number",
    "colour": 0,
    "tooltip": "Get current enemy health",
    "helpUrl": ""
  },
  {
    "type": "cards_in_hand",
    "message0": "number of cards in hand",
    "output": "Number",
    "colour": 290,
    "tooltip": "Get the number of cards currently in your hand",
    "helpUrl": ""
  }
]);

// JavaScript Generators
// Use Blockly.JavaScript for standard script tag environments
Blockly.JavaScript.forBlock['play_card'] = function(block) {
  var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'game.playCard(' + value_index + ');\n';
  return code;
};

Blockly.JavaScript.forBlock['end_turn'] = function(block) {
  var code = 'game.endTurn();\n';
  return code;
};

Blockly.JavaScript.forBlock['player_health'] = function(block) {
  var code = 'game.player.currentHealth';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.forBlock['enemy_health'] = function(block) {
  var code = 'game.enemy.currentHealth';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.forBlock['cards_in_hand'] = function(block) {
  var code = 'game.hand.length';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
