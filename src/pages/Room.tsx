import styled, { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import connectedUsersStore from '../stores/connectedUsersStore';
import usePreventLeave from '../hooks/usePreventLeave';
import useRoom from '../hooks/useRoom';
import { roomConnection } from '../adapters/roomConnection';
import controlModal from '../stores/controlModal';
import ScreenShareModal from '../components/room/ScreenModal';
import roomSocket from '../adapters/roomSocket';
import usePeerConnection from '../hooks/usePeerConnection';
import onChatMessage from '../adapters/receiveMessage';
import { history } from '../hooks/useHistory';
import { getTheme } from '../styles/getTheme';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';

export default function Room() {
  const { roomId } = useParams();
  const { isOpen } = controlModal();
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  const { isLoading, error, data } = useRoom(roomId);
  roomConnection(roomId);
  onChatMessage();
  usePeerConnection();
  const { enablePrevent, disablePrevent } = usePreventLeave();

  useEffect(() => {
    enablePrevent();
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === 'POP') {
        console.log('popping');
        setTimeout(() => {
          roomSocket.emit('leaveRoom', roomId);
          stopMediaStream();
          setUsers([]);
        }, 100);
      }
    });
    return disablePrevent && unlistenHistoryEvent;
  }, [history]);

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
