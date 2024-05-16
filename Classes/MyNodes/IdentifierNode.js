/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type identifier.
 *
 * Node looks like this (node.toString):
 * (identifier)
 *
 * This node cannot have and has no children.
 *
 * Responsible for aiding to name blocks of variable, table, ... types.
 */

const MyNode = require('./MyNode');

class IdentifierNode extends MyNode {

    /**
     * Creates a block representing a variable reference.
     * @returns {Blockly.Block} The block representing the variable reference.
     */
    createBlock() {
      return this._createVariableReference(this.node);
    }


    /**
     * Registers the IdentifierNode subclass with the distributor.
     * @param {Distributor} distributor The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("identifier", IdentifierNode);
    }

}

module.exports = { IdentifierNode };
