/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This file contains all the helper functions used in processing the tree.
 */

const { Distributor } = require('./Classes/Distributor/Distributor');
const {CommentNode} = require("./Classes/MyNodes/CommentNode");

/**
 * Lists input names and field names of a Blockly block.
 * Function used mainly for debugging and development purposes
 * @param {Blockly.Block} block The block to list input and field names for.
 */
function listInputNames(block){
    console.debug("Inputs for block: ", block.type);
    block.inputList.forEach(function(input) {
        console.debug("Input Name: ", input.name);
        input.fieldRow.forEach(function(field){
            console.debug("Field Name: ", field.name);
        })
    });
    console.debug("------------ END OF LISTING ------------");
}

/**
 * Retrieves parameters from the given node.
 * @param {Node} node The node to retrieve parameters from.
 * @returns {Node[]|null} An array of parameters if found, otherwise null.
 */
function getParameters(node){
    if (node.childCount === 0){
        return null;
    }
    let array = [];
    for(const child of node.children){
        if (child.text !== ',' && child.text !== '(' && child.text !== ')'){
            array.push(child);
        }
    }
    return array;
}


/**
 * Resets the Blockly workspace by removing all blocks.
 * @param {Blockly.Workspace} workspace The workspace to reset.
 */
function reset_workspace(workspace){
    var blocks = workspace.getAllBlocks();
    blocks.forEach(function(block){
        block.dispose();
    });
    workspace.cleanUp();
}


/**
 * Function to recursively collect error nodes from the AST tree and store them in an array.
 * @param {Node} node - The current node being processed.
 * @param {Node[]} errorNodes - Array to store error nodes.
 */
function collectErrorNodes(node, errorNodes) {
    if (node.type === 'ERROR' || node.toString().includes("MISSING")){
        errorNodes.push(node);
    }
    // Recursively traverse child nodes
    for (const childNode of node.children) {
        collectErrorNodes(childNode, errorNodes);
    }
}


/**
 * Function to find error nodes in the AST tree and return them.
 * @param {Tree} tree - The AST tree to search for errors.
 * @returns {Node[]} - Array of error nodes found in the tree.
 */
function findErrors(tree) {
    const errorNodes = [];
    collectErrorNodes(tree, errorNodes);
    return errorNodes;
}



/**
 * Creates Blockly code based on the tree received from tree-sitter.
 * @param workspace
 * @param {Node} root_node The root node of the tree.
 * @param {Distributor} distributor The main distributor which stores important info
 * @param {string} bodySetter The setter for the body of the block. null for main block
 * @param {Blockly.Block|null} outerBlock The outer block of inner statement. null for main block.
 * @returns {Blockly.Workspace} Returns Blockly.Workspace.
 */
function createBlocklyCode(workspace, root_node, distributor , bodySetter, outerBlock ){
    let tempBlock; // Variable to store temporary block
    let lastBlock = null; // Variable to store the last block created
    let statementConnection; // Variable to store statement connection
    let isInner = outerBlock !== null; // Check if it's an inner block
    let wasComment = false;

    // Iterate through the nodes of the tree
    for (const node of root_node.children) {

        // Get node handler from distributor and create block
        const nodeHandler = distributor.getNodeObject(workspace, node, lastBlock);
        if (nodeHandler instanceof CommentNode && !isInner){
            // Ignore comments in the main body to avoid infinite loop of generating comments for functions
            wasComment = true;
            continue
        }
        tempBlock = nodeHandler.createBlock();

        // Deal with connecting the blocks or moving the new block from last one
        if (isInner){
            if (outerBlock !== null && tempBlock !== null) {
                statementConnection = outerBlock.getInput(bodySetter).connection;
                statementConnection.connect(tempBlock.previousConnection);
                outerBlock = null;
            }
            else if (tempBlock !== null && lastBlock !== null) {
                tempBlock.previousConnection.connect(lastBlock.nextConnection);
            }
        }
        else if (lastBlock !== null){
            if (node.previousSibling.type === 'empty_line'
                || node.type === 'function_definition_statement'
                || node.previousSibling.type === 'function_definition_statement'
                || wasComment) {
                if (tempBlock !== lastBlock) {
                    let blockPosition = lastBlock.getRelativeToSurfaceXY();
                    tempBlock.moveBy(blockPosition.x + 0, blockPosition.y + lastBlock.height + 30);
                }
            }
            else if (lastBlock.type !== 'procedures_defnoreturn' || lastBlock.type !== 'procedures_defreturn')
                tempBlock.previousConnection.connect(lastBlock.nextConnection);
        }
        lastBlock = tempBlock; // Update last block
        wasComment = false;
    }
    return workspace; // Return true after it is finished
}

module.exports = { createBlocklyCode, findErrors, reset_workspace, getParameters };
