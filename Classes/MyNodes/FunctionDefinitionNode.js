/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type function_definition_statement.
 *
 * Node looks like this (node.toString):
 * (call function: (variable name: (identifier)) arguments: (argument_list (expression_list (number))))
 *
 * Responsible for creating blocks of type:
 * - procedures_defnoreturn
 * - procedures_defreturn
 * - All types in functionsOnlyDef list (callback functions of LOVE2D)
 */

const MyNode = require('./MyNode');
const {createBlocklyCode, getParameters} = require("../../helpFunctions");

class FunctionDefinitionNode extends MyNode {

    /**
     * Creates a Blockly block representing a function definition.
     * @returns {Blockly.Block} The created Blockly block.
     */
    createBlock() {
        let tempBlock;
        this.key = this.node.child(1).text.trim();

        // Check if the function definition should be ignored
        if (this.distributor.ignore.includes(this.key)){
            // Return the last block if the function should be ignored
            return this.lastBlock;
        }
        else if (Object.keys(this.distributor.functionsOnlyDef).includes(this.key.trim())) {
            tempBlock = this._createKnownFunctionDefinitionBlock();
        } else {
            tempBlock = this._createUnknownFunctionDefinitionBlock();
        }
        return tempBlock;
    }


    /**
     * Creates a Blockly block for a known function definition.
     * @returns {Blockly.Block} The created Blockly block.
     */
    _createKnownFunctionDefinitionBlock() {
        let functionBlock =
            this._initBlock(this.distributor.functionsOnlyDef[this.key]);

        // Get parameters and field variable names
        let params = getParameters(this.node.child(3));
        let names = this._getFieldVariableNames(functionBlock);

        // Fill in parameters for the function block
        if (params !== null) {
            for (let i = 0; i < params.length; i++) {
                this._createVariableInWorkspace(params[i]);
                functionBlock.setFieldValue(this.workspace.getVariable(params[i].text).id_, names[i].name);
            }
        }

        // Include comments and create Blockly code for the function body
        let includedComments = this._includeComments(this.node);
        createBlocklyCode(this.workspace, includedComments, this.distributor, "input", functionBlock);
        return functionBlock;
    }


    /**
     * Creates a Blockly block for a new (unknown) function definition.
     * @returns {Blockly.Block} The created Blockly block.
     */
    _createUnknownFunctionDefinitionBlock() {
        let functionBlock;
        // Find function body node and check if there's a return statement in it
        let functionBodyNode = this._findFunctionBody(this.node);
        let isReturnNode = this._findReturnStatement(functionBodyNode);

        // Check if the function has a return statement
        let blockType = isReturnNode !== null ? "procedures_defreturn" : "procedures_defnoreturn";
        functionBlock = this._initBlock(blockType);

        // Set statement connections and field values
        functionBlock.setNextStatement(false);
        functionBlock.setPreviousStatement(false);
        functionBlock.setFieldValue(this.key, "NAME");

        // Get parameters and update custom functions
        let params = getParameters(this.node.child(3));
        if(this.node.child(3).type === 'parameter_list') {
            let args = ""
            for (const param of params) {
                args = args + '<arg name="' + param.text + '"></arg>';
                this._createVariableInWorkspace(param);
            }
            const mutationXml = Blockly.utils.xml.textToDom(`
                <mutation>` + args + `</mutation>
            `);
            // Apply the mutation to the block
            functionBlock.domToMutation(mutationXml);
            // Save mutation to apply when you call this function
            this.distributor.customFunctions[this.key] = {"params": params, "mutation": mutationXml, "return": isReturnNode};
        }
        else{
            // Save information that there is no mutation to apply when you call this function
            this.distributor.customFunctions[this.key] = {"params": null, "mutation": null, "return": isReturnNode};
        }

        // Include comments and create Blockly code for the function body
        if (functionBodyNode !== null) {
            let includedComments = this._includeComments(this.node);
            createBlocklyCode(this.workspace, includedComments, this.distributor, "STACK", functionBlock);
        }

        if (isReturnNode !== null) {
            if (isReturnNode.childCount > 1) {
                let returnValueNodeHandler = this.distributor.getNodeObject(this.workspace, isReturnNode.lastChild.firstChild, null);
                let connection = functionBlock.getInput("RETURN").connection;
                connection.connect(returnValueNodeHandler.createBlock().outputConnection);
            }
        }
        return functionBlock;
    }


    /**
     * * Finds the return statement node in the given node.
     * Only looks in first generation, so there must be return statement provided there.
     * for function definition to be generated as with return value
     * @param {Node} node The node to search for the function body.
     * @returns {Node|null} The function body node if found, otherwise null.
     */
    _findFunctionBody(node){
        let next = node.firstChild;
        while(next.type !== "end"){
            if (next.type === 'block') {
                return next;
            }
            next = next.nextSibling;
        }
        return null;
    }


    /**
     * Finds the return statement node in the given node.
     * @param {Node|null} node The node to search for the return statement.
     * @returns {Node|null} The return statement node if found, otherwise null.
     */
    _findReturnStatement(node) {
         // Return null if there
        if (node === null){
            return null;
        }

        // Iterate through the children of the node
        for (let child of node.children) {
            if (child.type === 'return_statement') {
                return child; // Return the result if a return statement is found in the subtree
            }
        }
        return null; // Return null if no return statement is found
    }


    /**
     * Retrieves the variable names from the fields of the given block.
     * @param {Blockly.Block} block The block to retrieve variable names from.
     * @returns {string[]} An array of variable names.
     */
    _getFieldVariableNames(block) {
        const variableNames = []; // Initialize array to store variable names
        block.inputList.forEach(input => { // Iterate through the inputs of the block
            const field = input.fieldRow.find(field => field instanceof Blockly.FieldVariable);
            if (field) {
                // Push the variable name to the array
                variableNames.push(field.getVariable());
            }
        });
        return variableNames;
    }


    /**
     * Registers the FunctionDefinitionNode class with the distributor for "function_definition_statement" node type.
     * @param {Distributor} distributor The distributor instance to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("function_definition_statement", FunctionDefinitionNode);
    }
}

module.exports = { FunctionDefinitionNode };
