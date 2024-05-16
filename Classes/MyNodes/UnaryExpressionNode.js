/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type unary_expression.
 *
 * Node looks like this (node.toString):
 * (unary_expression argument: (value to apply unary_expression on))
 *
 * This node cannot have and has no children.
 *
 * Responsible creating blocks of type:
 * - logic_negate - not true, not false, not nil, not a, not (1 > 2)
 * - text_length - #{}, #{1, 2, 3, ...}, #"string", #'string', #variable
 * - (lists_length) - identical block as text_length that generates same code (only difference is color)
 * - math_single - value = 1 + -(2), negative_a = -a, negative_length = -#{1,2,3}
 */

const MyNode = require('./MyNode');

class UnaryExpressionNode extends MyNode {

    /**
     * Creates a Blockly block representing a unary expression, such as 'not', '#', or '-'.
     * @returns {Blockly.Block} The block representing the unary expression.
     */
    createBlock() {
        let unaryBlock;
        let setter;
        let operator = this.node.firstChild.text;
        const rightSideNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.lastChild, null);
        let valueBlock = rightSideNodeHandler.createBlock();

        // Choose the appropriate block type based on the unary operator
        if (operator === "not"){
            unaryBlock = this._initBlock("logic_negate");
            setter = "BOOL";
        }
        else if (operator === "#") {
            unaryBlock = this._initBlock("text_length");
            setter = "VALUE";
        }
        else if (operator === "-") {
            unaryBlock = this._initBlock("math_single");
            unaryBlock.setFieldValue("NEG", "OP");
            setter = "NUM";
        }
        else{
            throw new Error("Unknown unary operator: ", operator);
        }
        let connection = unaryBlock.getInput(setter).connection;
        connection.connect(valueBlock.outputConnection);
        return unaryBlock;
    }


    /**
     * Registers the UnaryExpressionNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("unary_expression", UnaryExpressionNode);
    }
}

module.exports = { UnaryExpressionNode };
