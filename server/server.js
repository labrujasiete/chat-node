const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit("newMessage", {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit("newMessage", {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message)=>{
        //console.log("createMessage", message);
        
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', ()=>{
        console.log("user was disconected")
    });
})







server.listen(port, ()=>{
    console.log(`server running port ${port}`);
});




console.log(publicPath);