const express = require('express');
const http = require('http');
// const socketIo = require("socket.io");
const socket = require('./socket');
const cors = require('cors');
// const corsOrigins = process.env.CORS_ORIGIN.split(",");
const database = require('./database/connection');
const allRoutes = require('./router/allRoutes');
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
require('dotenv').config();
require('./config/cleanUp');
database();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3000/'] }));
// app.use(cors({ origin: corsOrigins }));

app.use('/fusion', allRoutes);
app.use('/', (req, res) => {
  res.json('demo api');
});
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});
const io = socket.init(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
module.exports = { app, server };
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
