/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import roomSocket from './roomSocket';
import connectedUsersStore from '../stores/room/connectedUsersStore';
import userStore from '../stores/room/userStore';
import messageStore from '../stores/room/messagesStore';
import userPcStore from '../stores/room/userPcStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';

const mediaStateChange = () => {
  const newSocket = roomSocket.socket;
  const { connectedUsers, removeUser, findUserBySid, findUserByUid } =
    connectedUsersStore();
  const { setPc } = userPcStore();
  const { uid } = userStore();
  const { toggleAudioStream } = useCreateMediaStream();
  const { appendMessages } = messageStore();

  const emitAudioStateChange = (room: string, enabled: boolean) => {
    newSocket.emit('audioStateChange', { room, enabled });
    toggleAudioStream(enabled);
  };

  useEffect(() => {
    newSocket?.off('audioStateChange').on('audioStateChange', (data) => {
      const { sid, enabled } = data;
      const user = findUserBySid(sid);
      if (user) {
        user.enabledAudio = enabled;
      }
    });

    newSocket?.off('kickUser').on('kickUser', (data) => {
      const { kickUser } = data;
      if (kickUser.uid === uid) {
        alert('방장에 의해 강퇴당하였습니다.');
        newSocket.close();
      } else {
        const kickedUser = findUserByUid(kickUser.uid);
        console.log(kickedUser);
        if (kickedUser.socketId) {
          setPc({ sid: kickedUser.socketId, peerConnection: null });
          removeUser(kickedUser.socketId);
        }
        appendMessages({
          uid: kickedUser.uid,
          nickname: kickedUser.nickname,
          avatar: kickedUser.avatar,
          message: `${kickedUser.nickname}님이 강퇴당하였습니다.`,
          createdAt: '',
          type: 'leave',
          isHideTime: false,
          isHideNicknameAndAvatar: false,
        });
      }
    });
  }, [newSocket, connectedUsers]);

  return {
    emitAudioStateChange,
  };
};
export default mediaStateChange;
