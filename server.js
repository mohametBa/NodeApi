const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const NotFoundError = require("./errors/not-found");
const userRouter = require("./api/users/users.router");
const usersController = require("./api/users/users.controller"); // le fichier users.controller existait deja j'avais le chemin incorrect
const authMiddleware = require("./middlewares/auth");
require("./api/articles/articles.schema"); 
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});
const articleRouter = require("./api/articles/article.router");


io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("my_event", (data) => {
    console.log(data);
  });
  socket.emit("event_from_server", { test: "foo" }); 
});

// Middleware pour passer de Socket.IO aux routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/users", authMiddleware, userRouter);
app.post("/login", usersController.login);
app.use("/api/articles", authMiddleware, articleRouter); // Correction 

app.use("/", express.static("public"));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({
    status,
    message,
  });
});

module.exports = {
  app,
  server,
};
