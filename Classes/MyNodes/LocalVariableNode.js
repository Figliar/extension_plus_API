/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type local_variable_declaration.
 * Node looks like this (node.toString):
 * (variable_list (variable name: (identifier)))
 *
 * Responsible for creating blocks of type:
 * - local_variable - local a = 1
 */

const MyNode = require('./MyNode');
const Blockly = require('blockly');

class LocalVariableNode extends MyNode {

    /**
     * Creates a Blockly block representing a local variable declaration.
     * @returns {Blockly.Block} The block representing the local variable declaration.
     */
    createBlock() {
        this._createLocalVariable();
        let tempBlock = this._initBlock('local_variable');
        const setter = tempBlock.type === 'variables_set' ? 'VALUE' : 'TO';
        let assignNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.lastChild.firstChild, null);
        let connection = tempBlock.getInput(setter).connection;
        connection.connect(assignNodeHandler.createBlock().outputConnection);
        return tempBlock;
    }


    /**
     * Creates a local variable in the Blockly workspace.
     * If the variable already exists, it doesn't create a new one.
     */
    _createLocalVariable(){
        let variables = this.workspace.getAllVariables();
        let variableName = this.node.child(1).text.trim();
        if(!variables.includes(this.workspace.getVariable(variableName))){
            this.workspace.createVariable(variableName);
        }
        Blockly.Blocks['local_variable'] = {
            init: function () {
                this.appendValueInput("TO")
                    .setCheck(null)
                    .appendField("local")
                    .appendField(new Blockly.FieldVariable(variableName), "VAR")
                    .appendField("to");
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setColour(335);
            }
        };
    }


    /**
     * Registers the LocalVariableNode subclass with the distributor.
     * @param {Distributor} distributor The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("local_variable_declaration", LocalVariableNode);
    }
}

module.exports = { LocalVariableNode };
