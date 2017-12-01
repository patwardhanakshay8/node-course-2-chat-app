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
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} : `);
    a.attr('href', message.location_url);
    li.append(a);
    jQuery('#messages').append(li);
})

socket.on('greetingAdmin', function(message) {
    console.log('Greeting', message);
});

socket.on('newUserJoined', function(message) {
    console.log('Notification', message);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from : 'Akshay',
        text : jQuery('[name=message]').val()
    }, function (data) {
        console.log(data);
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported.');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }, function(data) {
            console.log(data)
        })
    }, function() {
        alert('Unable to fetch location.');
    });
});
