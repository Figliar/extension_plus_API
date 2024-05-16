/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type shebang.
 *
 * Node looks like this (node.toString):
 * (shebang)
 *
 * This node cannot have and has no children.
 *
 * Responsible for creating block of type shebang.
 */

const MyNode = require('./MyNode');

class ShebangNode extends MyNode {

    /**
     * Creates a Blockly block representing a shebang statement.
     * @returns {Blockly.Block} The block representing the shebang statement.
     */
    createBlock() {
        let block = this.workspace.newBlock('shebang');
        block.setNextStatement(true);
        block.setFieldValue(this.node.text, 'shebang_context');
        block.initSvg();
        block.render();
        return block;
    }


    /**
     * Registers the ShebangNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("shebang", ShebangNode);
    }
}

module.exports = { ShebangNode };
