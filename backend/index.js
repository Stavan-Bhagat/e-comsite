const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const database = require("./database/connection");
const userRoutes = require("./Routes/routes");
const cors = require("cors");

// Remove bodyParse.json() since express.json() is already used
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000","http://localhost:3000/"] }));

database();

app.use("/submit", userRoutes);

app.use("/", (req, res) => {
  res.json("demo api");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
