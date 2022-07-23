import styled from 'styled-components';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import ScreenShareModal from '../components/room/ScreenModal';
import controlModal from '../stores/controlModal';
import usePreventLeave from '../hooks/usePreventLeave';

export default function Room() {
  const socket = io(process.env.REACT_APP_SOCKET_CHAT_URL as string);
  const { roomId } = useParams();
  const { isOpen } = controlModal();
  const { enablePrevent, disablePrevent } = usePreventLeave();

  socket.on('connect', () => {
    console.log('socket server connected!!!');
    socket.emit('joinChatRoom', roomId);
  });

  socket.on('joinedRoom', (room) => {
    console.log('joined Room : ', room);
  });

  useEffect(() => {
    enablePrevent();
    socket.emit('leaveChatRoom', roomId);
    return disablePrevent;
  }, []);

  return (
    <>
      <Component>
        <Header />
        <Contents>
          <ScreenShare />
          <Sidebar socket={socket} />
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
  /* background-color: rgba(14, 19, 33, 1); */
  background-color: #18181b;
  height: calc(100% - 10rem);
  display: flex;
  position: relative;
`;
