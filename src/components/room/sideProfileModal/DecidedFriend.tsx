import React from 'react';
import styled from 'styled-components';
import AcceptOrDecline from './AcceptOrDecline';
import { ReactComponent as ShowFriendState } from '../../../assets/svg/ShowFriendState.svg';

export default function DecidedFriend({ data }) {
  const RECV = 'RECEIVER';
  const SEND = 'SENDER';
  const PENDING = 'PENDING';
  const ACCEPT = 'ACCEPTED';

  if (data.status === PENDING && data.role === RECV) {
    return <AcceptOrDecline data={data} />;
  }
  if (data.status === PENDING && data.role === SEND) {
    return (
      <Container>
        <Text>친구요청을 보낸 상대입니다</Text>
      </Container>
    );
  }
  if (data.status === ACCEPT) {
    return (
      <Friend>
        <ShowFriendState />
        나와 친구입니다
      </Friend>
    );
  }
  return <>error</>;
}

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Friend = styled.div`
  width: 56%;
  margin-top: 1.6rem;
  padding: 1.2rem 2rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5rem;
  color: #f3f4f6;
  svg {
    width: 1.6rem;
  }
`;
