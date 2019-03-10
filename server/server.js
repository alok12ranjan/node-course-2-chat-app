const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');

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


     //Socket.emit from Admin text Welcome to the chat App
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
    //  socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the Chat App',
    //     createdAt: new Date().getTime()
    // });

    //Socket.broadcast.emit from Admin text New User Joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New User has Joined',
    //     createdAt: new Date().getTime()
    // });

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
        
        // Sent to every body - All client across to browsers
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});