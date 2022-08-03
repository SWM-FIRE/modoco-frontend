import { useEffect } from 'react';
import axios from 'axios';
import connectedUsersStore from '../stores/connectedUsersStore';
import roomSocket from './roomSocket';
import messageStore from '../stores/messagesStore';
import userPcStore from '../stores/userPcStore';
import { API } from '../config';

export const roomConnection = (roomId) => {
  const { connectedUsers, appendUser, removeUser, findUser } =
    connectedUsersStore();
  const { appendMessages } = messageStore();
  const { pcs, setPc } = userPcStore();

  useEffect(() => {
    const newUID = localStorage.getItem('uid');

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

    const payload = { room: roomId, uid: newUID };
    if (newUID) {
      roomSocket.emit('joinRoom', payload);
    } else {
      console.log('[roomConnection] UID가 존재하지 않음');
    }

    roomSocket.off('joinedRoom').on('joinedRoom', (room) => {
      console.log('[roomConnection] joinedRoom', room);
    });

    roomSocket
      .off('existingRoomUsers')
      .on('existingRoomUsers', ({ users, current }) => {
        console.log('existing users', users);
        console.log('i am ', current.sid);
        users.map((user) => {
          axios.get((API.USER as string) + user.uid).then((res) => {
            setConnected(user, res);
          });
          return user;
        });
      });

    roomSocket.off('leftRoom').on('leftRoom', ({ sid }) => {
      const userInfo = findUser(sid);
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
      pcs[sid]?.close();
      setPc({ sid, peerConnection: undefined });
      removeUser(sid);
    });
  }, [connectedUsers]);
};
