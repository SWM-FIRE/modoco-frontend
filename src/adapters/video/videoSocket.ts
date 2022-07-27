import { io } from 'socket.io-client';

const videoSocket = io(process.env.REACT_APP_SOCKET_VIDEO_URL as string);

function videoSocketInit() {
  videoSocket.on('connect', () => {
    console.log('socket server connected.');
  });
}

export { videoSocketInit, videoSocket };
