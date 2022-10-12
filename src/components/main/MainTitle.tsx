import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import lobbySocket, { generateSocket } from 'src/adapters/lobbySocket';
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

  const onLobbyEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLobby(!isLobby);
  };

  const toggleModal = () => {
    setLobby(!isLobby);
  };

  const { connectedUsers, appendUser, removeUser, findUserByUid } =
    connectedLobbyUsers();

  if (!lobbySocket.socket) {
    generateSocket();
  }
  onChatMessage('lobby');
  useEffect(() => {
    // send my info
    lobbySocket.socket?.on('connect', () => {
      getMe().then((res) => {
        lobbySocket.socket?.emit('joinLobby', { uid: res.data.uid });
      });
    });

    // check if joined successfully
    // lobbySocket.socket?.off('joinedLobby').on('joinedLobby', () => {

    // });

    // get new user info
    lobbySocket.socket?.on('newUserJoinedLobby', ({ sid, uid }) => {
      console.log('new user joined lobby', sid, uid);
      getUser(uid).then((res) => {
        const newUser = findUserByUid(uid);
        if (!newUser) {
          appendUser({
            nickname: res.data.nickname,
            uid,
            avatar: res.data.avatar,
            sid,
          });
        } else {
          console.log('already connected');
        }
      });
    });

    // get existing users info
    lobbySocket.socket?.on('existingUsers', ({ users, current }) => {
      console.log(current);
      users.map((user) => {
        getUser(user.uid).then((res) => {
          const existingUser = findUserByUid(user.uid);
          if (!existingUser) {
            appendUser({
              nickname: res.data.nickname,
              uid: user.uid,
              avatar: res.data.avatar,
              sid: user.sid,
            });
          } else {
            console.log('already connected');
          }
        });
        return user;
      });
    });

    lobbySocket.socket?.on('LeftLobby', ({ sid }: { sid: string }) => {
      if (lobbySocket.socket.id === sid) {
        return;
      }
      removeUser(sid);
    });
    return () => {
      lobbySocket.socket?.off('LeftLobby');
      lobbySocket.socket?.off('existingUsers');
      lobbySocket.socket?.off('newUserJoinedLobby');
      lobbySocket.socket?.off('connect');
    };
  }, [lobbySocket.socket]);

  // invite code
  const inviteCode = localStorage.getItem('inviteId');
  useEffect(() => {
    if (inviteCode) {
      setShowInvite(true);
    }
  }, []);

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
