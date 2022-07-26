import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_CHAT_URL as string);

function socketInit() {
  socket.on('connect', () => {
    console.log('socket server connected.', socket.id);
  });
}

function emitJoinChatRoom(room, uid) {
  socket.emit('joinChatRoom', {
    room,
    uid,
  });
}

function onJoinedRoom(receiveFn) {
  socket.on('joinedRoom', (uid) => {
    receiveFn(uid);
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

function onDisconnect() {
  socket.on('disconnect', (reason) => {
    console.log('disconnected! ', reason);
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
  onDisconnect,
};
