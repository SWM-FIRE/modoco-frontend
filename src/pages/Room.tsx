import styled, { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  themeOcean,
  themeCamping,
  themeCosmos,
  themeFire,
  themeTravel,
} from '../styles/theme';
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
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';

export default function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { isOpen } = controlModal();
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  const { data } = useRoom(roomId);
  let theme;
  switch (data.theme) {
    case 'ocean':
      theme = themeOcean;
      break;
    case 'fire':
      theme = themeFire;
      break;
    case 'camping':
      theme = themeCamping;
      break;
    case 'cosmos':
      theme = themeCosmos;
      break;
    case 'travel':
      theme = themeTravel;
      break;
    default:
      theme = themeFire;
  }
  roomConnection(roomId);
  onChatMessage();
  usePeerConnection();
  const { enablePrevent, disablePrevent } = usePreventLeave();

  useEffect(() => {
    if (!localStorage.getItem('uid') || !localStorage.getItem('nickname')) {
      alert('로그인 후 이용해주세요');
      roomSocket.emit('leaveRoom', roomId);
      stopMediaStream();
      navigate('/main');
    }
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

  return (
    <ThemeProvider theme={theme}>
      <Component>
        <Header />
        <Contents>
          <ScreenShare />
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
