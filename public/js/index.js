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
    var formattedTime = moment(message.createdAt).format('h:mm a');    
    var template = jQuery('#messageTemplate').html();
    var html = Mustache.render(template, {
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#locationMessageTemplate').html();
    var html = Mustache.render(template, {
        locationURL : message.location_url,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery('#messages').append(html);
})

socket.on('greetingAdmin', function(message) {
    console.log('Greeting', message);
});

socket.on('newUserJoined', function(message) {
    console.log('Notification', message);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from : 'Akshay',
        text : messageTextbox.val()
    }, function (data) {
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported.');
    }

    locationButton.attr('disabled','disabled').text('Sending Location....');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }, function() {
            
        })
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});
