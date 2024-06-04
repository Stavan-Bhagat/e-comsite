<<<<<<< HEAD
const express=require('express')
=======
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const database = require("./database/connection");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const productRoutes = require("./Routes/productRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3000/"] }));

database();

app.use("/submit", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/", (req, res) => {
  res.json("demo api");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
>>>>>>> refactor
