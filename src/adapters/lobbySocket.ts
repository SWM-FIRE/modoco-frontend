import { io } from 'socket.io-client';
import { API } from '../config';

const lobbySocket = { socket: null };

const generateSocket = () => {
  lobbySocket.socket = localStorage.getItem('access_token')
    ? io(`${API.SOCKET_LOBBY as string}`, {
        transports: ['websocket', 'polling'],
        query: { token: localStorage.getItem('access_token') },
      })
    : null;
};

const deleteSocket = () => {
  lobbySocket.socket = null;
};

export default lobbySocket;

export { generateSocket, deleteSocket };
