/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type if_statement.
 * It always creates block of controls_if type and mutates it depending on the number of elseif/else clauses.
 * Node looks like this (node.toString):
 * (if_statement condition: (true))
 *
 * Children:
 * ("if"),(true),("then"),(block),("end")
 * ("if"),(condition),("then"),(block),(elseif),(condition),("then"),(block), ..... ,(else),(block),("end")
 * Responsible for creating blocks of type:
 * - controls_if - if true then a = 1 end, if false then ... elseif a>1 then else end...
 */

const MyNode = require('./MyNode');
const Blockly = require('blockly');
const {createBlocklyCode} = require("../../helpFunctions");

class IfElseIfElseNode extends MyNode {

    /**
     * Creates a Blockly block representing an if statement.
     * @returns {Blockly.Block} The block representing the if statement.
     */
    createBlock() {
        let ifBlock = this._initBlock('controls_if');
        let elseNode = this._returnNodeOfName("else_clause");
        let ifNode = this._returnNodeOfName("block");
        let includedComments;

        // Count the number of elseif and else clauses
        const else_counts = this._countElse();
        // Create mutation XML for elseif and else clauses
        const mutationXml = Blockly.utils.xml.textToDom(
          '<mutation elseif="' + else_counts[0] + '" else="' + else_counts[1]  + '"></mutation>'
        );
        // Apply mutation to the block
        ifBlock.domToMutation(mutationXml);

        // Connect condition block for first IF
        let conditionNodeHandler = this.distributor.getNodeObject(this.workspace, this.node.child(1), null);
        let connection = ifBlock.getInput("IF0").connection;
        connection.connect(conditionNodeHandler.createBlock().outputConnection);

        // Generate code for elseif and else clauses
        if(ifNode !== null) {
            this._appendComments(ifNode);
            createBlocklyCode(this.workspace, ifNode, this.distributor, "DO0", ifBlock);
            // createBlocklyCode(this._appendComments(ifNode), this.distributor, "DO0", ifBlock);
        }

        let next = this.node.firstChild;
        let count = 1;
        if(this._isPresent("elseif_clause")){
            while (next) {
                if(next.type) {
                    if (next.type === 'elseif_clause') {
                        // Connect condition block for elseif clause
                        conditionNodeHandler = this.distributor.getNodeObject(this.workspace, next.child(1), null);
                        connection = ifBlock.getInput(`IF${count}`).connection;
                        connection.connect(conditionNodeHandler.createBlock().outputConnection);

                        // Generate code for the 'then' clause of elseif
                        includedComments = this._includeComments(next);
                        if (next.nextSibling.type === 'comment'){
                            includedComments.children.push(next.nextSibling);
                        }
                        createBlocklyCode(this.workspace, includedComments, this.distributor, `DO${count}`, ifBlock);
                        count = count + 1;
                    }
                    else if (next.type === 'else_clause') {
                        // Generate code for the 'else' clause
                        includedComments = this._includeComments(next);
                        if (next.nextSibling.type === 'comment'){
                            includedComments.children.push(next.nextSibling);
                        }
                        createBlocklyCode(this.workspace, includedComments, this.distributor, "ELSE", ifBlock);
                    }
                }
                next = next.nextSibling;
            }
        }
        else if(elseNode !== null){
            // Generate code for the 'else' clause if there's no elseif
            includedComments = this._includeComments(elseNode);
            if (elseNode.nextSibling.type === 'comment'){
                includedComments.children.push(elseNode.nextSibling);
            }
            createBlocklyCode(this.workspace, includedComments, this.distributor, "ELSE", ifBlock);
        }
        return ifBlock;
    }


    /**
     * Counts the number of 'elseif' and 'else' clauses in the node.
     * @returns {Array} An array containing the count of 'elseif' clauses at index 0 and 'else' clauses at index 1.
     */
    _countElse(){
        let count = [0,0];
        let next = this.node.firstChild;
        while(next){
            if(next.type === 'elseif_clause'){
                count[0] = count[0] + 1;
            }
            if(next.type === 'else_clause'){
                count[1] = count[1] + 1;
            }
            next = next.nextSibling;
        }
        return count;
    }


    /**
     * Check if a specific type of node is present among the children of the current node.
     * @param {string} needle - The type of node to search for.
     * @returns {boolean} True if the node type is present, false otherwise.
     */
    _isPresent(needle){
        for (const child of this.node.children){
            if (child.type === needle){
                return true;
            }
        }
        return false;
    }


    /**
     * Append comments from previous and next siblings to the current node's children array.
     * @param {Node} node - The current node to which comments will be appended.
     */
    _appendComments(node){
        let prev = node.previousSibling;
        while (prev.type === 'comment'){
            node.children.unshift(node.previousSibling);
            prev = prev.previousSibling;
        }
        if (node.nextSibling.type === 'comment'){
            node.children.push(node.nextSibling);
        }
    }


    /**
     * Registers the IfElseIfElseNode subclass with the distributor.
     * @param {Distributor} distributor The distributor to register with.
     */
	  static register(distributor) {
        distributor.registerSubclass("if_statement", IfElseIfElseNode);
    }
}

module.exports = { IfElseIfElseNode };
