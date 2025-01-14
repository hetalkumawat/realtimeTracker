const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// Create the HTTP server
const server = http.createServer(app);

// Integrate Socket.IO with the server
const io = socketio(server);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO connection handler
io.on('connection', function(socket) {
    console.log('Client connected');
    socket.on('disconnect', function() {
        console.log('Client disconnected');
    });
});

// Handle the root route
app.get('/', function(req, res) {
    res.render('index'); // Make sure there's a file named "index.ejs" in the "views" directory
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
