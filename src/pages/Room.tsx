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
import { ReactComponent as LeftTwoArrows } from '../assets/svg/Room/LeftTwoArrows.svg';
import { ReactComponent as Chatting } from '../assets/svg/Room/Chatting.svg';
import Sidebar from '../components/room/sideBar/Sidebar';
import ScreenShareModal from '../components/room/ScreenModal';
import controlSidebar from '../stores/controlSidebar';

export default function Room() {
  const { roomId } = useParams();
  const { isOpen } = controlModal();
  const { isOpenSidebar, openSidebar } = controlSidebar();
  const { isLoading, error, data } = useRoom(roomId);
  const theme = getTheme(data?.theme);
  roomConnection(roomId);
  onChatMessage();
  usePeerConnection();
  usePopHistory(roomId);

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  const onCotrolSidebarClick = () => {
    openSidebar();
  };

  return (
    <ThemeProvider theme={theme}>
      <Component>
        <Header theme={theme} />
        <Contents>
          <ScreenShare theme={theme} />
          {!isOpenSidebar && (
            <ControlSidebar
              backgroundColor={theme.chatBackground}
              onClick={onCotrolSidebarClick}
            >
              <LeftTwoArrows />
              <Chatting />
            </ControlSidebar>
          )}
          {isOpenSidebar && <Sidebar />}
        </Contents>
      </Component>
      {isOpen && <ScreenShareModal />}
    </ThemeProvider>
  );
}

interface ControlSidebarProps {
  backgroundColor: string;
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

const ControlSidebar = styled.div<ControlSidebarProps>`
  position: absolute;
  right: 0;
  top: 1.6rem;
  width: 8.6rem;
  height: 6.8rem;
  border-radius: 1rem 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
`;
