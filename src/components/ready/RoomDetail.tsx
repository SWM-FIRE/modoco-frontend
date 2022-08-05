import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SingleCard from './SingleCard';

export default function RoomDetail({ roomNo: roomId }) {
  const navigate = useNavigate();
  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/room/${roomId}`);
  };

  return (
    <Container>
      <SingleCard room={roomId} />
      <EnterButton onClick={enterRoom}>입장하기 →</EnterButton>
    </Container>
  );
}

const Container = styled.div`
  width: 40.6rem;
  height: 42.7rem;
`;

const EnterButton = styled.button`
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 5rem;
  width: 100%;
  height: 5.5rem;
  cursor: pointer;
`;
