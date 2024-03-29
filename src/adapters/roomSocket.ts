import { io } from 'socket.io-client';
import { API } from '../config';

const roomSocket = { socket: null };

const generateSocket = () => {
  roomSocket.socket = localStorage.getItem('access_token')
    ? io(`${API.SOCKET_ROOM as string}`, {
        transports: ['websocket', 'polling'],
        query: { token: localStorage.getItem('access_token') },
      })
    : null;
};

const deleteSocket = () => {
  roomSocket.socket = null;
};

export default roomSocket;

export { generateSocket, deleteSocket };
