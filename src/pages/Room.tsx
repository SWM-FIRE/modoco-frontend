import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import ScreenShareModal from '../components/room/ScreenModal';
import controlModal from '../stores/controlModal';
import usePreventLeave from '../hooks/usePreventLeave';
import connectedUsersStore from '../stores/connectedUsersStore';
import {
  socketInit,
  emitJoinChatRoom,
  onJoinedRoom,
  onChatMessage,
  onLeftRoom,
  onDisconnect,
} from '../adapters/chat/socketio';
import { videoSocket, videoSocketInit } from '../adapters/video/videoSocket';

export default function Room() {
  const [userList, setUserList] = useState({});
  const [messages, setMessages] = useState([]);
  const [prev, setPrev] = useState('');
  const { isOpen } = controlModal();
  const { roomId } = useParams();
  const { enablePrevent, disablePrevent } = usePreventLeave();
  const { connectedUsers, appendUser, removeUser } = connectedUsersStore();

  useEffect(() => {
    videoSocketInit();

    videoSocket.on(`${roomId}-update-user-list`, ({ users }) => {
      users.map((user) => {
        axios
          .get((process.env.REACT_APP_GET_USER_INFO as string) + user.uid)
          .then((res) => {
            if (!connectedUsers.includes(user.uid)) {
              appendUser({
                nickname: res.data.nickname,
                uid: res.data.uid,
                avatar: res.data.avatar,
                socketId: user.id,
              });
            }
          });
        return user;
      });
      console.log('updated user list');
    });

    videoSocket.on(`${roomId}-add-user`, (user) => {
      axios
        .get((process.env.REACT_APP_GET_USER_INFO as string) + user.uid)
        .then((res) => {
          if (!connectedUsers.includes(user.uid)) {
            console.log('new', res.data.nickname, 'joined');
            appendUser({
              nickname: res.data.nickname,
              uid: user.uid,
              avatar: res.data.avatar,
              socketId: user.user,
            });
          }
        });
    });

    videoSocket.on(`${roomId}-remove-user`, (user) => {
      console.log('remove user', user);
      removeUser(user.socketId);
    });
    socketInit();
    emitJoinChatRoom(roomId, uid);
    onJoinedRoom(receiveJoin);
    onChatMessage(receiveMessage);
    onLeftRoom();
    onDisconnect();
  }, []);

  useEffect(() => {
    enablePrevent();
    return disablePrevent;
  }, []);

  const receiveJoin = (uid) => {
    const API_URL = process.env.REACT_APP_GET_USER_INFO as string;
    axios.get(API_URL + uid).then((res) => {
      setMessages([
        ...messages,
        { prev: '0', uid, nickname: res.data.nickname },
      ]);
    });
    setPrev(Date.now().toString());
  };

  const receiveMessage = useCallback((receiveMsg) => {
    if (!userList[receiveMsg.sender]) {
      try {
        const API_URL = process.env.REACT_APP_GET_USER_INFO as string;
        axios.get(API_URL + receiveMsg.sender).then((res) => {
          setUserList((users) => {
            return { ...users, [receiveMsg.sender]: res.data };
          });

          setMessages((message) => [
            ...message,
            {
              uid: receiveMsg.sender,
              nickname: res.data.nickname,
              avatar: res.data.avatar,
              message: receiveMsg.message,
              createdAt: receiveMsg.createdAt,
              prev,
            },
          ]);
        });
      } catch (err) {
        console.log('error!! ', err);
      }
    } else {
      setMessages((message) => [
        ...message,
        {
          uid: receiveMsg.sender,
          nickname: userList[receiveMsg.sender].nickname,
          avatar: userList[receiveMsg.sender].avatar,
          message: receiveMsg.message,
          createdAt: receiveMsg.createdAt,
          prev,
        },
      ]);
    }
    setPrev(receiveMsg.createdAt);
  }, []);

  return (
    <>
      <Component>
        <Header />
        <Contents>
          <ScreenShare />
          <Sidebar messages={messages} />
        </Contents>
      </Component>
      {isOpen && <ScreenShareModal />}
    </>
  );
}

const Component = styled.div`
  height: 100vh;
`;

const Contents = styled.div`
  background-color: #18181b;
  height: calc(100% - 10rem);
  display: flex;
  position: relative;
`;
