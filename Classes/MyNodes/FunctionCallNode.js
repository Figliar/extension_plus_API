/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type call.
 * It is only possible to deal with different types in post-processing of parsed code.
 * Node looks like this (node.toString):
 * (call function: (variable name: (identifier)) arguments: (argument_list (expression_list (number))))
 *
 * Responsible for creating blocks of type:
 * - procedures_callreturn
 * - procedures_callnoreturn
 * - All types in functionsOnlyCall list (functions of LOVE2D with no return value)
 * - All types in functionsReturn list (functions of LOVE2D with return value)
 * - All types in functionsReturn2 list (functions of Math, Lists and Text categories with return value, that require special approach)
 */

const MyNode = require('./MyNode');
const {getParameters} = require("../../helpFunctions");
const Blockly = require('blockly');

class FunctionCallNode extends MyNode {

    /**
     * Creates a Blockly block representing a function call.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        let functionBlock;
        this.key = this.node.child(0).text.trim();

        if (this.node.parent.type === 'block' || this.node.parent.type === 'chunk'){
            if (Object.keys(this.distributor.functionsOnlyCall).includes(this.key)){
                // Function calls with a predefined block which has no return value
                functionBlock = this._initBlock(this.distributor.functionsOnlyCall[this.key]);
                if (this.key === 'table.insert'){
                    functionBlock.setFieldValue("INSERT", "MODE");
                    this._fillOnlyInputParameters(functionBlock);
                } else {
                    this._fillParameters(functionBlock);
                }
            }
            else if (this.distributor.customFunctions[this.key]["return"] === null){
                // Custom function call without return value
                functionBlock = this._initBlock("procedures_callnoreturn");
                functionBlock.setFieldValue(this.key, "NAME");
                let values = getParameters(this.node.child(1).child(1));
                if (this.distributor.customFunctions[this.key]["params"] !== null) {
                    functionBlock.domToMutation(this.distributor.customFunctions[this.key]["mutation"]);
                }
                this._fillParameters(functionBlock);
            }
        }
        else{
            if (Object.keys(this.distributor.functionsReturnLOVE).includes(this.key)){
                // Function call with a predefined block with return value
                functionBlock = this._initBlock(this.distributor.functionsReturnLOVE[this.key]);
                this._fillParameters(functionBlock);
            }
            else if (Object.keys(this.distributor.functionsReturn).includes(this.key)) {
                // Function call with a predefined block with return value, that needs special approach
                // Check for specific functions with multiple block types
                functionBlock = this._specialReturnFunctions();
            }
            else if(this.distributor.customFunctions[this.key]["return"] !== null){
                // Custom function call with return value
                functionBlock = this._initBlock("procedures_callreturn");
                functionBlock.setFieldValue(this.key, "NAME");
                // let values = getParameters(this.node.child(1).child(1));
                // Apply the mutation to the block if it is needed according to the definition
                if (this.distributor.customFunctions[this.key]["params"] !== null) {
                    functionBlock.domToMutation(this.distributor.customFunctions[this.key]["mutation"]);
                }
                this._fillParameters(functionBlock);
            }
        }
        return functionBlock;
    }


    /**
     * Fills in the parameters for the given function block (both fields and inputs).
     * @param {Blockly.Block} block The Blockly block for the function call.
     */
    _fillParameters(block){
        let params = getParameters(this.node.child(1).child(1));
        if (params === null){
            return null;
        }
        let counter = 0;
        for (const input of block.inputList){
            if(input.name !== "" && params[counter] && input.name !== 'TOPROW') {
                let paramHandler = this.distributor.getNodeObject(this.workspace, params[counter], null);
                let connection = block.getInput(input.name).connection;
                if (connection !== null) {
                    connection.connect(paramHandler.createBlock().outputConnection);
                    counter = counter + 1;
                }
            }
            // Fill in values for fields
            input.fieldRow.forEach(function(field) {
                if (params[counter]) {
                    if (field instanceof Blockly.FieldVariable ||
                        field instanceof Blockly.FieldNumber ||
                        field instanceof Blockly.FieldDropdown ||
                        field instanceof Blockly.FieldTextInput ||
                        field instanceof Blockly.FieldAngle ||
                        field instanceof Blockly.FieldCheckbox)
                    {
                        block.setFieldValue(params[counter].text.replaceAll("\"", "").replaceAll("\'", ""), field.name);
                        counter = counter + 1;
                    }
                }
            });
        }
    }


    /**
     * Fill only input parameters of the block.
     * Necessary for functions which require special approach to fill the fields
     * @param {Block} block - The Blockly block for the function call.
     */
    _fillOnlyInputParameters(block){
        let params = getParameters(this.node.child(1).child(1));
        if (params === null){
            return null;
        }
        let counter = 0;
        for (const input of block.inputList){
            if(input.name !== "" && params[counter] && input.name !== 'TOPROW') {
                console.debug(input.name);
                let paramHandler = this.distributor.getNodeObject(this.workspace, params[counter], null);
                let connection = block.getInput(input.name).connection;
                if (connection !== null){
                    connection.connect(paramHandler.createBlock().outputConnection);
                    counter = counter + 1;
                }
            }
        }
    }


