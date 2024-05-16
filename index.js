/**
 * The API server we tried to use to deal with Tree-Sitter compatibility issues
 */


const express = require('express');
const Parser = require('web-tree-sitter');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { createBlocks } = require('./createBlocks');
const Blockly = require('blockly');
// few of the serialization libraries we tried
var msgpack = require("msgpack-lite");
var s = require("serialijse");
const CircularJSON = require('circular-json');
const serialize = require('serialize-to-js')
// var serialize = require('serialize-javascript');

const app = express();
const port = 3000;
let Lang;
let parser;

async function initializeParser(code) {
   try {
       await Parser.init();
       parser = new Parser();
       Lang = await Parser.Language.load('./tree-sitter-lua-final.wasm');
       parser.setLanguage(Lang);
       // return parser.parse(code).rootNode;
       return parser.parse(code);
   } catch (error) {
       console.error('Error initializing Tree-sitter:', error);
       throw error;
   } finally {
       await parser.delete();
   }
}

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// API endpoint for parsing code
app.post('/parse', (req, res) => {
    try {
        const code = req.body.code;
        console.log(code);
        // const state = req.body.state;
        // console.log(state);
        initializeParser(code)
			.then(tree => {
                /**
                 * Here should be either serialization method called on tree,
                 * or correct Blockly Workspace with informationa bout blocks position and
                 * connections created.
                 * One of those should be sent to the client side and it would be able to
                 * deal with both of the options.
                 */
                // const serializedTree = serializeTree(tree);

                // This would be called in Love-block-web application if we managed to integrate the application
                // And this updated workspace would be used to update current state
                // const workspace = createBlocks(tree);
                parser.delete();
                res.json(JSON.stringify(tree));
			})
			.catch(error => {
				console.error('Error:', error);
			}).finally(() => {
                console.log("deleting parser");
				parser.delete();
                axios.post('http://localhost:3001/parsed', {})
			});

    } catch (error) {
        console.error('Error parsing code:', error);
        res.status(400).send('Error parsing code.');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


/*
 * Unsuccessful attempt to serialize the tree with all needed information, but also so we could send it back to the client
 * Cyclic dependencies wont allow us to send and without them the tree is useless
 */
function serializeNode(node, visitedNodes) {

    if (!node) {
        return null; // Ak sme už navštívili tento uzol, vrátime null
    }

    if(!visitedNodes.has(node.id)){
        const serializedNode = {
            id: node.id,
            childCount: node.childCount,
            children: [],
            hasChanges: node.hasChanges,
            hasError: node.hasError,
            isError: node.isError,
            isExtra: node.isExtra,
            isMissing: node.isMissing,
            text: node.text,
            type: node.type,
        };

        visitedNodes.set(node.id, serializedNode);

        for (const child of node.children) {
            const serializedChild = serializeNode(child, visitedNodes); // Ako rodiča uvedieme aktuálny uzol
            console.log(serializedChild.toString());
            if (serializedChild !== null) {
                visitedNodes.set(child.id, serializedChild);
                serializedNode.children.push(serializedChild);
            }
        }
        if (node.firstChild){
            if (!visitedNodes.has(node.firstChild.id)){
                serializedNode.firstChild = serializeNode(node.firstChild, visitedNodes);
                visitedNodes.set(node.firstChild.id, node.firstChild);
            } else {
                serializedNode.firstChild = visitedNodes.get(node.firstChild.id);
            }
        } else {
            serializedNode.firstChild = null;
        }
        if (node.lastChild){
            if (!visitedNodes.has(node.lastChild.id)){
                serializedNode.lastChild = serializeNode(node.lastChild, visitedNodes);
                visitedNodes.set(node.lastChild.id, node.lastChild);
            } else {
                serializedNode.lastChild = visitedNodes.get(node.lastChild.id);
            }
        } else {
            serializedNode.lastChild = null;
        }
        if (node.parent){
            if (!visitedNodes.has(node.parent.id)){
                serializedNode.parent = serializeNode(node.parent, visitedNodes);
                visitedNodes.set(node.parent.id, node.parent);
            } else {
                serializedNode.parent = visitedNodes.get(node.parent.id);
            }
        } else {
            serializedNode.parent = null;
        }
        if (node.nextSibling){
            if (!visitedNodes.has(node.nextSibling.id)){
                serializedNode.nextSibling = serializeNode(node.nextSibling, visitedNodes);
                visitedNodes.set(node.nextSibling.id, node.nextSibling);
            } else {
                serializedNode.nextSibling = visitedNodes.get(node.nextSibling.id);
            }
        } else {
            serializedNode.nextSibling = null;
        }
        if (node.previousSibling){
            if (!visitedNodes.has(node.previousSibling.id)){
                serializedNode.previousSibling = serializeNode(node.previousSibling, visitedNodes);
                visitedNodes.set(node.previousSibling.id, node.previousSibling);
            } else {
                serializedNode.previousSibling = visitedNodes.get(node.previousSibling.id);
            }
        } else {
            serializedNode.previousSibling = null;
        }
        return serializedNode;
    } else {
        return visitedNodes.get(node.id);
    }
}


function serializeTree(tree) {
    let visitedNodes = new Map();
    const rootNode = tree.rootNode;
    return serializeNode(rootNode, visitedNodes);
}


