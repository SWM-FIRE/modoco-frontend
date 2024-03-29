import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getTheme } from '../styles/getTheme';
import onChatMessage from '../adapters/receiveMessage';
import { useRoomConnection } from '../adapters/useRoomConnection';
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

export default function Room() {
  const { roomId } = useParams();
  const { isLoading, error, data } = useRoom(roomId);
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
    setYoutubeModal,
  } = roomModalStore();

  useEffect(() => {
    setYoutubeModal(false);
    return () => {
      deleteSocket();
    };
  }, [setYoutubeModal]);
  const theme = getTheme(data?.theme);

  useRoomConnection(roomId);
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
        <Header
          theme={data?.theme}
          youtubeModal={youtubeModal}
          setYoutubeModal={setYoutubeModal}
        />
        <Contents isOpen={sidebarModal}>
          {youtubeModal && <YoutubeModal roomId={roomId} />}
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
