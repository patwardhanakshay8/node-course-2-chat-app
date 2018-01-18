const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } =  require('./utils/validation');
const { Users } = require('./utils/users');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');
    
    // socket.emit('newMessage',{
    //     from  : 'abc@example.com',
    //     text : 'Hey there! I am using sockets',
    //     createdAt : new Date()
    // });

    socket.on('join', (params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('greetingAdmin', generateMessage('admin','Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newUserJoined',generateMessage('admin',`${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage',newMessage);
        io.emit('newMessage', generateMessage(newMessage.from,newMessage.text));        
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (location, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Akshay', location.latitude, location.longitude));
        callback();
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updatedUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left.`));
        }
        console.log('Disconnected.');
    });
});


server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
