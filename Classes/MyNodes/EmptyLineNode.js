/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type empty_line.
 * Node looks like this (node.toString):
 * (empty_line)
 * This node cannot have and has no children.
 *
 * Necessary for creating gaps in between blocks.
 * When present, block created after won't be connected to previous block and will be move down a bit.
 */

const MyNode = require('./MyNode');

class EmptyLineNode extends MyNode {

    /**
     * Returns the last Blockly block generated.
     * @returns {Blockly.Block} The last generated Blockly block.
     */
    createBlock() {
        return this.lastBlock;
    }


    /**
     * Registers the EmptyLineNode class with the distributor for "empty_line" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("empty_line", EmptyLineNode);
    }
}

module.exports = { EmptyLineNode };
