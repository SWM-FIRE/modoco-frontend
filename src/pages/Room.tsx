import styled from 'styled-components';
import { useEffect } from 'react';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import { initSocket, disconnectSocket } from '../adaptors/chat/socketio';

export default function Room() {
  useEffect(() => {
    // socket connection
    console.log('connecting...');
    initSocket();

    return () => {
      // socket disconnection
      disconnectSocket();
    };
  }, []);
  return (
    <Component>
      <Header />
      <Contents>
        <ScreenShare />
        <Sidebar />
      </Contents>
    </Component>
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
