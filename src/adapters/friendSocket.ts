/* eslint-disable no-unused-vars */
import { io } from 'socket.io-client';
import directMessage, { message } from 'src/interface/directMessage.interface';
import { API } from '../config';

const friendSocket = { socket: null };

const generateFriend = () => {
  if (!friendSocket.socket)
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

const recvDirectMessage = (
  appendMessage: ({ uid, message }: { uid: number; message: message }) => void,
  uid: number,
) => {
  friendSocket.socket?.on('directMessage', (data: message) => {
    console.log('recved msg');
    const targetUid = data.from === uid ? data.to : data.from;
    appendMessage({
      uid: targetUid,
      message: data,
    });
  });
};

const sendDirectMessage = (message: string, to: number) => {
  friendSocket.socket?.emit('directMessage', {
    message,
    to,
    createdAt: Date.now().toString(),
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
