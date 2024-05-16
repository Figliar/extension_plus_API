/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type for_generic_statement.
 * It is better/easier to deal with different types in post-processing then in parsing process.
 * Node looks like this (node.toString):
 * (for_generic_statement
 *  left: (variable_list name: (identifier) name: (identifier))
 *  right: (expression_list value: (call function: (variable name: (identifier)) arguments: (argument_list (expression_list (table)))))
 * )
 *
 * Children:
 * ("for")
 * (variable_list name: (identifier) name: (identifier))
 * ("in")
 * (expression_list value: (call function: (variable name: (identifier)) arguments: (argument_list (expression_list (table)))))
 * ("do")
 * (block (nodes of loop body))
 * ("end")
 *
 * Responsible for creating blocks of type:
 * - controls_forEach - for _, value in ipairs({}) do end
 * - for_index_item - for key, value in ipairs({}) do end
 * Ignoring ipairs() function and accessing the list inside as block is build that way.
 */

const MyNode = require('./MyNode');
const {createBlocklyCode} = require("../../helpFunctions");

class ForGenericNode extends MyNode {

    /**
     * Creates a Blockly block representing a generic for loop.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        // Initialize variables
        let tempBlock;
        let varNodeHandler;
        let connection;
        let includedComments;
        let arrayToIndex = this.node.child(3).firstChild.lastChild.child(1).firstChild;
        let index = this.node.child(1).child(0);
        let item = this.node.child(1).child(2);

        // Check if it's a for-each loop or for-index-item loop
        if(this.node.child(1).child(0).text === "_"){
            tempBlock = this._initBlock('controls_forEach');

             // Create and set variable for for-each loop
            this._createVariableInWorkspace(item);
            tempBlock.setFieldValue(this.workspace.getVariable(item.text.trim()).id_, "VAR");

            // Connect block to iterate over to array input
            varNodeHandler = this.distributor.getNodeObject(this.workspace, arrayToIndex, this.lastBlock);
            connection = tempBlock.getInput("LIST").connection;
            connection.connect(varNodeHandler.createBlock().outputConnection);

            includedComments = this._includeComments(this.node);
            createBlocklyCode(this.workspace, includedComments, this.distributor, "DO", tempBlock);
        }else {
            tempBlock = this._initBlock('for_index_item');

            // Create and set variables for for-index-item loop
            this._createVariableInWorkspace(index);
            tempBlock.setFieldValue(this.workspace.getVariable(index.text.trim()).id_, "index");
            this._createVariableInWorkspace(item);
            tempBlock.setFieldValue(this.workspace.getVariable(item.text.trim()).id_, "item");

            // Connect block to iterate over to array input
            varNodeHandler = this.distributor.getNodeObject(this.workspace, arrayToIndex, this.lastBlock);
            connection = tempBlock.getInput("array").connection;
            connection.connect(varNodeHandler.createBlock().outputConnection);

            includedComments = this._includeComments(this.node);
            createBlocklyCode(this.workspace, includedComments, this.distributor, "input", tempBlock);
        }

        return tempBlock;
    }


    /**
     * Registers the ForGenericNode class with the distributor for "for_generic_statement" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("for_generic_statement", ForGenericNode);
    }
}

module.exports = { ForGenericNode };
