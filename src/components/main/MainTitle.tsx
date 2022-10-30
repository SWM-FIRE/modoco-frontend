import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  lobbySocket,
  initSocketConnection,
  onLeftLobby,
  emitJoinLobby,
  onNewUserJoinedLobby,
  onExistingUsers,
} from 'src/adapters/lobbySocket';
import connectedLobbyUsers from '../../stores/connectedLobbyUsers';
import onChatMessage from '../../adapters/receiveMessage';
import Search from './Search';
import Lobby from './lobby/Lobby';
import { ReactComponent as MainFire } from '../../assets/svg/MainFire.svg';
import CheckInvite from './CheckInvite';
import { getMe, getUser } from '../../api/main';

export default function TitleContainer() {
  const [isLobby, setLobby] = useState<boolean>(false);
  const [showInvite, setShowInvite] = useState<boolean>(false);
  const inviteCode = localStorage.getItem('inviteId');
  useEffect(() => {
    if (inviteCode) {
      setShowInvite(true);
    }
  }, [inviteCode]);
  const onLobbyEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLobby(!isLobby);
  };

  const toggleModal = () => {
    setLobby(!isLobby);
  };
  const { connectedUsers, appendUser, findUserByUid, removeUser } =
    connectedLobbyUsers();
  onChatMessage('lobby');

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
      console.log('나감요', connectedUsers);
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

  return (
    <>
      {isLobby ? (
        <Lobby toggleModal={toggleModal} connectedUsers={connectedUsers} />
      ) : null}
      <Container>
        {showInvite && (
          <CheckInvite inviteCode={inviteCode} toggleInvite={setShowInvite} />
        )}
        <MainFire />
        <Search />
        <LobbyEnter onClick={onLobbyEnter}>로비 입장</LobbyEnter>
      </Container>
    </>
  );
}

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

const Container = styled.div`
  position: relative;
  margin-top: 6rem;
  width: 100%;
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
