/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type repeat_statement.
 *
 * MyNode looks like this (node.toString):
 * (repeat_statement body: (block ...) condition: (true))
 *
 *
 * Responsible for creating blocks of type:
 * - controls_whileUntil - repeat a = a + 1 until a < 10, repeat ... until true
 */
const { createBlocklyCode } = require("../../helpFunctions");
const MyNode = require("./MyNode");

class RepeatNode extends MyNode {

    /**
     * Creates a Blockly block representing a while loop.
     * @returns {Blockly.Block} The block representing the while loop.
     */
    createBlock() {
        let tempBlock = this._initBlock('controls_whileUntil');

        // Set the block mode to "WHILE" -> always same as it can represent all combinations
        tempBlock.setFieldValue("UNTIL", "MODE");

        // Connect the condition block to the BOOL input
        let conditionHandler = this.distributor.getNodeObject(this.workspace, this.node.lastChild, null);
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
        distributor.registerSubclass("repeat_statement", RepeatNode);
    }
}
