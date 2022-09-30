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
import ControlSidebar from '../components/room/ControlSidebar';
import Sidebar from '../components/room/sideBar/Sidebar';
import roomModalStore from '../stores/room/roomModalStore';
import ScreenShareModal from '../components/room/ScreenModal';
import ProfileModal from '../components/room/profileModal/ProfileModal';
import InviteModal from '../components/room/InviteModal/InviteModal';

export default function Room() {
  const { roomId } = useParams();
  const { isLoading, error, data } = useRoom(roomId);
  const {
    screenModal,
    settingModal,
    sidebarModal,
    profileModal,
    inviteModal,
    toggleSettingModal,
    toggleSidebarModal,
    toggleProfileModal,
    toggleInviteModal,
  } = roomModalStore();

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
      <Component>
        <Header theme={data?.theme} />
        <Contents isOpen={sidebarModal}>
          <ScreenShare theme={data?.theme} />
          {sidebarModal ? (
            <Sidebar moderator={data?.moderator.uid} />
          ) : (
            <ControlSidebar
              backgroundColor={theme.chatBackground}
              toggle={onControlSidebarClick}
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
