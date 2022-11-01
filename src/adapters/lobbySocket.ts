import { io } from 'socket.io-client';
import { API } from '../config';
import { SOCKET_EVENT } from './event.enum';

const lobbySocket = {
  socket: null,
};

const generateLobbySocket = (token) => {
  lobbySocket.socket = io(`${API.SOCKET_LOBBY as string}`, {
    transports: ['websocket', 'polling'],
    query: { token },
  });
  lobbySocket.socket?.connect();
};

const initSocketConnection = (token) => {
  if (lobbySocket.socket === null) {
    generateLobbySocket(token);
  }
  lobbySocket.socket.connect();
};

const emitJoinLobby = (getMe) => {
  getMe().then((res) => {
    lobbySocket.socket.emit(SOCKET_EVENT.JOIN_LOBBY, { uid: res.data.uid });
  });
};

const onNewUserJoinedLobby = (func) => {
  lobbySocket.socket?.on(SOCKET_EVENT.NEW_USER_JOINED_LOBBY, (data) =>
    func(data),
  );
};

const onExistingUsers = (func) => {
  lobbySocket.socket?.on(SOCKET_EVENT.EXISTING_LOBBY_USERS, (data) =>
    func(data),
  );
};

const leaveLobby = () => {
  lobbySocket.socket?.emit(SOCKET_EVENT.LEAVE_LOBBY);
  lobbySocket.socket?.off(SOCKET_EVENT.JOIN_LOBBY);
  lobbySocket.socket?.off(SOCKET_EVENT.NEW_USER_JOINED_LOBBY);
  lobbySocket.socket?.off(SOCKET_EVENT.EXISTING_LOBBY_USERS);
  lobbySocket.socket?.off(SOCKET_EVENT.LEFT_LOBBY);
  lobbySocket.socket?.disconnect();
};

const onLeftLobby = (func) => {
  lobbySocket.socket?.on(SOCKET_EVENT.LEFT_LOBBY, (data) => func(data));
};

export {
  lobbySocket,
  generateLobbySocket,
  emitJoinLobby,
  initSocketConnection,
  onNewUserJoinedLobby,
  onExistingUsers,
  leaveLobby,
  onLeftLobby,
};
