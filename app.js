const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve the file
app.use(express.static("public"));

// Handle socket connection
io.on("connection", (socket) => {
    console.log("user connected!");

    // Brodcast message to all client
    socket.on("chat message", ({ username, message }) => {
        io.emit("chat message", { username, message });
    });

    socket.on("disconnect", ()=>{
        console.log("user disconnected!");
    });
})

// Start the server;
const PORT = 3000;
server.listen(PORT, () => {
    console.log('server is running!');
});