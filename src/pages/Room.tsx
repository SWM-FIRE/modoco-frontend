import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import connectedUsersStore from '../stores/connectedUsersStore';
import usePreventLeave from '../hooks/usePreventLeave';
import { roomConnection } from '../adapters/roomConnection';
import roomSocket from '../adapters/roomSocket';
import onChatMessage from '../adapters/receiveMessage';
import { history } from '../hooks/useHistory';
import { useCreateMediaStream } from '../components/rtc/hooks/useCreateLocalStream';

export default function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  roomConnection(roomId);
  onChatMessage();
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
