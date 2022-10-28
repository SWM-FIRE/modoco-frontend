import { io } from 'socket.io-client';
import { API } from '../config';
import youtubeSearch from '../interface/youtubeSearch.interface';

const youtubeSocket = {
  socket: io(`${API.YOUTUBE_PLAYLIST as string}`, {
    transports: ['websocket', 'polling'],
    query: { token: localStorage.getItem('access_token') },
  }),
};

const generateYoutubeSocket = () => {
  youtubeSocket.socket = io(`${API.YOUTUBE_PLAYLIST as string}`, {
    transports: ['websocket', 'polling'],
    query: { token: localStorage.getItem('access_token') },
  });
};

const initSocketConnection = () => {
  if (!youtubeSocket.socket) generateYoutubeSocket();
  youtubeSocket.socket?.connect();
};

const checkSocket = () => {
  if (!youtubeSocket.socket || !youtubeSocket.socket.connected) {
    initSocketConnection();
  }
};

const disconnectSocket = () => {
  youtubeSocket.socket?.off('connect');
  youtubeSocket.socket?.off('playlist:join');
  youtubeSocket.socket?.off('playlist:joined');
  youtubeSocket.socket?.off('playlist:sync');
  youtubeSocket.socket?.disconnect();
};

const connectedYoutube = () => {
  youtubeSocket.socket?.on('connect', () => {
    console.log(`[youtube connect] connected! ${youtubeSocket.socket?.id}`);
  });
};

const joinYoutube = (roomId: string) => {
  checkSocket();
  youtubeSocket.socket?.emit('playlist:join', {
    room: roomId,
    playlistName: 'playlistItem',
  });
  console.log(
    `[emit join] waiting for join ${roomId}! ${youtubeSocket.socket?.id}`,
  );
};

// const joinedYoutube = () => {
//   youtubeSocket.socket?.on('playlist:joined', (roomId: string) => {
//     console.log(`[on join] joined ${roomId}! ${youtubeSocket.socket?.id}`);
//   });
// };

const selectVideo = (roomId: string, video: youtubeSearch) => {
  checkSocket();
  youtubeSocket.socket?.emit('playlist:sync', {
    room: roomId,
    playlistName: 'playlistItem',
    type: 'sync',
    playlist: [{ video }],
  });
  console.log(
    `[emit select] select ${video.id.videoId}! ${youtubeSocket.socket?.id}`,
  );
};

const addVideo = (addFunc) => {
  checkSocket();
  youtubeSocket.socket?.on('playlist:sync', (data) => addFunc(data));
  console.log(`[on add] add video! ${youtubeSocket.socket?.id}`);
};

const leaveYoutube = (roomId: string) => {
  checkSocket();
  youtubeSocket.socket?.emit('playlist:leave', {
    room: roomId,
    playlistName: 'playlistItem',
  });
  console.log(`[emit leave] leave ${roomId}! ${youtubeSocket.socket?.id}`);
};

export {
  youtubeSocket,
  initSocketConnection,
  // generateYoutubeSocket,
  disconnectSocket,
  connectedYoutube,
  joinYoutube,
  selectVideo,
  addVideo,
  leaveYoutube,
};
