/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type nil.
 * Node looks like this (node.toString):
 * (nil)
 *
 * This node cannot have and does not have children.
 *
 * Responsible for creating blocks of type:
 * - logic_null - nil
 */

const MyNode = require('./MyNode');

class NilNode extends MyNode {

    /**
     * Creates a Blockly block representing a nil value.
     * @returns {Block} The block representing the nil value.
     */
    createBlock() {
        return this._initBlock('logic_null');
    }


    /**
     * Registers the NilNode subclass with the distributor.
     * @param {Distributor} distributor The distributor to register with.
     */
    static register(distributor){
        distributor.registerSubclass("nil", NilNode);
    }
}

module.exports = { NilNode };
