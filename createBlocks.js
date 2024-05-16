/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Register all subclasses automatically
 * Called in the beginning of the block creation process
 * @param {Distributor} distributor Object responsible for calling/creating correct Object to deal with node.
 */
function registerAllSubclasses(distributor) {
    ShebangNode.register(distributor);
    VariableAssignmentNode.register(distributor);
    LocalVariableNode.register(distributor);
    BreakNode.register(distributor);
    CommentNode.register(distributor);
    EmptyLineNode.register(distributor);
    IdentifierNode.register(distributor);
    IfElseIfElseNode.register(distributor);
    ForNumericNode.register(distributor);
    ForGenericNode.register(distributor);
    WhileNode.register(distributor);
    FunctionCallNode.register(distributor);
    FunctionDefinitionNode.register(distributor);
    RepeatNode.register(distributor);
    ReturnNode.register(distributor);
    NumberNode.register(distributor);
    VariableNode.register(distributor);
    UnaryExpressionNode.register(distributor);
    StringNode.register(distributor);
    BooleanNode.register(distributor);
    NilNode.register(distributor);
    TableNode.register(distributor);
    BinaryExpressionNode.register(distributor);
    ParenthesizedExpressionNode.register(distributor);
    // Repeat for other subclasses...
}

const Blockly = require('blockly');
const BlocklyLua = require('blockly/lua');
const { JSDOM } = require('jsdom');
const Distributor = require('./Classes/Distributor/Distributor');
const { createBlocklyCode, findErrors, reset_workspace } = require("./helpFunctions");
const {ShebangNode} = require("./Classes/MyNodes/ShebangNode");
const {CommentNode} = require("./Classes/MyNodes/CommentNode");
const {NilNode} = require("./Classes/MyNodes/NilNode");
const {VariableAssignmentNode} = require("./Classes/MyNodes/VariableAssignmentNode");
const {VariableNode} = require("./Classes/MyNodes/VariableNode");
const {BinaryExpressionNode} = require("./Classes/MyNodes/BinaryExpressionNode");
const {BooleanNode} = require("./Classes/MyNodes/BooleanNode");
const {EmptyLineNode} = require("./Classes/MyNodes/EmptyLineNode");
const {ForGenericNode} = require("./Classes/MyNodes/ForGenericNode");
const {ForNumericNode} = require("./Classes/MyNodes/ForNumericNode");
const {TableNode} = require("./Classes/MyNodes/TableNode");
const {NumberNode} = require("./Classes/MyNodes/NumberNode");
const {FunctionCallNode} = require("./Classes/MyNodes/FunctionCallNode");
const {FunctionDefinitionNode} = require("./Classes/MyNodes/FunctionDefinitionNode");
const {IdentifierNode} = require("./Classes/MyNodes/IdentifierNode");
const {IfElseIfElseNode} = require("./Classes/MyNodes/IfElseIfElseNode");
const {LocalVariableNode} = require("./Classes/MyNodes/LocalVariableNode");
const {ParenthesizedExpressionNode} = require("./Classes/MyNodes/ParenthesizedExpressionNode");
const {RepeatNode} = require("./Classes/MyNodes/RepeatNode");
const {ReturnNode} = require("./Classes/MyNodes/ReturnNode");
const {StringNode} = require("./Classes/MyNodes/StringNode");
const {UnaryExpressionNode} = require("./Classes/MyNodes/UnaryExpressionNode");
const {WhileNode} = require("./Classes/MyNodes/WhileNode");
const registerBlocks = require("./registerBlocks");
const {BreakNode} = require("./Classes/MyNodes/BreakNode");

/**
 * Function to create Blockly blocks based on the provided code (and workspace).
 *
 * This function initializes the Blockly workspace and sets up event listeners for generating code from blocks,
 * initializing the parser environment, testing, and utilizing the API for parsing code with Tree-Sitter.
 *
 * @param {Blockly.WorkspaceSvg} workspace - Most probably workspace will be needed if we use API.
 * @param rootNode - rootNode of AST to create blocks from
 */
function createBlocks(workspace, rootNode){
// function createBlockly(rootNode){
//     const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><main><div id="blocklyDiv" style="height: 1000px; width: 800px; float: left;"></div></main></body></html>');
//     window = dom.window
//     document = dom.window.document
    // workspace = new Blockly.Workspace();
    // reset_workspace(workspace);
    registerBlocks();
    // let workspace = Blockly.inject(window);
    // , {
    //     media: BlocklyMedia,
    //     toolbox: toolboxOptions
    // });

    // console.debug("rootNode.toString():\n", tree.rootNode.toString());
    // rootNode.children.forEach((child) => {
    //     console.log(child.toString());
    //     console.log("=====================\n");
    // })
    const distributor = new Distributor();
    registerAllSubclasses(distributor);
    if(rootNode.children) {
        try {
            console.log("========================");
            let newWorkspace = createBlocklyCode(workspace, rootNode, distributor, undefined, null);
            workspace.getAllBlocks().forEach((block) => {
                console.log(block.getRelativeToSurfaceXY());
                console.log(block.toDevString());
            });
            return newWorkspace;
            // let state = Blockly.serialization.workspaces.save(finalWorkspace);
        } catch (error) {
            console.error(error);
            findErrors(rootNode).forEach(function (missingNode) {
                console.error("Missing in: ", missingNode.toString(), "\n", missingNode.text, "\n");
            });
            // Blockly.serialization.workspaces.load(state, workspace);
        }
    }
}

module.exports = { createBlocks }
