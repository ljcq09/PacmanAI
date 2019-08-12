const http = require('http');
const express = require("express");

const socketio = require('socket.io');
const app = express();

var port = process.env.PORT || 1111

const clientPath = `${__dirname}`;
console.log(`Serving static from ${clientPath}`);
app.use(express.static(clientPath));

app.get("/", function(req, res) {
    res.render(clientPath + 'index.html');
});
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
    sock.emit('message', 'Hi, you are connected');
    console.log('connection established ');
});

server.on('error', (err) => {
    console.error('server error', err);
});

server.listen(port, () => {
    console.log("Server is listening on localhost:" + port);
});

/* const port = 3000;
const http = require("http").createServer();

const io = require("socket.io")(http);


io.on("connection", (socket) => {

    socket.emit("welcome", "Hello There and Welcome to the Sockey.io Server");

    console.log("New Client is COnnected!");

});


http.listen(port, () => {
    console.log("Server is listening on localhost:" + port);
});*/