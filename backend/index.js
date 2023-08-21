const express = require('express');
require("dotenv").config();
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');
const {PORT} = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.get('/root', (req, res) =>{
    res.send("Welcome to video calling app");
})

app.post("/post", (req, res) =>{
  return  res.json({sucess:true,message:"it was successful"});
})

const server = app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})

const io = socket(server,{
    cors:true
});

// io.use(cors());



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

