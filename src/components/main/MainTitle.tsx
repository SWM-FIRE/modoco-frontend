import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import lobbySocket, { generateSocket } from 'src/adapters/lobbySocket';
import { API } from 'src/config';
import connectedLobbyUsers from '../../stores/connectedLobbyUsers';
import onChatMessage from '../../adapters/receiveMessage';
import Search from './Search';
import Lobby from './Lobby';
import { ReactComponent as MainFire } from '../../assets/svg/MainFire.svg';
import CheckInvite from './CheckInvite';

export default function TitleContainer() {
  const [isLobby, setLobby] = useState<boolean>(false);
  const [showInvite, setShowInvite] = useState<boolean>(false);

  const randomEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLobby(!isLobby);
  };

  const toggleModal = () => {
    setLobby(!isLobby);
  };

  const { connectedUsers, appendUser, findUserBySid, removeUser } =
    connectedLobbyUsers();

  if (!lobbySocket.socket) {
    generateSocket();
    console.log(lobbySocket.socket);
  }
  onChatMessage('lobby');
  useEffect(() => {
    // send my info
    lobbySocket.socket?.on('connect', () => {
      console.log('connected');
      const token = localStorage.getItem('access_token');
      axios
        .get(API.ME, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          lobbySocket.socket?.emit('joinLobby', { uid: res.data.uid });
        });
    });

    // check if joined successfully
    lobbySocket.socket?.off('joinedLobby').on('joinedLobby', () => {
      console.log('[roomConnection] joinedLobby');
    });

    // get new user info
    lobbySocket.socket
      ?.off('newUserJoinedLobby')
      .on('newUserJoinedLobby', ({ sid, uid }) => {
        console.log('new user joined lobby', sid, uid);
        axios
          .get((API.USER as string) + uid, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          })
          .then((res) => {
            if (!connectedUsers.includes(uid)) {
              appendUser({
                nickname: res.data.nickname,
                uid,
                avatar: res.data.avatar,
                socketId: sid,
              });
            } else {
              console.log('already connected');
            }
          });
      });

    // get existing users info
    lobbySocket.socket
      ?.off('existingUsers')
      .on('existingUsers', ({ users, current }) => {
        console.log('existing users', users);
        console.log('i am ', current);
        users.map((user) => {
          axios
            .get((API.USER as string) + user.uid, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            })
            .then((res) => {
              if (!connectedUsers.includes(user.uid)) {
                appendUser({
                  nickname: res.data.nickname,
                  uid: user.uid,
                  avatar: res.data.avatar,
                  socketId: user.sid,
                });
                console.log('appendedUser', user.uid, res);
              } else {
                console.log('already connected');
              }
            });
          return user;
        });
      });

    lobbySocket.socket
      ?.off('leftLobby')
      .on('leftLobby', ({ sid }: { sid: string }) => {
        console.log('got left lobby msg');
        if (lobbySocket.socket.id === sid) {
          console.log('i left room');
          return;
        }
        const userInfo = findUserBySid(sid);
        console.log(userInfo.nickname, 'left room');
        removeUser(sid);
      });
  }, []);

  // invite code
  const inviteCode = localStorage.getItem('inviteId');
  useEffect(() => {
    if (inviteCode) {
      setShowInvite(true);
    }
  }, []);

  return (
    <>
      {isLobby ? <Lobby toggleModal={toggleModal} /> : null}
      <Container>
        {showInvite && (
          <CheckInvite inviteCode={inviteCode} toggleInvite={setShowInvite} />
        )}
        <MainFire />
        <Search />
        <RandomEnter onClick={randomEnter}>로비 입장</RandomEnter>
      </Container>
    </>
  );
}

const RandomEnter = styled.button`
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
