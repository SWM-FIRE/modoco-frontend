import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PermissionName } from 'src/interface/video.interface';
import Card from './card/Card';

export default function RoomDetail({ roomNo: roomId, setIsPrompt }) {
  const navigate = useNavigate();

  const permissionName = 'microphone' as PermissionName;
  const checkValid = !!navigator.permissions?.query;

  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (checkValid) {
      navigator.permissions.query({ name: permissionName }).then((result) => {
        if (result.state === 'granted') {
          setIsPrompt(false);
          if (localStorage.getItem('access_token')) {
            navigate(`/room/${roomId}`);
          }
        } else if (result.state === 'prompt') {
          setIsPrompt(true);
        } else if (result.state === 'denied') {
          setIsPrompt(true);
        }
      });
    }
  };

  return (
    <Container>
      <Card room={roomId} />
      <EnterButton onClick={enterRoom} data-cy="ready-enter-button">
        입장하기 →
      </EnterButton>
    </Container>
  );
}

const Container = styled.div`
  width: 40.6rem;
  height: 42.7rem;
  margin-top: 4rem;
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
  :disabled {
    cursor: default;
    background-color: #bababa;
  }
`;
