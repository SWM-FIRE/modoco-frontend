import { io } from 'socket.io-client';

const videoSocket = io(process.env.REACT_APP_SOCKET_VIDEO_URL as string);

function videoSocketInit(payload) {
  videoSocket.on('connect', () => {
    console.log('socket server connected.');
    videoSocket.emit('joinRoom', payload);
  });
}

export { videoSocketInit, videoSocket };
