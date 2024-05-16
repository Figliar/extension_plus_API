/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type true/false.
 * Node looks like this (node.toString):
 * (comment)
 * This node cannot have and has no children.
 *
 * Responsible for creating blocks of type:
 * - logic_boolean
 * and setting correct value to display.
 */

const MyNode = require('./MyNode');

class BooleanNode extends MyNode {

    /**
     * Main method, responsible for creating Blockly block representing the boolean value.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        let booleanBlock = this._initBlock('logic_boolean');
        // Set the value of the boolean block (true/false)
        booleanBlock.setFieldValue(this.node.type.toUpperCase(), 'BOOL');
        return booleanBlock;
    }


    /**
     * Registers the BooleanNode class with the distributor for "true" and "false" node types.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("true", BooleanNode);
        distributor.registerSubclass("false", BooleanNode);
    }
}


module.exports = { BooleanNode };


