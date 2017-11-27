const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    
    // socket.emit('newMessage',{
    //     from  : 'abc@example.com',
    //     text : 'Hey there! I am using sockets',
    //     createdAt : new Date()
    // });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage',newMessage);
        io.emit('newMessage', {
            from : newMessage.from,
            text : newMessage.text,
            createdAt : new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected.');
    });
});


server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
