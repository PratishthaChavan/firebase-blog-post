
const express = require("express");
const app = express();
const port = 3000;
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");

const server = createServer(app);


const users = {};


const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  methods: ["GET", "POST"],
  credentials: true
}));

app.get("/", (req, res) => { 
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("register", ({ email, userId, username  }) => {
    if (userId && email  && username) {

      users[userId] = { socketId: socket.id, email: email,username:username };
      console.log(users)
      socket.userId = userId; 
      console.log(`User registered: ${email} (${username}) with userId: ${userId} and socket ID: ${socket.id}`);
    } else {
      console.log("Registration failed: Missing userId or email");
    }
  }); 

 
  socket.on("join-room", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.userId} joined room: ${chatId}`);
  });

 
  socket.on("message", ({ message, chatId }) => {
    console.log(`Message received in room ${chatId}:`, message);
    const sender = users[socket.userId];
    if (sender) {
      const timestamp = Date.now();
      io.to(chatId).emit("received-message", { 
        senderId: socket.userId, 
        senderEmail: sender.email, 
        message: message, 
        username:sender.username,
        timestamp 
      });
    } else {
      console.log(`Sender not found for userId: ${socket.userId}`);
    }
  });

 
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    if (socket.userId && users[socket.userId]?.socketId === socket.id) {
      delete users[socket.userId];
      console.log(`User ${socket.userId} removed from users list.`);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
