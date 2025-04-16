import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Define socket event names
const SocketEvents = Object.freeze({
  CONNECT: "connection", // When a new client connects
  JOIN_ROOM: "joinRoom", // When a user joins a chat room
  CHAT_MESSAGE: "chatMessage", // When a user sends a chat message
  TYPING: "typing", // When a user is typing
  STOP_TYPING: "stopTyping", // When a user stops typing
  SEND_IMAGE: "sendImage", // When a user sends an image
  DISCONNECT: "disconnectChat", // When a user manually disconnects
  MESSAGE: "message", // General chat message event
  IMAGE_MESSAGE: "imageMessage", // Image message event
  ROOM_USERS: "roomUsers", // Event to update the user list in a room
});

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files
app.use("/commons", express.static("commons"));
app.use(express.static("public"));

// Track users in rooms
const users = {};

io.on(SocketEvents.CONNECT, (socket) => {
  console.log("New client connected:", socket.id);

  // User joins a room
  socket.on(SocketEvents.JOIN_ROOM, ({ username, room }) => {
    if (!username || !room) return;
    if(users[room]?.find(u => u.username === username)) {
      socket.emit(SocketEvents.MESSAGE, {
        user: "System",
        text: "Username already taken",
        time: new Date(),
      });
      return;
    }
    socket.join(room);
    socket.username = username;
    socket.room = room;

    // Store user info
    users[room] = users[room] || [];
    users[room].push({ id: socket.id, username });

    // Notify room of new user
    socket.to(room).emit(SocketEvents.MESSAGE, {
      user: "System",
      text: `${username} joined the chat`,
      time: new Date(),
    });

    // Send updated user list
    io.to(room).emit(SocketEvents.ROOM_USERS, { room, users: users[room] });
  });

  // Handle chat messages
  socket.on(SocketEvents.CHAT_MESSAGE, (msg) => {
    if (!socket.room || !msg.trim()) return;

    io.to(socket.room).emit(SocketEvents.MESSAGE, {
      user: socket.username,
      text: msg,
      time: new Date(),
    });
  });

  // Typing indicators
  socket.on(SocketEvents.TYPING, () => {
    if (socket.room) {
      socket.broadcast.to(socket.room).emit(SocketEvents.TYPING, socket.username);
    }
  });

  socket.on(SocketEvents.STOP_TYPING, () => {
    if (socket.room) {
      socket.broadcast.to(socket.room).emit(SocketEvents.STOP_TYPING);
    }
  });

  // Handle image messages
  socket.on(SocketEvents.SEND_IMAGE, (imgData) => {
    if (!socket.room) return;

    io.to(socket.room).emit(SocketEvents.IMAGE_MESSAGE, {
      user: socket.username,
      image: imgData,
      time: new Date(),
    });
  });

  // Handle manual disconnection (leave button)
  socket.on(SocketEvents.DISCONNECT, () => handleDisconnect(socket));

  socket.on("disconnectChat", () => handleDisconnect(socket));

  // Function to handle user leaving
  function handleDisconnect(socket) {
    if (!socket.room || !users[socket.room]) return;

    // Remove user from list
    users[socket.room] = users[socket.room].filter((u) => u.id !== socket.id);

    // Notify room
    io.to(socket.room).emit(SocketEvents.MESSAGE, {
      user: "System",
      text: `${socket.username} left the chat`,
      time: new Date(),
    });

    // Update user list
    io.to(socket.room).emit(SocketEvents.ROOM_USERS, {
      room: socket.room,
      users: users[socket.room],
    });

    console.log(`User ${socket.username} disconnected`);
  }
});

// Start the server
server.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
