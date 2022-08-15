import { io } from 'socket.io-client';
import { API } from '../config';

const roomSocket = localStorage.getItem('access_token')
  ? io(`${API.SOCKET as string}`, {
      transports: ['websocket', 'polling'],
      query: { token: localStorage.getItem('access_token') },
    })
  : null;

console.log(roomSocket);

export default roomSocket;
