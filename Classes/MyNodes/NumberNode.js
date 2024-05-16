/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type number.
 *
 * Node looks like this (node.toString):
 * (number)
 *
 * This node cannot have and has no children.
 *
 * Responsible creating blocks of type:
 * - math_number - 5, 6.9, -9,...
 */

const MyNode = require('./MyNode');

class NumberNode extends MyNode {

    /**
     * Creates a Blockly block representing a simple number.
     * @returns {Blockly.Block} The block representing the number.
     */
    createBlock() {
        let numberBlock = this._initBlock('math_number');
        numberBlock.setFieldValue(this.node.text, 'NUM');
        return numberBlock;
    }


    /**
     * Registers the NumberNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("number", NumberNode);
    }
}

module.exports = { NumberNode };
