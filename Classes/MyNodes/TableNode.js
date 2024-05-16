/**
 * Author: René Rešetár
 * Email: xreset00@stud.fit.vutbr.cz
 *
 * This class is called when node handler receives node of type table.
 *
 * Node looks like this (node.toString):
 * (table (field_list (field value: (variable name: (identifier))))) - with field_list -> not empty
 * (table) -> empty
 *
 * This node cannot have and has no children.
 *
 * Responsible creating blocks of type:
 * - lists_create_with - {1, "s", 5.6, foo(), a[1], {}, {5, 6}, ...}
 * - lists_create_empty - {}
 */

const MyNode = require('./MyNode');
const Blockly = require('blockly');

class TableNode extends MyNode {

    /**
     * Creates a Blockly block representing a Lua table.
     * If the table contains fields, it creates a 'lists_create_with' block, otherwise, it creates a 'lists_create_empty' block.
     * @returns {Blockly.Block} The block representing the table.
     */
    createBlock() {
        let tableBlock;
        let contentsHandler;
        let connection;

        if(this.node.child(1).type === "field_list"){
            tableBlock = this._initBlock('lists_create_with');

            // Collecting values of list from the table node
            let values = this._collectValuesOfList(this.node.child(1));

            const add = values.children.length;
            // Create matching mutation with the number of elements collected
            const mutationXml = Blockly.utils.xml.textToDom(
                '<mutation items="' + add + '"></mutation>'
            );
            // Apply mutation
            tableBlock.domToMutation(mutationXml);

            // Connecting each field value to the table block
            for (let i = 0; i < values.children.length; i++){
                contentsHandler = this.distributor.getNodeObject(this.workspace, values.children[i], null);
                connection = tableBlock.getInput(`ADD${i}`).connection;
                connection.connect(contentsHandler.createBlock().outputConnection);
            }
        }
        else {
            // Creating an empty table with the lists_create_empty block
            tableBlock = this._initBlock('lists_create_empty');
        }
        return tableBlock;
    }


    /**
     * Collects the field values from a table node.
     * @param {Node} node - The node representing the table.
     * @returns {Object} An object containing the collected field values.
     */
    _collectValuesOfList(node){
        let tempBlock = {"children": []};
        let next = node.firstChild;
        while(next){
            if(next.text !== ',' && next.type !== '(' && node.type !== ')'){
                tempBlock.children.push(next.firstChild);
            }
            next = next.nextSibling;
        }
        return tempBlock;
    }


    /**
     * Registers the TableNode subclass with the distributor.
     * @param {Distributor} distributor - The distributor to register with.
     */
    static register(distributor) {
        distributor.registerSubclass("table", TableNode);
    }

}

module.exports = { TableNode };



