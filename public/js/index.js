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
});