    /**
     * Handle special cases for creating blocks based on specific functions.
     * Very ugly, but there was no way around it.
     * @returns {Block} The generated block.
     */
    _specialReturnFunctions(){
        let functionBlock;
        let functionsReturn2 = this.distributor.functionsReturn;
        if (this.key === 'math.random') {
            // Random function
            if (this.node.lastChild.childCount === 2) {
                functionBlock = this._initBlock("math_random_float");
            } else {
                functionBlock = this._initBlock("math_random_int");
            }
        } else if (this.key === 'math.log') {
            // Logarithm function
            functionBlock = this._initBlock("math_single");
            functionBlock.setFieldValue(this.node.lastChild.child(1).childCount === 1 ? "LN" : "LOG10", "OP");
        } else if (this.key === 'math.min'){
            functionBlock = this._initBlock(functionsReturn2[this.key][0]);
            let constrain = this.node.lastChild.child(1).firstChild.lastChild.child(1).firstChild;
            let low = this.node.lastChild.child(1).firstChild.lastChild.child(1).lastChild;
            let high = this.node.lastChild.child(1).lastChild;
            let connection = functionBlock.getInput("VALUE").connection;
            connection.connect(this.distributor.getNodeObject(constrain).createBlock().outputConnection);
            connection = functionBlock.getInput("LOW").connection;
            connection.connect(this.distributor.getNodeObject(low).createBlock().outputConnection);
            connection = functionBlock.getInput("HIGH").connection;
            connection.connect(this.distributor.getNodeObject(high).createBlock().outputConnection);
            return functionBlock;
        } else if (this.key === 'math.deg'){
            functionBlock = this._initBlock(functionsReturn2[this.key][0]);
            let x = this.node.lastChild.child(1).firstChild.lastChild.child(1).firstChild;
            let y = this.node.lastChild.child(1).firstChild.lastChild.child(1).lastChild;
            let connection = functionBlock.getInput("x").connection;
            connection.connect(this.distributor.getNodeObject(x).createBlock().outputConnection);
            connection = functionBlock.getInput("y").connection;
            connection.connect(this.distributor.getNodeObject(y).createBlock().outputConnection);
            return functionBlock;
        } else if (this.key === 'string.gsub') {
            // String substitution function
            functionBlock = this._initBlock("text_trim");
            let whichSide =  this.node.lastChild.child(1).child(2).text;
            whichSide = whichSide.substring(1, whichSide.length - 1);
            functionBlock.setFieldValue(
                whichSide === "^%s*(.-)%s*$" ? "BOTH" : whichSide === "^%s*(,-)" ? "LEFT" : "RIGHT", "MODE");
        } else if (this.key === 'list_sort'){
            functionBlock = this._initBlock("lists_sort");
            let connection = functionBlock.getInput("LIST").connection;
            let paramNodes = this.node.child(1).child(1);
            let type = paramNodes.child(2).text;
            connection.connect(this.distributor.getNodeObject(paramNodes.child(0)).createBlock().outputConnection);
            functionBlock.setFieldValue(type.substring(1, type.length - 1), "TYPE");
            functionBlock.setFieldValue(paramNodes.child(4).text, "DIRECTION");
            return functionBlock
        } else if (this.key === 'string.sub'){
            functionBlock = this._initBlock(functionsReturn2[this.key][0]);
            functionBlock.setFieldValue("FROM_START", "WHERE1");
            functionBlock.setFieldValue("FROM_START", "WHERE2");
        } else if (this.key.includes("list_sublist_")){
            functionBlock = this._initBlock(functionsReturn2[this.key][0]);
            functionBlock.setFieldValue(functionsReturn2[this.key][1], functionsReturn2[this.key][2]);
            functionBlock.setFieldValue(functionsReturn2[this.key][3], functionsReturn2[this.key][4]);
        } else if (this.key === "text_prompt"){
            functionBlock = this._initBlock(this.distributor.functionsReturn[this.key][0]);
            functionBlock.setFieldValue("TEXT", "TYPE");
            let stringMessage = this.node.lastChild.child(1).lastChild.text;
            stringMessage = stringMessage.substring(1, stringMessage.length - 1);
            functionBlock.setFieldValue(stringMessage, "TEXT");
            return functionBlock;
        } else if (this.key === "tonumber"){
            functionBlock = this._initBlock("text_prompt");
            functionBlock.setFieldValue("NUMBER", "TYPE");
            let stringMessage = this.node.lastChild.child(1).firstChild.lastChild.child(1).firstChild.text;
            stringMessage = stringMessage.substring(1, stringMessage.length - 1);
            functionBlock.setFieldValue(stringMessage, "TEXT");
            return functionBlock;
        } else if (["math.sin", "math.cos", "math.tan"].includes(this.key)){
            functionBlock = this._initBlock(functionsReturn2[this.key][0]);
            functionBlock.setFieldValue(functionsReturn2[this.key][1], functionsReturn2[this.key][2]);
            let connection = functionBlock.getInput("NUM").connection;
            let number = this.node.lastChild.child(1).firstChild.lastChild.child(1).firstChild;
            connection.connect(this.distributor.getNodeObject(number).createBlock().outputConnection);
            return functionBlock;
        }
        else {
            functionBlock = this._initBlock(functionsReturn2[this.key][0]);
            functionBlock.setFieldValue(functionsReturn2[this.key][1], functionsReturn2[this.key][2]);
        }
        this._fillOnlyInputParameters(functionBlock);
        return functionBlock;
    }


    /**
     * Registers the FunctionCallNode class with the distributor for "call" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("call", FunctionCallNode);
    }
}

module.exports = { FunctionCallNode };
