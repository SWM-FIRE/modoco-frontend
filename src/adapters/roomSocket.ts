import { io } from 'socket.io-client';
import { API } from '../config';

const roomSocket = io(API.SOCKET as string);

export default roomSocket;
