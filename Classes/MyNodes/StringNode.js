/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type string.
 *
 * Node looks like this (node.toString):
 * (string)
 *
 * This node cannot have and has no children.
 *
 * Responsible creating blocks of type:
 * - text - "string", '15698', ...
 */

const MyNode = require('./MyNode');

class StringNode extends MyNode {

    /**
     * Creates a Blockly block representing a string.
     * @returns {Blockly.Block} The block representing the string.
     */
    createBlock() {
        let stringBlock = this._initBlock('text');
        stringBlock.setFieldValue(this.node.text.substring(1, this.node.text.length - 1), "TEXT");
        return stringBlock;
    }


    /**
     * Registers the StringNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("string", StringNode);
    }
}

module.exports = { StringNode };



