/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type return_statement.
 * This node must be present in the main body of function definition,
 * so it could be recognized as a function with return value
 *
 * Responsible for creating blocks of type:
 * - procedures_ifreturn - return, return a * 5, return true
 */

const MyNode = require('./MyNode');

class ReturnNode extends MyNode {

    /**
     * Creates a Blockly block for the return statement node.
     * @returns {Blockly.Block} The Blockly block representing the return statement.
     */
    createBlock() {
        let tempBlock = null;
        let granParent = this.node.parent.parent;
        if (granParent) {
            if (granParent.type === 'function_definition_statement') {
                return null;
            }
        }
        // if (this.node.parent.type === 'block' || this.node.parent.type === 'chunk'){
        tempBlock = this._initBlock("procedures_ifreturn");
        if (this.node.childCount > 1){
            let valueNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.lastChild.firstChild, null);
            // let connection = tempBlock.getInput("RETURN").connection;
            let connection = tempBlock.getInput("VALUE").connection;
            connection.connect(valueNodeHandler.createBlock().outputConnection);
        }
        return tempBlock
    }


    /**
     * Registers the ReturnNode class with the distributor for handling return statements.
     * @param {Distributor} distributor - The distributor object used for class registration.
     */
    static register(distributor) {
        distributor.registerSubclass("return_statement", ReturnNode);
    }
}

module.exports = { ReturnNode };
