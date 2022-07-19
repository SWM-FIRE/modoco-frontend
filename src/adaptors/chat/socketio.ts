import { io } from 'socket.io-client';

export const socket = io('http://localhost:3333/socket/chat');

// init socket
export const initSocket = () => {
  if (socket) return;
  socket.connect();
  console.log('initSocket');
};

// disconnect socket
export const disconnectSocket = () => {
  if (!socket) return;
  socket.disconnect();
  alert('disconnect socket');
};

// join room
export const joinRoom = (room: string) => {
  if (!socket) return;
  socket.emit('joinRoom', room);
  console.log('join room : ', room);
};

// send message
export const sendMessage = (message: string) => {
  if (!socket) return;
  socket.emit('message', message);
  alert('send message ');
};

// receive message
export const receiveMessage = (callback: (_message: string) => void) => {
  if (!socket) return;
  socket.on('message', (message: string) => {
    callback(message);
  });
  alert('receive message');
};
