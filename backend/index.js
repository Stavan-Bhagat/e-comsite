const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
// const corsOrigins = process.env.CORS_ORIGIN.split(",");
const database = require("./database/connection");
const allRoutes = require("./router/allRoutes");
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();
database();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3000/"] }));
// app.use(cors({ origin: corsOrigins }));

app.use("/fusion", allRoutes);
app.use("/", (req, res) => {
  res.json("demo api");
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
