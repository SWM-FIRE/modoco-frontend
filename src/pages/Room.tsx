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
import {
  socketInit,
  emitJoinChatRoom,
  onJoinedRoom,
  onChatMessage,
  onLeftRoom,
} from '../adapters/chat/socketio';

export default function Room() {
  const [userList, setUserList] = useState({});
  const [messages, setMessages] = useState([]);
  const { isOpen } = controlModal();
  const { roomId } = useParams();
  const { enablePrevent, disablePrevent } = usePreventLeave();

  useEffect(() => {
    socketInit();
    emitJoinChatRoom(roomId);
    onJoinedRoom();
    onChatMessage(receiveMessage);
    onLeftRoom();
  }, []);

  useEffect(() => {
    enablePrevent();
    return disablePrevent;
  }, []);

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
        },
      ]);
    }
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
