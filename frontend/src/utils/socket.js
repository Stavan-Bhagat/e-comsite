import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

const socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] });

export default socket;
