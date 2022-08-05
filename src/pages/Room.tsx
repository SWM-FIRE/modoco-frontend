import styled, { ThemeProvider } from 'styled-components';
import { useParams } from 'react-router-dom';
import { getTheme } from '../styles/getTheme';
import onChatMessage from '../adapters/receiveMessage';
import { roomConnection } from '../adapters/roomConnection';
import useRoom from '../hooks/useRoom';
import usePeerConnection from '../hooks/usePeerConnection';
import usePopHistory from '../hooks/usePopHistory';
import controlModal from '../stores/controlModal';
import Header from '../components/room/header/Header';
import ScreenShare from '../components/room/screenShare/ScreenShare';
import Sidebar from '../components/room/sideBar/Sidebar';
import ScreenShareModal from '../components/room/ScreenModal';

export default function Room() {
  const { roomId } = useParams();
  const { isOpen } = controlModal();
  const { isLoading, error, data } = useRoom(roomId);
  roomConnection(roomId);
  onChatMessage();
  usePeerConnection();
  usePopHistory(roomId);

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  return (
    <ThemeProvider theme={getTheme(data?.theme)}>
      <Component>
        <Header theme={data?.theme} />
        <Contents>
          <ScreenShare theme={data?.theme} />
          <Sidebar />
        </Contents>
      </Component>
      {isOpen && <ScreenShareModal />}
    </ThemeProvider>
  );
}

const Component = styled.div`
  height: 100vh;
`;

const Contents = styled.div`
  background-color: ${({ theme }) => theme.main};
  height: calc(100% - 10rem);
  display: flex;
  position: relative;
`;
