const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const cors = require("cors");
const server = require("socket.io");

const app = express();
const httpServer = createServer(app);
const auth = require("./midleware/auth");

//socket
const Server = server.Server;
const io = new Server(httpServer, { cors: { origin: "*" } });

//.env
const config = require("../config");

//routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

//public route
app.use(express.static("./src/public"));
app.use(express.static("./uploads"));

//routes
app.use("/users", userRoutes);
app.use("/events", auth, eventRoutes);

//base connection

mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  })
  .catch((err) => {
    console.log(err);
  });

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("eventCreated", ({ myEvent, creator }) => {
    socket.broadcast.emit("recieveEvent", { myEvent });
  });

  socket.on("registeredForEvent", ({ userWhoRegistered, eventTitle, creator, eventId }) => {
    let eventCreator = getUser(creator);
    let { email, user } = userWhoRegistered;

    //users cant register on their own event and online user wont be sent notification
    if (user !== creator && onlineUsers.some((user) => user.username === creator))
      io.to(eventCreator.socketId).emit("aproveRegistration", { email, eventTitle, eventId });

    /* socket.broadcast.emit("recieveEvent", { myEvent }); */
  });

  socket.on("userLoggedOut", (user) => {
    removeUser(getUser(user).socketId);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

httpServer.listen(5050);
