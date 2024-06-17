const express = require('express');
const http = require('http');
const cors = require('cors');
const socket = require('./socket');
const database = require('./database/connection');
const allRoutes = require('./router/allRoutes');
require('dotenv').config();
require('./config/cleanUp');

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);

database();

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3000/',
      'https://e-comsite-three.vercel.app',
      'https://e-comsite-three.vercel.app/'
    ]
  })
);

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
