const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    //Single connection
    // socket.emit('newMessage', {
    //     from: 'Rohan',
    //     text: 'see you then',
    //     createdAt: 1231234
    // });

    // socket.emit('newEmail', {
    //      from: 'alok12.ranjan@gmail.com',
    //      text: 'Hey, What is going on',
    //      createAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});