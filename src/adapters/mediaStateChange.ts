/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import roomSocket from './roomSocket';
import connectedUsersStore from '../stores/room/connectedUsersStore';
import userStore from '../stores/userStore';
import messageStore from '../stores/room/messagesStore';
import userPcStore from '../stores/room/userPcStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';
import { SOCKET_EVENT } from './event.enum';

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
    newSocket?.emit(SOCKET_EVENT.AUDIO_STATE_CHANGE, { room, enabled });
  };

  useEffect(() => {
    newSocket?.on(SOCKET_EVENT.AUDIO_STATE_CHANGE, (data) => {
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
          volume: 0.5,
        });
      } else if (audioStateUser && !isMe) {
        setEnabledAudioByUid(uid, enabled);
      } else if (isMe) {
        toggleAudioStream(enabled);
      }
    });

    newSocket?.on(SOCKET_EVENT.KICK_USER, (data) => {
      const { kickUser } = data;
      if (kickUser?.uid === userId) {
        alert('방장에 의해 강퇴당하였습니다.');
        newSocket.close();
      } else {
        const kickedUser = findUserByUid(kickUser?.uid);
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
          type: 'LEAVE',
          isHideTime: false,
          isHideNicknameAndAvatar: false,
        });
      }
    });
    return () => {
      newSocket?.off(SOCKET_EVENT.AUDIO_STATE_CHANGE);
      newSocket?.off(SOCKET_EVENT.KICK_USER);
    };
  }, [newSocket, connectedUsers]);

  return {
    emitAudioStateChange,
  };
};
export default mediaStateChange;
