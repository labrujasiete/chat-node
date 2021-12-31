const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message')


const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit("newMessage", generateMessage('admin', 'welcome to the chat app'));

    socket.broadcast.emit("newMessage", generateMessage('admin', 'New user joined'));

    
    socket.on('createMessage', (message, callback)=>{
        //console.log("createMessage", message);
        
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback("hello world - ");
    });
    
    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.lat, coords.lng))
    })

    socket.on('disconnect', ()=>{
        console.log("user was disconected")
    });
})







server.listen(port, ()=>{
    console.log(`server running port ${port}`);
});




console.log(publicPath);