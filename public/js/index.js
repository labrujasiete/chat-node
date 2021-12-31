let socket = io();

socket.on('connect', function(){
    console.log("user conected");
});

socket.on('disconnect', function(){
    console.log("user disconected")
});

socket.on('newMessage', function(message){
    console.log("newMessage", message);
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;
    document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage', function(message){
    console.log("newLocationMessage", message);
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    a.innerHTML = 'My current location';

    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});

socket.emit('createMessage', {
    from: 'Mike',
    text: 'what is up'
}, function(message){
    console.log("server got it", message);
})

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