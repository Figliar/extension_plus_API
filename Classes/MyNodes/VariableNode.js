/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type variable.
 *
 * Node looks like this (node.toString):
 * (variable name: (identifier))
 *
 * Children:
 * (identifier)
 *
 * Responsible for creating blocks of type:
 * - variables_get - a = variable_created_here
 * - lists_getIndex - a = a[1],
 */

const MyNode = require('./MyNode');

class VariableNode extends MyNode {

    /**
     * Creates a Blockly block representing a variable or a list reference.
     * @returns {Blockly.Block} The block representing the variable or list reference.
     */
    createBlock() {
        let simpleBlock;
        let constants = this.distributor.constants;
        // Check if the node has children (i.e., list reference)
        if(this.node.childCount > 1) {
            // Check if the variable is one of the known constants
            if (Object.keys(constants).includes(this.node.text)){
                // Create block for constant value using saved setter values
                simpleBlock = this._initBlock(constants[this.node.text][0]);
                simpleBlock.setFieldValue(constants[this.node.text][1], constants[this.node.text][2]);
            } else{
                // Create block for list reference
                simpleBlock = this._createListReference();
            }
        } else {
            // Create block for variable reference
            simpleBlock = this._createVariableReference(this.node);
        }
        return simpleBlock;
    }


    /**
     * Creates a Blockly block representing a list reference.
     * @returns {Blockly.Block} The block representing the list reference.
     */
    _createListReference(){
        let block = this._initBlock("lists_getIndex");

        // Connect variable reference block to the VALUE input
        let connection = block.getInput("VALUE").connection;
        connection.connect(this._createVariableReference(this.node.firstChild).outputConnection);

        // Connect index block to the AT input
        let indexHandler = this.distributor.getNodeObject(this.workspace, this.node.child(2), null);
        connection = block.getInput("AT").connection;
        connection.connect(indexHandler.createBlock().outputConnection);
        return block;
    }


    /**
     * Registers the VariableNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register the subclass with.
     */
    static register(distributor) {
        distributor.registerSubclass("variable", VariableNode);
    }
}

module.exports = { VariableNode };
