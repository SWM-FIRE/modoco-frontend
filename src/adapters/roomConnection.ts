import { useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import connectedUsersStore from '../stores/connectedUsersStore';

export const roomConnection = () => {
  const { connectedUsers, setUsers, appendUser, removeUser } =
    connectedUsersStore();
  useEffect(() => {
    const roomSocket = io(process.env.REACT_APP_SOCKET_TEST as string);
    const roomId = 'test';
    const newUID = localStorage.getItem('uid');
    // const newUID = uuidv4();

    roomSocket.on('connect', () => {
      console.log('room socket connected');
      const payload = { room: roomId, uid: newUID };
      roomSocket.emit('joinRoom', payload);
    });
    roomSocket.off('newUser').on('newUser', ({ sid, uid }) => {
      axios
        .get((process.env.REACT_APP_GET_USER_INFO as string) + uid)
        .then((res) => {
          if (!connectedUsers.includes(uid)) {
            console.log('new', res.data.nickname, 'joined');
            appendUser({
              nickname: res.data.nickname,
              uid,
              avatar: res.data.avatar,
              socketId: sid,
            });
          }
        });
      console.log('new user joined', sid, uid);
    });
    roomSocket
      .off('existingRoomUsers')
      .on('existingRoomUsers', ({ users, current }) => {
        console.log('get exist only');
        console.log('i am ', current.sid);
        users.map((user) => {
          axios
            .get((process.env.REACT_APP_GET_USER_INFO as string) + user.uid)
            .then((res) => {
              if (!connectedUsers.includes(user.uid)) {
                appendUser({
                  nickname: res.data.nickname,
                  uid: user.uid,
                  avatar: res.data.avatar,
                  socketId: user.sid,
                });
              }
            });
          return user;
        });
        setUsers(users);
      });
    roomSocket.off('userLeft').on('userLeft', ({ sid }) => {
      removeUser(sid);
    });
  }, []);
};
