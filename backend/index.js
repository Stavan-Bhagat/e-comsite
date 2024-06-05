const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const database = require("./database/connection");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const productRoutes = require("./Routes/productRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3000/"] }));

database();

app.use("/submit", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/", (req, res) => {
  res.json("demo api");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
