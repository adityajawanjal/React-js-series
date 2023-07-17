const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const { addUser, getUser } = require("./user");

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = socketIO(server, {
  cors: {
    origin: `http://127.0.0.1:5173`,
  },
});

io.on("connection", (socket) => {
  console.log(`New socket Connected.`);

  socket.on("join", ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return ;
    socket.emit("message", {
      user: "admin",
      text: `${user.name} , welcome to room : ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined !` });
    socket.join(user.room);
  });

  socket.on('sendMessage',(message)=>{
    const user = getUser(socket.id);
    io.to(user.room).emit('message',{user:user.name , text:message});
  })

  socket.on("disconnect", () => {
    console.log(`User left.`);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on PORT : ${port}`);
});
