const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const router = require("./router");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// middleware functions
// configuring CORS for express
app.use(cors()); // CORS should be called before router
app.use(router);

// CORS for Socket.io, because without this the app crashes
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("We have a new connection!");

  socket.on("disconnect", () => {
    console.log("Connection is disconnected!!!");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
