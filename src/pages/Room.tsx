import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import usePreventLeave from '../hooks/usePreventLeave';
import { roomConnection } from '../adapters/roomConnection';
import onChatMessage from '../adapters/receiveMessage';

export default function Room() {
  const { roomId } = useParams();
  roomConnection(roomId);
  onChatMessage();
  const { enablePrevent, disablePrevent } = usePreventLeave();

  useEffect(() => {
    enablePrevent();
    return disablePrevent;
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
  background-color: #18181b;
  height: calc(100% - 10rem);
  display: flex;
  position: relative;
`;
