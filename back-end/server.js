const express = require("express");
const app = express();
const port = 4000;
const {Server} = require("socket.io");
const {createServer} = require("http");
const cors = require("cors");


const server = createServer(app);




const users = {};

const io = new Server(server,{
    cors:{
        origin: ["http://localhost:5173", "http://localhost:5174"], 
       methods:["GET","POST"],
       credentials:true
    }
});
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    methods:["GET","POST"],
    credentials:true
 }));



app.get("/",(req,res)=> { 
    res.send("hello world");
})

io.on("connection",(socket) => {

    socket.on("register", (email) => {
        users[email] = socket.id;
        console.log(`User registered: ${email} with socket ID: ${socket.id}`);
    }); 
    
    console.log("user connected",socket.id);
    socket.on("message",({message,chatId}) =>{
        console.log({chatId,message});
        socket.to(chatId).emit("received-message", message);

      
    })
    socket.on("private_message", ({ sender, receiver, message }) => {
        const receiverSocketId = users[receiver]; 
        console.log("this is the user",users);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("received-message", { sender, message });
            console.log(`message is sent by ${sender} message is ${message} to ${receiver}`);
        } else {
            console.log(`User not found for email: ${receiver}`);
        }




    });

    socket.on("disconnect-socket",() => {
        console.log("user disconnect",socket.id);
        for (let email in users){
            if (users[email] === socket.id){
                delete users[email];
                break;
            }
        }
    })
    socket.on("join-room",(room) => {
        socket.join(room);
        console.log(`user join ${room}`);
    });
    socket.emit("welcome","Welcome to the chat room!")

    
   

})


server.listen(port,() => {
    console.log("server run successfully");
});