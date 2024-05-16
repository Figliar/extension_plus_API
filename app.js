/**
 * Simple app we created so the Tree-Sitter parser was always correctly initiated
 * Starts the server in index.js and receives requests for his restarts
 */

const { fork } = require('child_process');
const express = require('express');
const app = express();

let childProcess;

// Handle POST requests from the child process
app.post('/parsed', (req, res) => {
    console.log('Parent process received message from child process:', req.body);

    // Restart the child process
    restartChildProcess();

    res.send('Message received by parent process.');
});

// Function to start or restart the child process
function startChildProcess() {
    childProcess = fork('index.js');
    console.log('Child process started.');
    childProcess.on('message', (message) => {
        console.log(`Message from child process: ${message}`);
        // Child process is ready to be restarted
        restartChildProcess();
    });
}

// Function to restart the child process
function restartChildProcess() {
    console.log('Restarting child process...');
    childProcess.kill();
    startChildProcess();
}

// Start or restart the child process when the parent process starts
startChildProcess();

// Start listening for requests
const port = 3001;
app.listen(port, () => {
    console.log(`Main application listening at http://localhost:${port}`);
});
