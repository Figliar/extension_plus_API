/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type comment. (Only supporting one line comments)
 * Node looks like this (node.toString):
 * (comment)
 * This node cannot have and has no children.
 *
 * Responsible for creating blocks of type:
 * - comment (custom type of block)
 * and setting correct value to display.
 */

const MyNode = require('./MyNode');

class CommentNode extends MyNode {

     /**
     * Main method, responsible for creating Blockly block representing the comment.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        let tempBlock = this._initBlock('comment');
        // Set the comment text in the block to value without comment sign "--"
        tempBlock.setFieldValue(this.node.text.toString().slice(2), "COMMENT_CONTEXT");
        return tempBlock;
    }


    /**
     * Registers the CommentNode class with the distributor for "comment" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("comment", CommentNode);
    }
}

module.exports = { CommentNode };
