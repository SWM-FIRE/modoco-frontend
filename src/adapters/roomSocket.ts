import { io } from 'socket.io-client';

const roomSocket = io(process.env.REACT_APP_SOCKET_ROOM_URL as string);

export default roomSocket;
