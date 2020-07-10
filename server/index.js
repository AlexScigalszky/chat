var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var BL = require('./server');

app.get('/read', BL.read);
app.post('/write', BL.write);

io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    socket.on("message", (msg) => {
        console.info('.');
        BL.writeMessage(msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on("disconnect", () => {
        console.info(`Client gone [id=${socket.id}]`);
    });
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});