import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserStore from '../../../stores/userStore';
import roomSocket from '../../../adapters/roomSocket';
import connectedUsersStore from '../../../stores/room/connectedUsersStore';

export default function Buttons({
  isMe,
  moderator,
  uid: targetUid,
}: {
  isMe: boolean;
  moderator: number;
  uid: number;
}) {
  const { uid } = UserStore();
  const { roomId } = useParams();
  const isCaptain = moderator === uid;
  const newSocket = roomSocket.socket;
  const { findUserByUid } = connectedUsersStore();

  const kickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const targetSid = findUserByUid(targetUid)?.sid;
    const userToKick = {
      uid: targetUid,
      sid: targetSid,
    };
    newSocket.emit('kickUser', { room: roomId, userToKick });
    console.log('kicked user');
  };

  return (
    <Container>
      {!isMe && (
        <FriendComponent>
          <FriendRequest>친구요청</FriendRequest>
          {isCaptain && <Kick onClick={kickUser}>내보내기</Kick>}
        </FriendComponent>
      )}
    </Container>
  );
}

const FriendRequest = styled.button`
  background-color: #ffffff;
  color: #111827;
  flex-grow: 1;
`;

const Kick = styled.button`
  border: 1px solid #fb7185;
  color: #fb7185;
  flex-grow: 1;
`;

const Container = styled.div`
  margin-top: 1.6rem;
  width: 100%;
  line-height: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
  button {
    font-family: IBMPlexSansKRRegular;
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    border-radius: 5rem;
    padding: 1.2rem 2rem;
    cursor: pointer;
  }
`;

const FriendComponent = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;
