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
import { API } from '../config';

export const roomConnection = (roomId: string) => {
  const navigate = useNavigate();
  const { connectedUsers, appendUser, removeUser, findUserBySid } =
    connectedUsersStore();
  const { userMediaStream } = UserMediaStreamStore();
  const { appendMessages } = messageStore();
  const { setPc } = userPcStore();
  const { createAll } = useCreateMediaStream();
  const { uid } = userStore();
  const newSocket = roomSocket.socket;

  useEffect(() => {
    const joinSuccess = async () => {
      if (uid !== -1) {
        if (!userMediaStream) {
          await createAll();
        }
        const payload = { room: roomId, uid };
        newSocket.emit('joinRoom', payload);
      } else {
        console.log('[roomConnection] UID가 존재하지 않음');
        alert('잘못된 접근입니다.');
        navigate('/');
        window.location.reload();
      }
    };

    joinSuccess();

    newSocket?.off('joinedRoom').on('joinedRoom', (room) => {
      console.log('[roomConnection] joinedRoom', room);
    });

    newSocket?.off('roomFull').on('roomFull', () => {
      alert(`해당 방이 꽉 찼습니다.`);
      navigate('/main');
    });

    newSocket
      ?.off('existingRoomUsers')
      .on('existingRoomUsers', ({ users, current }) => {
        console.log('i am ', current.sid);
        users.map((user) => {
          axios
            .get((API.USER as string) + user.uid, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            })
            .then((res) => {
              if (!connectedUsers.includes(user.uid)) {
                appendUser({
                  nickname: res.data.nickname,
                  uid: user.uid,
                  avatar: res.data.avatar,
                  socketId: user.sid,
                  enabledVideo: true,
                  enabledAudio: true,
                  isAlreadyEntered: true,
                });
                console.log('appendUser', user.uid, res);
              } else {
                console.log('already connected');
              }
            });
          return user;
        });
      });

    newSocket?.off('leftRoom').on('leftRoom', ({ sid }) => {
      if (newSocket.id === sid) {
        console.log('i left room');
        return;
      }
      const userInfo = findUserBySid(sid);
      console.log(userInfo.nickname, 'left room');
      setPc({ sid, peerConnection: null });
      removeUser(sid);
      appendMessages({
        uid: userInfo.uid,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        message: `${userInfo.nickname}님이 퇴장하셨습니다.`,
        createdAt: '',
        type: 'leave',
        isHideTime: false,
        isHideNicknameAndAvatar: false,
      });
    });

    newSocket?.off('disconnect').on('disconnect', () => {
      console.log('disconnect');
      navigate('/');
      window.location.reload();
    });
  }, []);
};
