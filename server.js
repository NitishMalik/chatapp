const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
const publicPath = path.join(__dirname, '/public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log("new user connected !!!");

    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to chat app'
    } );

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    })


    socket.on('createMessage', (message) => {
        //Emits to every connection        
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt : new Date().getTime()
        // });

        socket.broadcast.emit('newMessage', {
            from: message.from,
                text: message.text,
                createdAt : new Date().getTime()
        })
    });

    socket.on('disconnect', ()=>{
        console.log("user was  disconnected !!!");
    })
});

server.listen(port, ()=> {
    console.log(`server is running on Port ${port}`);
})

