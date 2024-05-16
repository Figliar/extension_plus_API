/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * Represents a generic node in the tree.
 */

const Blockly = require('blockly');

class MyNode {

    /**
     * Creates a new MyNode instance.
     * @param workspace
     * @param {Object} node - The node data.
     * @param {Distributor} distributor - The distributor object.
     * @param {Blockly.Block} lastBlock - The last block created.
     */
    constructor(workspace, node, distributor, lastBlock) {
        this.workspace = workspace;
        this.node = node;
        this.lastBlock = lastBlock;
        this.distributor = distributor;
    }


    /**
     * Placeholder method for creating a Blockly block.
     * Subclasses should override this method.
     */
    createBlock() {}


    /**
     * Creates a Blockly block representing a variable reference.
     * @param {Object} node - The node containing variable data.
     * @returns {Blockly.Block} The block representing the variable reference.
     */
    _createVariableReference(node){
        let block = this._initBlock("variables_get");
        block.setFieldValue(this.workspace.getVariable(node.text.trim()).id_, "VAR");
        return block;
    }


    /**
     * Initializes a new Blockly block.
     * @param {string} name - The name of the block to initialize.
     * @returns {Blockly.Block} The initialized block.
     */
    _initBlock(name){
        let block = this.workspace.newBlock(name);
        block.initSvg();
        block.render();
        return block;
    }


    /**
     * Creates a variable in the Blockly workspace if it doesn't already exist.
     * @param {Object} node - The node containing variable data.
     */
    _createVariableInWorkspace(node){
        let variables = this.workspace.getAllVariables();
        if(!variables.includes(this.workspace.getVariable(node.text.trim()))){
            this.workspace.createVariable(node.text.trim());
        }
    }


    /**
     * Finds and returns the first child node of a specific type.
     * @param {string} name - The type of node to search for.
     * @returns {Node|null} The first child node of the specified type, or null if not found.
     */
    _returnNodeOfName(name){
        let next = this.node.firstChild;
        while (next){
            if(next.type === name){
                return next;
            }
            next = next.nextSibling;
        }
        return null;
    }


    /**
     * Collects comments and blocks from the first generation children of a given node.
     * @param {Node} node - The node whose children are to be inspected.
     * @returns {Object} - An object containing collected comments and blocks.
     */
    _includeComments(node){
        let tempDict = {"children": []};
        let next = node.child(0);
        let blockNext;
        while(next){
            if(next.type === 'comment'){
                tempDict.children.push(next);
            }
            else if(next.type === 'block'){
                blockNext = next.child(0);
                while(blockNext){
                    tempDict.children.push(blockNext);
                    blockNext = blockNext.nextSibling;
                }
            }
            next = next.nextSibling;
        }
        return tempDict;
    }


    /**
     * Placeholder method for registering a class to Distributor instance.
     * Subclasses should override this method.
     */
    static register(distributor){}
}

module.exports = MyNode;
