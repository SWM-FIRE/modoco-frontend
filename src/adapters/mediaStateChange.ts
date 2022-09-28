/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import roomSocket from './roomSocket';
import connectedUsersStore from '../stores/room/connectedUsersStore';
import userStore from '../stores/userStore';
import messageStore from '../stores/room/messagesStore';
import userPcStore from '../stores/room/userPcStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';

const mediaStateChange = () => {
  const newSocket = roomSocket.socket;
  const {
    connectedUsers,
    removeUser,
    setEnabledAudioByUid,
    findUserByUid,
    appendUser,
  } = connectedUsersStore();
  const { setPc } = userPcStore();
  const userId = userStore().uid;
  const { toggleAudioStream } = useCreateMediaStream();
  const { appendMessages } = messageStore();

  const emitAudioStateChange = (room: string, enabled: boolean) => {
    newSocket.emit('audioStateChange', { room, enabled });
    toggleAudioStream(enabled);
  };

  useEffect(() => {
    newSocket?.off('audioStateChange').on('audioStateChange', (data) => {
      const { uid, enabled } = data;
      const isMe = uid === userId;
      const audioStateUser = findUserByUid(uid);
      if (!audioStateUser && !isMe) {
        appendUser({
          nickname: '',
          uid,
          avatar: 0,
          sid: '',
          enabledVideo: true,
          enabledAudio: enabled,
          isAlreadyEntered: true,
          volume: enabled ? 0.5 : 0,
        });
      } else if (audioStateUser && !isMe) {
        setEnabledAudioByUid(uid, enabled);
      }
    });

    newSocket?.off('kickUser').on('kickUser', (data) => {
      const { kickUser } = data;
      if (kickUser.uid === userId) {
        alert('방장에 의해 강퇴당하였습니다.');
        newSocket.close();
      } else {
        const kickedUser = findUserByUid(kickUser.uid);
        console.log(kickedUser);
        if (kickedUser?.sid) {
          setPc({ sid: kickedUser?.sid, peerConnection: null });
          removeUser(kickedUser?.sid);
        }
        appendMessages({
          uid: kickedUser.uid,
          nickname: kickedUser.nickname,
          avatar: kickedUser.avatar,
          message: `${kickedUser.nickname}님이 강퇴당하였습니다.`,
          createdAt: new Date().toString(),
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
