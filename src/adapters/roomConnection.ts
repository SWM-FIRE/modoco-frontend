import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import connectedUsersStore from '../stores/connectedUsersStore';
import roomSocket from './roomSocket';
import messageStore from '../stores/messagesStore';
import userPcStore from '../stores/userPcStore';
import userStore from '../stores/userStore';
import UserMediaStreamStore from '../stores/userMediaStreamStore';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';
import { API } from '../config';

export const roomConnection = (roomId: string) => {
  const navigate = useNavigate();
  const { connectedUsers, appendUser, removeUser, findUser } =
    connectedUsersStore();
  const { userMediaStream } = UserMediaStreamStore();
  const { appendMessages } = messageStore();
  const { setPc } = userPcStore();
  const { createAll } = useCreateMediaStream();
  const { uid } = userStore();

  useEffect(() => {
    const joinSuccess = async () => {
      if (uid) {
        if (!userMediaStream) {
          await createAll();
        }
        const payload = { room: roomId, uid };
        roomSocket.emit('joinRoom', payload);
      } else {
        console.log('[roomConnection] UID가 존재하지 않음');
        navigate('/');
      }
    };

    const setConnected = (user, res) => {
      if (!connectedUsers.includes(user.uid)) {
        appendUser({
          nickname: res.data.nickname,
          uid: user.uid,
          avatar: res.data.avatar,
          socketId: user.sid,
          stream: new MediaStream(),
        });
      } else {
        console.log('already connected');
      }
    };

    joinSuccess();

    roomSocket.off('joinedRoom').on('joinedRoom', (room) => {
      console.log('[roomConnection] joinedRoom', room);
    });

    roomSocket.off('roomFull').on('roomFull', (room) => {
      alert(`해당 방이 꽉 찼습니다.`);
      console.log(room);
      navigate('/main');
    });

    roomSocket
      .off('existingRoomUsers')
      .on('existingRoomUsers', ({ users, current }) => {
        console.log('existing users', users);
        console.log('i am ', current.sid);
        users.map((user) => {
          axios
            .get((API.USER as string) + user.uid, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            })
            .then((res) => {
              setConnected(user, res);
            });
          return user;
        });
      });

    roomSocket.off('leftRoom').on('leftRoom', ({ sid }) => {
      if (roomSocket.id === sid) {
        console.log('i left room');
        return;
      }
      const userInfo = findUser(sid);
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
  }, []);
};
