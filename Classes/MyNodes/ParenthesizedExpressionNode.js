/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type parenthesized_expression.
 *
 * Node looks like this (node.toString):
 * (parenthesized_expression (binary_expression, number, ...))
 *
 * This node cannot have and has no children.
 *
 * Responsible for aiding the correct creation of binary_expressions.
 */

const MyNode = require('./MyNode');

class ParenthesizedExpressionNode extends MyNode {

    /**
     * Returns block for whatever node was inside the parenthesized expression.
     * @returns {Blockly.Block} The block representing the parenthesized expression.
     */
    createBlock() {
        let parenthesizeNodeHandler = this
          .distributor
          .getNodeObject(this.workspace, this.node.child(1), null);
        return parenthesizeNodeHandler.createBlock();
    }


    /**
     * Registers the ParenthesizedExpressionNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("parenthesized_expression", ParenthesizedExpressionNode);
    }
}

module.exports = { ParenthesizedExpressionNode };
