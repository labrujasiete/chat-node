let socket = io();

socket.on('connect', function(){
    console.log("user conected");
});

socket.on('disconnect', function(){
    console.log("user disconected")
});

socket.on('newMessage', function(message){
    console.log("newMessage", message)
});