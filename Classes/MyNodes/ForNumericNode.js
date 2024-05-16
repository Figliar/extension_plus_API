/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type for_numeric_statement.
 * It is better/easier to deal with different types in post-processing then in parsing process.
 * Node looks like this (node.toString):
 * (for_numeric_statement name: (identifier) start: (number) end: (number) step: (number) body: (block (variable_assignment (variable_list (variable name: (identifier))) (expression_list value: (number)))))
 *
 * Responsible for creating blocks of type:
 * - controls_for - for var=exp1,exp2,exp3 / var=exp1,exp2 / var=exp1,a.n / var=exp1,f(x) do a = 1 end
 */

const MyNode = require('./MyNode');
const {createBlocklyCode} = require("../../helpFunctions");

class ForNumericNode extends MyNode {

    /**
     * Creates a Blockly block representing a numeric for loop.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        let tempBlock = this._initBlock('controls_for');

        // Create and set variable for the loop
        let loopVariable = this.node.child(1);
        this._createVariableInWorkspace(loopVariable);
        tempBlock.setFieldValue(this.workspace.getVariable(loopVariable.text.trim()).id_, "VAR");

        // Get handler for "FROM" value and connect "FROM" value to the block
        let handler = this.distributor.getNodeObject(this.workspace, this.node.child(3), null);
        let connection = tempBlock.getInput("FROM").connection;
        connection.connect(handler.createBlock().outputConnection);

        // Get handler for "TO" value and connect "TO" value to the block
        handler = this.distributor.getNodeObject(this.workspace, this.node.child(5), null);
        connection = tempBlock.getInput("TO").connection;
        connection.connect(handler.createBlock().outputConnection);

        // Check if there is a "BY" value
        if (this.node.child(6).type === ',') {
            // Get handler for "BY" value and connect "BY" value to the block
            handler = this.distributor.getNodeObject(this.workspace, this.node.child(7), null);
            connection = tempBlock.getInput("BY").connection;
            connection.connect(handler.createBlock().outputConnection);
        }

        // Include comments and create Blockly code for the loop body
        let includedComments = this._includeComments(this.node);
        createBlocklyCode(this.workspace, includedComments, this.distributor, "DO", tempBlock);
        return tempBlock;
    }


    /**
     * Registers the ForNumericNode class with the distributor for "for_numeric_statement" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("for_numeric_statement", ForNumericNode);
    }
}

module.exports = { ForNumericNode };
