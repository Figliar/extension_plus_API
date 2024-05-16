# extension_plus_API
Unsuccessful attempt to create API which would allow a use of my extension in Love-blocks-web application
(https://github.com/meda10/Love-blocks-web)

## Installation
All modules needed should a part of the repositary, but run ```npm install``` in main directory if encountering problems.

## Main parts
index.js contains a simple API server where we first tried to shift parsing with Tree-Sitter and creating blocks for Blockly.
Then we tried to shift only the parsing part. Both unsuccessfully and now the server only listens on ```http:localhost:3000``` and responds to post requests ```/parse```.
It is ran with app.js to serve a consistently initiated Tree-Sitter parser.
```bash
node app.js
```

Other scripts and created Classes in 'Classes' directory are rewritten to be used in Lov-blocks-web by calling:
```javascript
createBlocks(source_code)
```

This repository only serves to showcase we were prepared to integrate, but did not managed because of many different issues we encountered.
