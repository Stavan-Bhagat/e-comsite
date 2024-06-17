let io;
const User = require('./model/user.model');
const {
  MSG_SOCKET_IO_NOT_INITIALIZED,
  MSG_SERVER_INSTANCE_REQUIRED
} = require('./constant/errorMessage.constant');

module.exports = {
  init: (server) => {
    if (!server) {
      throw new Error(MSG_SERVER_INSTANCE_REQUIRED);
    }

    const socketIo = require('socket.io')(server, {
      cors: {
        origin: [process.env.CLIENT_ORIGIN, 'http://localhost:3000','https://e-comsite-three.vercel.app/','https://e-comsite-three.vercel.app'],
        methods: ['GET', 'POST']
      }
    });

    io = socketIo;

    // Initialize socket event handling
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User with ID: ${userId} joined room: ${userId}`);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });

    console.log('Socket.IO initialized');
    return io;
  },

  getIo: () => {
    if (!io) {
      throw new Error(MSG_SOCKET_IO_NOT_INITIALIZED);
    }
    return io;
  }
};
