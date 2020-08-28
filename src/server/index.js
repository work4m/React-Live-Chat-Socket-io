const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("user connected");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3001, function () {
    console.log("listerning on * : 3001");
});