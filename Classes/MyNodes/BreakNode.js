/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type break_statement.
 * MyNode looks like this (node.toString):
 * (break_statement)
 * This node cannot have and has no children.
 *
 * Responsible for creating blocks of type:
 * - controls_flow_statements
 * and setting correct value to display (which is only BREAK as CONTINUE is not supported in Lua).
 */

const MyNode = require('./MyNode');

class BreakNode extends MyNode {

    /**
     * Main method, responsible for creating Blockly block representing a break statement.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        let tempBlock = this._initBlock("controls_flow_statements");
        // Set the field value to "BREAK" for the flow statement
        tempBlock.setFieldValue("BREAK", 'FLOW');
        return tempBlock;
    }


    /**
     * Registers the BreakNode class with the distributor for "break_statement" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("break_statement", BreakNode);
    }
}

module.exports = { BreakNode };
