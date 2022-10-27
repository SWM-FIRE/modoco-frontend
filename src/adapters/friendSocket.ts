/* eslint-disable no-unused-vars */
import { io } from 'socket.io-client';
import directMessage, { message } from 'src/interface/directMessage.interface';
import userStore from 'src/stores/userStore';
import { API } from '../config';

const friendSocket = { socket: null };

const generateFriend = () => {
  friendSocket.socket = localStorage.getItem('access_token')
    ? io(`${API.SOCKET_FRIEND as string}`, {
        transports: ['websocket', 'polling'],
        query: { token: localStorage.getItem('access_token') },
      })
    : null;
};

const deleteSocket = () => {
  friendSocket.socket = null;
};

const syncFriend = (
  setMessage: ({ uid, messages }: { uid: number; messages: message[] }) => void,
) => {
  friendSocket.socket?.on('friend:sync-all', (data: directMessage[]) => {
    data.forEach((singleData) => {
      setMessage({
        uid: singleData.friend.uid,
        messages: singleData.messages,
      });
    });
  });
};

interface recvMessage {
  sender: number;
  to: number;
  message: string;
  createdAt: string;
}

const recvDirectMessage = (
  appendMessage: ({ uid, message }: { uid: number; message: message }) => void,
) => {
  friendSocket.socket?.on('directMessage', (data: recvMessage) => {
    const payload = {
      from: data.sender,
      to: data.to,
      message: data.message,
      createdAt: data.createdAt,
    };
    const { uid } = userStore();
    const targetUid = data.sender === uid ? data.to : data.sender;
    appendMessage({
      uid: targetUid,
      message: payload,
    });
  });
};

const sendDirectMessage = (message: string, to: number) => {
  friendSocket.socket?.emit('directMessage', {
    message,
    to,
    createdAt: new Date().toString(),
  });
};

export default friendSocket;

export {
  generateFriend,
  deleteSocket,
  syncFriend,
  recvDirectMessage,
  sendDirectMessage,
};
