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

    socket.on('disconnect', ()=>{
        console.log("user was disconected")
    });
})







server.listen(port, ()=>{
    console.log(`server running port ${port}`);
});




console.log(publicPath);