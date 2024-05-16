/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type binary_expression.
 * binary_expression node can look like this (node.toString()):
 * (binary_expression left: (firstChild) right: (lastChild))
 * All children of binary_expression node:
 * (firstChild),(operand e.g. "+"),(lastChild)
 *
 * Responsible for creating blocks of types:
 * - math_arithmetic - for operands: *, /, -, +, ^.
 * - logic_compare - for operands: ==, <, >, <=, >=, ~=
 * - math_modulo - for operand: %.
 * - logic_operation - for operands: or, and.
 * - text_join - for operand: concatenation operand -> .. (two dots).
 */

const MyNode = require('./MyNode');
const Blockly = require('blockly');

const arithmeticOperands = ["+","-","/","*","^"];
const logicOperands = ["==","<",">","<=",">=", "~="];

class BinaryExpressionNode extends MyNode {

    /**
      * Main method, responsible for creating Blockly block representing a binary expression.
      * @returns {Blockly.Block} The created Blockly block.
      */
    createBlock() {
        // Get the type of operand
        let operand = this.node.child(1).type.toString();

        // Check if the operand is '..' (string concatenation). Requires different approach.
        if (operand === '..'){
            return this._createConcatenationBlock(); // Create a concatenation block
        }

        let connection;
        let leftSideSetter = "DIVIDEND";
        let rightSideSetter = "DIVISOR";

        // Initialize a binary expression block based on the operand
        let binaryExpressionBlock = this._initBlock(this._returnBlockType(operand));

        // Get handlers for left and right nodes of the binary expression
        let leftNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.firstChild, null);
        let rightNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.lastChild, null);

        // Set operation and connection names for non-modulo operations
        if (operand !== "%") {
            binaryExpressionBlock.setFieldValue(this._setOperation(operand), "OP");
            leftSideSetter = "A";
            rightSideSetter = "B"
        }

        // Connect the left and right nodes to the binary expression block
        connection = binaryExpressionBlock.getInput(leftSideSetter).connection;
        connection.connect(leftNodeHandler.createBlock().outputConnection);
        connection = binaryExpressionBlock.getInput(rightSideSetter).connection;
        connection.connect(rightNodeHandler.createBlock().outputConnection);

         // Return the created binary expression block
        return binaryExpressionBlock;
    }


    /**
     * Creates a Blockly block representing a string concatenation expression.
     * Approach is different as this block needs to be mutated to add new inputs.
     * This mutation is done in one go, once we know how many inputs there are.
     * @returns {Blockly.Block} The created Blockly block.
     */
    _createConcatenationBlock() {
        let block = this._initBlock("text_join");
        let children = []; // Array to store child nodes
        let next = this.node;

        // Traverse the binary expression tree to gather child nodes
        while (next.type === 'binary_expression'){
            children.push(next.firstChild);
            next = next.lastChild;
        }
        children.push(next); // Push the last child node

        // Create mutation XML to set the number of items in the text_join block
        const mutationXml = Blockly.utils.xml.textToDom(
                `<mutation items="` + children.length + `"></mutation>`
        );
        block.domToMutation(mutationXml); // Apply the mutation to the block

        let strBlock;
        let strNodeHandler;
        let connection;

        // Connect child nodes to the text_join block
        for (let i= 0; i < children.length; i++){
            // Get the node handler for the current child node
            strNodeHandler = this.distributor.getNodeObject(this.workspace, children[i], null);
            strBlock = strNodeHandler.createBlock();
            // Connect the block to the appropriate input of the text_join block
            connection = block.getInput(`ADD${i}`).connection;
            connection.connect(strBlock.outputConnection);
        }

        return block;
    }


    /**
     * Determines the type of Blockly block to use based on the given operand.
     * @param {string} operand The operand of the binary expression.
     * @returns {string} The type of Blockly block.
     */
    _returnBlockType(operand){
        if (arithmeticOperands.includes(operand))
            return "math_arithmetic"
        else if (logicOperands.includes(operand))
            return "logic_compare"
        else if (operand === '%')
            return "math_modulo"
        else
            return "logic_operation"
    }


    /**
     * Sets the Blockly operation based on the given operand.
     * @param {string} operand The operand of the binary expression.
     * @returns {string} The Blockly operation.
     */
    _setOperation(operand){
         const operationMap = new Map([
            ['+', 'ADD'],
            ['-', 'MINUS'],
            ['/', 'DIVIDE'],
            ['*', 'MULTIPLY'],
            ['%', 'MOD'],
            ['^', 'POWER'],
            ['==', 'EQ'],
            ['<', 'LT'],
            ['>', 'GT'],
            ['>=', 'GTE'],
            ['<=', 'LTE'],
            ['~=', 'NEQ'],
            ['and', 'AND'],
            ['or', 'OR']
        ]);

        // Check if the operand exists in the map
        if (operationMap.has(operand)) {
            // If yes, return the corresponding Blockly operation
            return operationMap.get(operand);
        } else {
            // If not, log an error and return 'UNKNOWN'
            console.error(`ERROR: Unknown operand in arithmetic expression: ${operand}.`);
            return 'UNKNOWN';
        }
    }


    /**
     * Registers the BinaryExpressionNode class with the distributor.
     * This allows the distributor to create instances of BinaryExpressionNode
     * when encountering nodes of type "binary_expression" in the abstract syntax tree (AST).
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("binary_expression", BinaryExpressionNode);
    }

}

module.exports = { BinaryExpressionNode };
