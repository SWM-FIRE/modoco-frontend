import { useEffect } from 'react';
import axios from 'axios';
import connectedUsersStore from '../stores/connectedUsersStore';
import roomSocket from './roomSocket';

export const roomConnection = (roomId) => {
  const { connectedUsers, appendUser, removeUser } = connectedUsersStore();
  useEffect(() => {
    const newUID = localStorage.getItem('uid');

    const setConnected = (user, res) => {
      if (!connectedUsers.includes(user.uid)) {
        appendUser({
          nickname: res.data.nickname,
          uid: user.uid,
          avatar: res.data.avatar,
          socketId: user.sid,
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

    roomSocket.off('newUser').on('newUser', ({ sid, uid }) => {
      axios
        .get((process.env.REACT_APP_GET_USER_INFO as string) + uid)
        .then((res) => {
          setConnected({ sid, uid }, res);
          console.log('new', res.data.nickname, 'joined');
        });
      console.log('new user joined', sid, uid);
    });

    roomSocket
      .off('existingRoomUsers')
      .on('existingRoomUsers', ({ users, current }) => {
        console.log('existing users', users);
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
  }, [connectedUsers]);
};
