const socketIo = require('socket.io');
require('dotenv').config();
const socketCorsOrigins = process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim());
console.log('socket', socketCorsOrigins);

let io;

const startSocket = (server) => {
  if (!server) {
    throw new Error('Server instance is required to initialize Socket.IO');
  }

  io = socketIo(
    server,
    {
      cors: {
        origin: socketCorsOrigins,
        methods: ['GET', 'POST']
      }
    },
    { transports: ['websocket'] }
  );

  io.on('connection', (socket) => {
    console.log('A user connected');
    console.log('socketbhai', socket);
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User with ID: ${roomId} joined room: ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  console.log('Socket.IO initialized');
};

module.exports = {
  startSocket,
  getIo: () => io
};

// let io;
// const {
//   MSG_SOCKET_IO_NOT_INITIALIZED,
//   MSG_SERVER_INSTANCE_REQUIRED
// } = require('./constant/errorMessage.constant');
// require('dotenv').config();

// const socketCorsOrigins = process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim());
// console.log('socket', socketCorsOrigins);
// module.exports = {
//   init: (server) => {
//     if (!server) {
//       throw new Error(MSG_SERVER_INSTANCE_REQUIRED);
//     }

//     const socketIo = require('socket.io')(server, {
//       cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//       },
//     }, { transports : ['websocket'] });

//     io = socketIo;
//     io.on('connection', (socket) => {
//       console.log('A user connected');
//       socket.on('joinRoom', (roomId) => {
//         socket.join(roomId);
//         console.log(`User with ID: ${roomId} joined room: ${roomId}`);
//         console.log('Rooms:', socket.rooms);
//       });

//       socket.on('disconnect', () => {
//         console.log('A user disconnected');
//       });
//     });

//     console.log('Socket.IO initialized');
//     return io;
//   },

//   getIo: () => {
//     if (!io) {
//       throw new Error(MSG_SOCKET_IO_NOT_INITIALIZED);
//     }
//     return io;
//   }
// };
