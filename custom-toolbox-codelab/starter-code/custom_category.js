Blockly.defineBlocksWithJsonArray([
    // Block for placing an 'X' at a specific location
    {
      "type": "place_x_at",
      "message0": "place X at row %1 col %2",
      "args0": [
        {
          "type": "input_value",
          "name": "ROW",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "COL",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Places an 'X' on the board at the specified row and column.",
      "helpUrl": ""
    },
    // Block for checking if a square is empty
    {
      "type": "is_square_empty",
      "message0": "is square at row %1 col %2 empty?",
      "args0": [
        {
          "type": "input_value",
          "name": "ROW",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "COL",
          "check": "Number"
        }
      ],
      "output": "Boolean",
      "colour": 230,
      "tooltip": "Returns true if the square at the specified row and column is empty.",
      "helpUrl": ""
    }
  ]);

  javascript.javascriptGenerator.forBlock['place_x_at'] = function(block) {
    var row = javascript.javascriptGenerator.valueToCode(block, 'ROW', javascript.javascriptGenerator.ORDER_ATOMIC);
    var col = javascript.javascriptGenerator.valueToCode(block, 'COL', javascript.javascriptGenerator.ORDER_ATOMIC);
    var code = 'placeX(' + row + ', ' + col + ');\n';
    return code;
  };

  javascript.javascriptGenerator.forBlock['is_square_empty'] = function(block) {
    var row = javascript.javascriptGenerator.valueToCode(block, 'ROW', javascript.javascriptGenerator.ORDER_ATOMIC);
    var col = javascript.javascriptGenerator.valueToCode(block, 'COL', javascript.javascriptGenerator.ORDER_ATOMIC);
    var code = 'isSquareEmpty(' + row + ', ' + col + ')';
    return [code, javascript.javascriptGenerator.ORDER_FUNCTION_CALL];
  };

class CustomCategory extends Blockly.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }
  addColourBorder_(colour){
    this.rowDiv_.style.backgroundColor = colour;
  }
  /** @override */
  setSelected(isSelected){

    // We do not store the label span on the category, so use getElementsByClassName.
    var labelDom = this.rowDiv_.getElementsByClassName('blocklyToolboxCategoryLabel')[0];
    if (isSelected) {
      // Change the background color of the div to white.
      this.rowDiv_.style.backgroundColor = 'white';
      // Set the colour of the text to the colour of the category.
      labelDom.style.color = this.colour_;
    } else {
      // Set the background back to the original colour.
      this.rowDiv_.style.backgroundColor = this.colour_;
      // Set the text back to white.
      labelDom.style.color = 'white';
    }
    // This is used for accessibility purposes.
    Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
      Blockly.utils.aria.State.SELECTED, isSelected);
  }

  createIconDom_() {
    const img = document.createElement('img');
    img.src = './logo_only.svg';
    img.alt = 'Lamp';
    img.width='15';
    img.height='15';
    return img;
  }
}
Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory, true);