const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

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

    socket.emit('greetingAdmin', generateMessage('admin','Welcome to the chat app'));

    socket.broadcast.emit('newUserJoined',generateMessage('admin','A new user has joined'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage',newMessage);
        io.emit('newMessage', generateMessage(newMessage.from,newMessage.text));        
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (location, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Akshay', location.latitude, location.longitude));
        callback('This is so cool!');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected.');
    });
});


server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
