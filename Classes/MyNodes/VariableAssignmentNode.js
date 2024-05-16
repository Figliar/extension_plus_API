/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type variable_assignment.
 *
 * Node looks like this (node.toString):
 * (variable_assignment (variable_list (variable name/table: (where to assign))) (expression_list value: (unary_expression argument: (what is assigned))))
 * Depending on number of children of "where to assign" we know if we are assigning to variable or to indexed array.
 * Does not support "a, b = 1, 2".
 *
 * Children:
 * (variable_list (variable name: (identifier))),("="),(expression_list value: (number))
 * (variable_list (variable table: (identifier) field: (number))),("="),(expression_list value: (number))
 *
 * Responsible for creating blocks of type:
 * - variables_set - a = 1
 * - lists_setIndex - a[1] = 1
 */

const MyNode = require('./MyNode');

class VariableAssignmentNode extends MyNode {

    /**
     * Creates a Blockly block representing a variable assignment.
     * @returns {Blockly.Block} The block representing the variable assignment.
     */
    createBlock() {
        // Create a block for the right side expression
        const rightSideNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.lastChild.firstChild, null);
        let assignBlock = rightSideNodeHandler.createBlock();

        // Create the left side block for variable assignment
        let tempBlock = this._createLeftSide();
        // Determine the setter field based on the block type
        const setter = tempBlock.type === 'variables_set' ? 'VALUE' : 'TO';

        // Connect the right side block to the left side block
        let connection = tempBlock.getInput(setter).connection;
        connection.connect(assignBlock.outputConnection);
        return tempBlock;
    }


    /**
     * Creates a Blockly block representing the left side of a variable assignment.
     * @returns {Blockly.Block} The block representing the left side.
     */
     _createLeftSide(){
        let block;
        let leftVariable = this.node.firstChild.firstChild;
        if (leftVariable.childCount === 1) {
            // Create variable in workspace and variables_set block for simple variable assignment
            this._createVariableInWorkspace(this.node.firstChild);
            block = this._initBlock("variables_set");
            block.setFieldValue(this.workspace.getVariable(leftVariable.firstChild.text.trim()).id_, "VAR");
        }
        else {
            // Create a lists_setIndex block for assigning to a list element
            block = this._initBlock("lists_setIndex");

            // Connect list reference block to the LIST input
            let connection = block.getInput("LIST").connection;
            connection.connect(this._createVariableReference(leftVariable.firstChild).outputConnection);

            // Connect index block to the AT input
            let indexHandler = this.distributor.getNodeObject(this.workspace, leftVariable.child(2), null);
            connection = block.getInput("AT").connection;
            connection.connect(indexHandler.createBlock().outputConnection);
        }
        return block;
    }


    /**
     * Registers the VariableAssignmentNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register the subclass with.
     */
    static register(distributor) {
        distributor.registerSubclass("variable_assignment", VariableAssignmentNode);
    }
}

module.exports = { VariableAssignmentNode };
