import React, { useCallback, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { themeFire } from '../styles/theme';
import RoomCards from '../components/main/RoomCards';
import CreateRoomModal from '../components/main/createRoomModal/CreateRoomModal';
import useMainModal from '../hooks/useMainModal';
import RoomPasswordModal from '../components/main/roomPasswordModal/RoomPasswordModal';
import Lobby from '../components/main/lobby/Lobby';
import connectedLobbyUsers from '../stores/connectedLobbyUsers';
import CheckInvite from '../components/main/CheckInvite';
import Search from '../components/main/Search';
import {
  lobbySocket,
  initSocketConnection,
  onLeftLobby,
  emitJoinLobby,
  onNewUserJoinedLobby,
  onExistingUsers,
} from '../adapters/lobbySocket';
import onChatMessage from '../adapters/receiveMessage';
import { ReactComponent as MainFire } from '../assets/svg/MainFire.svg';
import { getMe, getUser } from '../api/main';
import loginModalStore from '../stores/loginModalStore';

export default function Main() {
  const navigate = useNavigate();
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);
  const [roomId, setRoomId] = useState(-1);
  const [searchInput, setSearchInput] = useState('');
  const {
    setRoomPasswordModal,
    isOpenRoomPasswordModal,
    isLobbyModal,
    setLobbyModal,
  } = useMainModal();
  const { setLoginModal } = loginModalStore();

  const openLobbyModal = useCallback(() => {
    setLobbyModal(true);
  }, [setLobbyModal]);

  const closeRoomPasswordModal = useCallback(() => {
    setRoomPasswordModal(false);
  }, [setRoomPasswordModal]);

  const openRoomPasswordModal = useCallback(() => {
    setRoomPasswordModal(true);
  }, [setRoomPasswordModal]);

  const closeLobbyModal = useCallback(() => {
    setLobbyModal(false);
  }, [setLobbyModal]);

  const openLoginModal = useCallback(() => {
    setLoginModal(true);
  }, [setLoginModal]);

  const [showInvite, setShowInvite] = useState<boolean>(false);
  const inviteCode = localStorage.getItem('inviteId');
  const { connectedUsers, appendUser, findUserByUid, removeUser } =
    connectedLobbyUsers();
  onChatMessage('lobby');
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/');
    }
    if (inviteCode) {
      setShowInvite(true);
    }
  }, [inviteCode, navigate]);

  useEffect(() => {
    const newUserJoined = (data) => {
      getUser(data.uid).then((res) => {
        const newUser = findUserByUid(data.uid);
        if (!newUser) {
          appendUser({
            nickname: res.data.nickname,
            uid: data.uid,
            avatar: res.data?.avatar,
            sid: data.sid,
          });
        } else {
          console.log('already connected');
        }
      });
    };

    const existingUsers = (data) => {
      data.users.map((user) => {
        getUser(user?.uid).then((res) => {
          const existingUser = findUserByUid(user.uid);
          if (!existingUser) {
            appendUser({
              nickname: res.data.nickname,
              uid: user.uid,
              avatar: res.data?.avatar,
              sid: user.sid,
            });
          } else {
            console.log('already connected');
          }
        });
        return user;
      });
    };
    const leftLobby = (data) => {
      if (lobbySocket.socket?.id === data.sid) {
        return;
      }
      removeUser(data.sid);
    };
    initSocketConnection(localStorage.getItem('access_token'));
    emitJoinLobby(getMe);
    onNewUserJoinedLobby(newUserJoined);
    onExistingUsers(existingUsers);
    onLeftLobby(leftLobby);
  }, [appendUser, findUserByUid, removeUser]);

  const onLobbyEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openLobbyModal();
  };

  const openCreateRoom = () => {
    if (isMobile) {
      toast.error('모바일에서는 방을 만들 수 없습니다');
      return;
    }
    setIsCreateRoomModal(true);
  };

  const closeCreateRoom = () => {
    setIsCreateRoomModal(false);
  };

  return (
    <ThemeProvider theme={themeFire}>
      {isCreateRoomModal && (
        <CreateRoomModal closeCreateRoom={closeCreateRoom} />
      )}
      {isOpenRoomPasswordModal && (
        <RoomPasswordModal
          roomId={roomId}
          closeModal={closeRoomPasswordModal}
        />
      )}
      {isLobbyModal && (
        <Lobby closeModal={closeLobbyModal} connectedUsers={connectedUsers} />
      )}
      {showInvite && (
        <CheckInvite inviteCode={inviteCode} toggleInvite={setShowInvite} />
      )}
      <Container>
        <Container>
          <MainFire />
          <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          <LobbyEnter onClick={onLobbyEnter}>로비 입장</LobbyEnter>
        </Container>
        <RoomCards
          openCreateRoom={openCreateRoom}
          openRoomPasswordModal={openRoomPasswordModal}
          openLoginModal={openLoginModal}
          searchInput={searchInput}
          setRoomId={setRoomId}
        />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;

const LobbyEnter = styled.button`
  width: 16.1rem;
  height: 5.4rem;
  background-color: white;
  margin-top: 4rem;
  border-radius: 6.2rem;
  cursor: pointer;
  color: black;
  font-size: 1.8rem;
  font-family: JostRegular;
  font-weight: 700;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
