import { useEffect } from 'react';
import axios from 'axios';
import connectedUsersStore from '../stores/connectedUsersStore';
import roomSocket from './roomSocket';
import messageStore from '../stores/messagesStore';

export const roomConnection = (roomId) => {
  const { appendMessages } = messageStore();
  const { connectedUsers, appendUser, removeUser } = connectedUsersStore();
  useEffect(() => {
    const newUID = localStorage.getItem('uid');

    const setConnected = (user, res) => {
      appendUser({
        nickname: res.data.nickname,
        uid: user.uid,
        avatar: res.data.avatar,
        socketId: user.sid,
      });
    };

    const payload = { room: roomId, uid: newUID };
    roomSocket.emit('joinRoom', payload);

    roomSocket.off('newUser').on('newUser', ({ sid, uid }) => {
      axios
        .get((process.env.REACT_APP_GET_USER_INFO as string) + uid)
        .then((res) => {
          setConnected({ sid, uid }, res);
          console.log('new', res.data.nickname, 'joined');
        });
      console.log('new user joined', sid, uid);

      const userInfo = connectedUsers.filter((user) => user.uid === uid)[0];
      console.log(userInfo);
      appendMessages({
        uid,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        message: '',
        createdAt: '',
        type: 'join',
        isHideTime: false,
        isHideNicknameAndAvatar: false,
      });
    });

    roomSocket
      .off('existingRoomUsers')
      .on('existingRoomUsers', ({ users, current }) => {
        console.log('i am ', current.sid);
        users.map((user) => {
          axios
            .get((process.env.REACT_APP_GET_USER_INFO as string) + user.uid)
            .then((res) => {
              setConnected(user, res);
            });
          return user;
        });
      });

    roomSocket.off('leftRoom').on('leftRoom', ({ sid }) => {
      removeUser(sid);
    });
  });
};
