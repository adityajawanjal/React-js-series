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

  socket.on('sendMessage',({name , room , message})=>{
    let msg = {user:name , message:message};
    socket.join(room);
    io.to(room).emit('msg',msg);
  })

  socket.on("disconnect", () => {
    console.log(`User left.`);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on PORT : ${port}`);
});
