/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomSocket from './roomSocket';
import connectedUsersStore from '../stores/connectedUsersStore';
import userStore from '../stores/userStore';
import messageStore from '../stores/messagesStore';
import userPcStore from '../stores/userPcStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';

const mediaStateChange = () => {
  const newSocket = roomSocket.socket;
  const { connectedUsers, removeUser, findUserBySid, findUserByUid } =
    connectedUsersStore();
  const { setPc } = userPcStore();
  const { uid } = userStore();
  const { toggleAudioStream } = useCreateMediaStream();
  const { appendMessages } = messageStore();
  const navigate = useNavigate();

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
      console.log('kicked uid is ', kickUser.uid);
      console.log('my uid is ', uid);
      if (kickUser.uid.toString() === uid.toString()) {
        console.log('you are kicked');
        newSocket.close();
        navigate('/main');
        window.location.reload();
      } else {
        const kickedUser = findUserByUid(kickUser.uid.toString());
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
      console.log(data);
    });
  }, [newSocket, connectedUsers]);

  return {
    emitAudioStateChange,
  };
};
export default mediaStateChange;
