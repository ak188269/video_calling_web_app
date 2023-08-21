const express = require('express');
require("dotenv").config();
const socket = require('socket.io');
const {PORT} = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(require("cors")({origin:"*"}))

app.get('/', (req, res) =>{
    res.send("Welcome to video calling app");
})
const server = app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})

const io = socket(server,{
    cors:["*"]
});



io.on("connection",(socket)=>{
    const user = socket?.handshake.auth.name ;
    console.log(`${user} connected`);
    socket.broadcast.emit("connected",user);
    socket.on("disconnect",()=>{
        console.log(`${user} disconnected`);
    })
    socket.on("calling",(my_details)=>{
        socket.broadcast.emit("incoming-call",my_details)
    })
    socket.on("call_received",(receiver_details) =>{
        socket.broadcast.emit("received-call",receiver_details)
    })
    socket.on("ice-candidate",(candidate)=>{
        socket.broadcast.emit("got-candidate",candidate);
    })
})

