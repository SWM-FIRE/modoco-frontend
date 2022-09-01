/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import roomSocket from './roomSocket';
import connectedUsersStore from '../stores/connectedUsersStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';

const mediaStateChange = () => {
  const newSocket = roomSocket.socket;
  const { connectedUsers } = connectedUsersStore();
  const { toggleAudioStream } = useCreateMediaStream();

  const emitAudioStateChange = (room: string, enabled: boolean) => {
    newSocket.emit('audioStateChange', { room, enabled });
    toggleAudioStream(enabled);
  };

  useEffect(() => {
    newSocket?.off('audioStateChange').on('audioStateChange', (data) => {
      const { sid, enabled } = data;
      const user = connectedUsers.find((user) => user.socketId === sid);
      if (user) {
        user.enabledAudio = enabled;
      }
    });
  }, [newSocket, connectedUsers]);

  return {
    emitAudioStateChange,
  };
};
export default mediaStateChange;
