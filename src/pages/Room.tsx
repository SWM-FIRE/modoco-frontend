import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getTheme } from '../styles/getTheme';
import onChatMessage from '../adapters/receiveMessage';
import { roomConnection } from '../adapters/roomConnection';
import useRoom from '../hooks/useRoom';
import usePeerConnection from '../hooks/usePeerConnection';
import usePopHistory from '../hooks/usePopHistory';
import SettingModal from '../components/atoms/settingModal/SettingModal';
import Header from '../components/room/header/Header';
import ScreenShare from '../components/room/screenShare/ScreenShare';
import ControlSidebar from '../components/room/controlSidebar/ControlSidebar';
import Sidebar from '../components/room/sideBar/Sidebar';
import roomModalStore from '../stores/room/roomModalStore';
import ScreenShareModal from '../components/room/ScreenModal';
import ProfileModal from '../components/room/profileModal/ProfileModal';
import InviteModal from '../components/room/InviteModal/InviteModal';
import CodeModal from '../components/room/codeModal/CodeModal';
import YoutubeModal from '../components/room/youtubeModal/YoutubeModal';
import { deleteSocket } from '../adapters/roomSocket';
import musicStore from '../stores/room/musicStore';

export default function Room() {
  const { roomId } = useParams();
  const { isLoading, error, data } = useRoom(roomId);
  useEffect(() => {
    return () => {
      deleteSocket();
    };
  }, []);
  const {
    screenModal,
    settingModal,
    sidebarModal,
    profileModal,
    inviteModal,
    codeModal,
    codeModalType,
    youtubeModal,
    toggleSettingModal,
    toggleSidebarModal,
    toggleProfileModal,
    toggleInviteModal,
    toggleCodeModal,
    toggleYoutubeModal,
  } = roomModalStore();
  const { type } = musicStore();

  const theme = getTheme(data?.theme);

  roomConnection(roomId);
  onChatMessage(roomId);
  usePeerConnection();
  usePopHistory(roomId);

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '1rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  const onControlSidebarClick = () => {
    toggleSidebarModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      {settingModal && (
        <SettingModal setting={settingModal} toggle={toggleSettingModal} />
      )}
      {profileModal && <ProfileModal toggle={toggleProfileModal} />}
      {screenModal && <ScreenShareModal />}
      {inviteModal && <InviteModal toggle={toggleInviteModal} />}
      {codeModal && (
        <CodeModal toggle={toggleCodeModal} codeModalType={codeModalType} />
      )}
      <Component>
        <Header theme={data?.theme} />
        <Contents isOpen={sidebarModal}>
          {youtubeModal && type === 'youtube' && (
            <YoutubeModal toggle={toggleYoutubeModal} />
          )}
          {!youtubeModal && type === 'youtube' && (
            <ControlSidebar
              toggle={toggleYoutubeModal}
              backgroundColor={theme.chatBackground}
              type="youtube"
            />
          )}
          <ScreenShare theme={data?.theme} />
          {sidebarModal ? (
            <Sidebar moderator={data?.moderator.uid} />
          ) : (
            <ControlSidebar
              backgroundColor={theme.chatBackground}
              toggle={onControlSidebarClick}
              type="chatting"
            />
          )}
        </Contents>
      </Component>
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
