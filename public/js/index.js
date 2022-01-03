//let Mustache = require('mustache');
let socket = io();


socket.on('connect', function(){
    console.log("user conected");
});

socket.on('disconnect', function(){
    console.log("user disconected")
});

socket.on('newMessage', function(message){
    /*
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template);

    document.querySelector('#messages').append(html);
    */
    
    const formattedTime = moment(message.createdAt).format('LT');
    console.log("newMessage", message);
    let li = document.createElement('li');
    li.innerText = `${message.from} ${formattedTime}: ${message.text}`;
    
    document.querySelector('#messages').appendChild(li);
    
});

socket.on('newLocationMessage', function(message){
    const formattedTime = moment(message.createdAt).format('LT');
    console.log("newLocationMessage", message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.innerText = `${message.from} ${formattedTime}:`;
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    a.innerText = 'My current location';

    li.appendChild(a);
    document.querySelector('#messages').appendChild(li);
});



document.querySelector('#submit-btn').addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function(){

    })
})

document.querySelector('#send-location').addEventListener('click', function(e){
    if(!navigator.geolocation){
        return alert("geo-location is not supported")
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function () {
        alert('unable to fetch location')
    })
})