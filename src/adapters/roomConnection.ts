import { toast } from 'react-hot-toast';
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import connectedUsersStore from '../stores/room/connectedUsersStore';
import roomSocket from './roomSocket';
import messageStore from '../stores/room/messagesStore';
import userPcStore from '../stores/room/userPcStore';
import userStore from '../stores/userStore';
import UserMediaStreamStore from '../stores/room/userMediaStreamStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';
import mediaStateChange from './mediaStateChange';
import { API } from '../config';
import { SOCKET_EVENT } from './event.enum';

export const roomConnection = (roomId: string) => {
  const navigate = useNavigate();
  const {
    connectedUsers,
    appendUser,
    removeUser,
    findUserByUid,
    findUserBySid,
    setUsers,
    setNicknameByUid,
    setAvatarByUid,
    setSidByUid,
  } = connectedUsersStore();
  const { userMediaStream, userMic } = UserMediaStreamStore();
  const { appendMessages, setMessages } = messageStore();
  const { setPc, emptyPc } = userPcStore();
  const { createAll, stopMediaStream } = useCreateMediaStream();
  const { uid } = userStore();
  const { emitAudioStateChange } = mediaStateChange();
  const newSocket = roomSocket.socket;

  useEffect(() => {
    const joinSuccess = async () => {
      if (uid !== -1) {
        if (!userMediaStream) {
          await createAll();
        }
        const payload = { room: roomId, uid };
        newSocket?.emit(SOCKET_EVENT.JOIN_ROOM, payload);
      } else {
        console.log('[roomConnection] UID가 존재하지 않음');
        alert('잘못된 접근입니다.');
        navigate('/');
        window.location.reload();
      }
    };

    joinSuccess();

    newSocket?.on(SOCKET_EVENT.JOINED_ROOM, (room) => {
      console.log('[roomConnection] joinedRoom', room);
      emitAudioStateChange(roomId, userMic);
    });

    newSocket?.on(SOCKET_EVENT.ROOM_FULL, () => {
      alert(`해당 방이 꽉 찼습니다.`);
      navigate('/main');
    });

    newSocket?.on(SOCKET_EVENT.EXISTING_ROOM_USERS, ({ users, current }) => {
      console.log('i am ', current.sid);

      users.map((user) => {
        axios
          .get((API.USER as string) + user.uid, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          })
          .then((res) => {
            const existingUser = findUserByUid(user.uid);
            if (user.uid === uid) {
              toast.error('이미 접속중인 유저입니다.');
              newSocket.emit('leaveRoom', { room: roomId });
              setUsers([]);
              emptyPc();
              setMessages([]);
              stopMediaStream();
              navigate('/main');
            } else if (!existingUser) {
              appendUser({
                nickname: res.data.nickname,
                uid: user.uid,
                avatar: res.data.avatar,
                sid: user.sid,
                enabledVideo: true,
                enabledAudio: true,
                isAlreadyEntered: true,
                volume: 0.5,
              });
            } else if (existingUser) {
              setNicknameByUid(user.uid, res.data.nickname);
              setAvatarByUid(user.uid, res.data.avatar);
              setSidByUid(user.uid, user.sid);
            }
          });
        return user;
      });
    });

    newSocket?.on(SOCKET_EVENT.LEFT_ROOM, ({ sid }) => {
      if (newSocket?.id === sid) {
        console.log('i left room');
        return;
      }
      const userInfo = findUserBySid(sid);
      if (userInfo) {
        console.log(userInfo.nickname, 'left room');
        setPc({ sid, peerConnection: null });
        removeUser(sid);
        appendMessages({
          uid: userInfo.uid,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar,
          message: `${userInfo.nickname}님이 퇴장하셨습니다.`,
          createdAt: new Date().toString(),
          type: 'leave',
          isHideTime: false,
          isHideNicknameAndAvatar: false,
        });
      }
    });

    newSocket?.on(SOCKET_EVENT.DISCONNECT, () => {
      console.log('disconnect');
      navigate('/');
      window.location.reload();
    });

    return () => {
      newSocket?.off('joinedRoom');
      newSocket?.off('disconnect');
      newSocket?.off('leftRoom');
      newSocket?.off('existingRoomUsers');
      newSocket?.off('joinedRoom');
      newSocket?.off('roomFull');
    };
  }, [connectedUsers]);
};
