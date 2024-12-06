import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
const PORT = process.env.PORT || 5000;
import router from "./router.js";
import cors from "cors";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";

const app = express();
const server = createServer(app);

// middleware functions
// configuring CORS for express
app.use(cors()); // CORS should be called before router
app.use(router);

// CORS for Socket.io, because without this the app crashes
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    // after joining, we want server(admin) to welcome new user
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    // while admin sends the welcome message, we want to inform everyone else inside the room that new user has joined
    // we do that using broadcast - everyone except the user that has joined
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the room ${room}`,
    });

    // after making sure that there are no errors, user joins the room
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    // this is event for sending messages from user, data is coming from frontend!
    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
