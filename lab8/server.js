import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;
    io.to(room).emit("message", {
      user: "System",
      text: `${username} joined the chat`,
      time: new Date(),
    });
  });

  socket.on("chatMessage", (msg) => {
    io.to(socket.room).emit("message", {
      user: socket.username,
      text: msg,
      time: new Date(),
    });
  });

  socket.on("typing", () => {
    socket.broadcast.to(socket.room).emit("typing", socket.username);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.to(socket.room).emit("stopTyping");
  });

  socket.on("sendImage", (imgData) => {
    io.to(socket.room).emit("imageMessage", {
      user: socket.username,
      image: imgData,
      time: new Date(),
    });
  });

  socket.on("disconnect", () => {
    io.to(socket.room).emit("message", {
      user: "System",
      text: `${socket.username} left the chat`,
      time: new Date(),
    });
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
