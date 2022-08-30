import { useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getTheme } from '../styles/getTheme';
import onChatMessage from '../adapters/receiveMessage';
import { roomConnection } from '../adapters/roomConnection';
import useRoom from '../hooks/useRoom';
import usePeerConnection from '../hooks/usePeerConnection';
import usePopHistory from '../hooks/usePopHistory';
import controlModal from '../stores/controlModal';
import SettingModal from '../components/atoms/settingModal/SettingModal';
import Header from '../components/room/header/Header';
import ScreenShare from '../components/room/screenShare/ScreenShare';
import { ReactComponent as LeftTwoArrows } from '../assets/svg/Room/LeftTwoArrows.svg';
import { ReactComponent as Chatting } from '../assets/svg/Room/Chatting.svg';
import { ReactComponent as NewChatting } from '../assets/svg/Room/NewChatting.svg';
import Sidebar from '../components/room/sideBar/Sidebar';
import ScreenShareModal from '../components/room/ScreenModal';
import receiveNewMessageStore from '../stores/receiveNewMessageStore';
import controlSidebar from '../stores/controlSidebar';
import ChattingAlarm from '../components/room/sideBar/ChattingAlarm';
import UserMediaStreamStore from '../stores/userMediaStreamStore';

export default function Room() {
  const { roomId } = useParams();
  const { isOpen } = controlModal();
  const volumeRef = useRef<HTMLAudioElement>(null);
  const { isReceiveNewMessage, isAlarmToggle } = receiveNewMessageStore();
  const { isOpenSidebar, openSidebar } = controlSidebar();
  const { isLoading, error, data } = useRoom(roomId);
  const theme = getTheme(data?.theme);
  const { userMediaStream } = UserMediaStreamStore();
  const [isSetting, setIsSetting] = useState(false);
  roomConnection(roomId);
  onChatMessage();
  usePeerConnection();
  usePopHistory(roomId);

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '1rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  const onControlSidebarClick = () => {
    openSidebar();
  };

  return (
    <ThemeProvider theme={theme}>
      {isSetting ? (
        <SettingModal
          setting={isSetting}
          setSetting={setIsSetting}
          stream={userMediaStream}
        />
      ) : null}
      <Toaster />
      <Component>
        <Header theme={data?.theme} setSetting={setIsSetting} />
        <Contents isOpen={isOpenSidebar}>
          <ScreenShare theme={data?.theme} />
          {!isOpenSidebar && (
            <ControlSidebar
              backgroundColor={theme.chatBackground}
              onClick={onControlSidebarClick}
            >
              <LeftTwoArrows />
              {isReceiveNewMessage ? (
                <>
                  <ChattingAlarm
                    volumeRef={volumeRef}
                    isAlarmToggle={isAlarmToggle}
                  />
                  <NewChatting />
                </>
              ) : (
                <Chatting />
              )}
            </ControlSidebar>
          )}
          {isOpenSidebar && <Sidebar />}
        </Contents>
      </Component>
      {isOpen && <ScreenShareModal />}
    </ThemeProvider>
  );
}

const Component = styled.div`
  height: 100vh;
`;

const Contents = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.main};
  height: calc(100% - 10rem);
  display: flex;
  justify-content: ${(props) => (props.isOpen ? 'flex-start' : 'center')};
  @media (max-width: 1440px) {
    justify-content: center;
  }
  position: relative;
`;

const ControlSidebar = styled.div<{ backgroundColor: string }>`
  z-index: 1;
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
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
`;
