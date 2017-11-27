var socket = io();

socket.on('connect', function ()  {
    console.log('Connected to server');
    // socket.emit('createMessage', {
    //     to : 'abc@example.com',
    //     text : 'Hey there! I am using sockets too!'
    // });
}); 

socket.on('disconnect', function () {
    console.log('Disconnected');
});

socket.on('newMessage', function(message) {
    console.log('New message',message);
});

