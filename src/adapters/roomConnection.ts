import { useEffect } from 'react';
import axios from 'axios';
import connectedUsersStore from '../stores/connectedUsersStore';
import roomSocket from './roomSocket';
import messageStore from '../stores/messagesStore';
import { API } from '../config';

export const roomConnection = (roomId) => {
  const { connectedUsers, appendUser, removeUser, findUser } =
    connectedUsersStore();
  const { appendMessages } = messageStore();

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

    roomSocket.off('joinedRoom').on('joinedRoom', ({ room }) => {
      console.log('[roomConnection] joinedRoom', room);
    });

    roomSocket.off('newUser').on('newUser', ({ sid, uid }) => {
      axios.get((API.USER as string) + uid).then((res) => {
        setConnected({ sid, uid }, res);
        console.log('new', res.data.nickname, 'joined');
        appendMessages({
          uid,
          nickname: res.data.nickname,
          avatar: res.data.avatar,
          message: `${res.data.nickname}님이 입장하셨습니다.`,
          createdAt: '',
          type: 'join',
          isHideTime: false,
          isHideNicknameAndAvatar: false,
        });
      });
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
      removeUser(sid);
    });
  }, [connectedUsers]);
};
