import connectedLobbyUsers from 'src/stores/connectedLobbyUsers';
import connectedUsersStore from 'src/stores/room/connectedUsersStore';
import messageStore from 'src/stores/room/messagesStore';
import lobbyMessageStore from 'src/stores/lobbyMessageStore';
import roomSocket from './roomSocket';
import { lobbySocket } from './lobbySocket';

const getSocketData = (roomId: string) => {
  const { connectedUsers: roomConnected } = connectedUsersStore();
  const { connectedUsers: lobbyConnected } = connectedLobbyUsers();
  const connectedUsers = roomId === 'lobby' ? lobbyConnected : roomConnected;

  const { messages: roomMessages, setMessages: setRoomMessages } =
    messageStore();
  const { messages: lobbyMessages, setMessages: setLobbyMessages } =
    lobbyMessageStore();
  const messages = roomId === 'lobby' ? lobbyMessages : roomMessages;
  const setMessages = roomId === 'lobby' ? setLobbyMessages : setRoomMessages;

  const newSocket = roomId === 'lobby' ? lobbySocket.socket : roomSocket.socket;

  return {
    connectedUsers,
    messages,
    setMessages,
    newSocket,
  };
};

export default getSocketData;
