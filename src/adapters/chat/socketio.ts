import { io } from 'socket.io-client';

let socket;

function socketInit() {
  socket = io(process.env.REACT_APP_SOCKET_CHAT_URL as string);
  socket.on('connect', () => {
    console.log('socket server connected.', socket.id);
  });
}

function emitJoinChatRoom(roomId) {
  socket.emit('joinChatRoom', roomId);
}

function onJoinedRoom(nickname) {
  socket.on('joinedRoom', () => {
    console.log(nickname, ' 님이 입장하셨습니다.');
  });
}

function emitChatMessage(message) {
  socket.emit('chatMessage', message);
}

function onChatMessage(receiveFn) {
  socket.on('chatMessage', (message) => {
    receiveFn(message);
  });
}

function emitLeaveChatRoom(roomId) {
  socket.emit('leaveChatRoom', roomId);
}

function onLeftRoom() {
  socket.on('leftRoom', () => {
    console.log('방을 떠났습니다.');
    socket.removeAllListeners();
  });
}

export {
  socketInit,
  emitJoinChatRoom,
  onJoinedRoom,
  emitChatMessage,
  onChatMessage,
  emitLeaveChatRoom,
  onLeftRoom,
};
