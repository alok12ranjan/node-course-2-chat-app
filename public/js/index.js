var socket = io();
socket.on('connect', () => {
    console.log('Connected to Server');

    // socket.emit('createEmail', {
    //     to: 'alok22.ranjan@gmail.com',
    //     text: 'Hey, This is Alok'
    // });

    //Single Connection
    // socket.emit('createMessage', {
    //     from: 'Alok',
    //     text: 'Yup, thats work for me'
    // });
});

socket.on('disconnect', () => {
    console.log('Disconnected from Server');
});

socket.on('newEmail', function (email) {
    console.log('New Email', email);
});

socket.on('newMessage', function (message) {
    console.log('newMessage :', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got it.', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        console.log('Wow, it works..');
    });
});