/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type while_statement.
 *
 * Node looks like this (node.toString):
 * (while_statement condition: (condition) body: (block (nodes of loop body)))
 *
 *
 * Responsible for creating blocks of type:
 * - controls_whileUntil - while a < 10 do a = a + 1 end, while not true do end
 */

const MyNode = require('./MyNode');
const {createBlocklyCode} = require("../../helpFunctions");

class WhileNode extends MyNode {

    /**
     * Creates a Blockly block representing a while loop.
     * @returns {Blockly.Block} The block representing the while loop.
     */
    createBlock() {
        let tempBlock = this._initBlock('controls_whileUntil');

        // Set the block mode to "WHILE" -> always same as it can represent all combinations
        tempBlock.setFieldValue("WHILE", "MODE");

        // Connect the condition block to the BOOL input
        let conditionHandler = this.distributor.getNodeObject(this.workspace, this.node.child(1), null);
        let connection = tempBlock.getInput("BOOL").connection;
        connection.connect(conditionHandler.createBlock().outputConnection);

        // Include comments in the block
        let includedComments = this._includeComments(this.node);
        createBlocklyCode(this.workspace, includedComments, this.distributor, "DO", tempBlock);
        return tempBlock;
    }


    /**
     * Registers the WhileNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register the subclass with.
     */
    static register(distributor) {
        distributor.registerSubclass("while_statement", WhileNode);
    }
}

module.exports = { WhileNode };
