import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Card from './card/Card';

export default function RoomDetail({ roomNo: roomId }) {
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);
  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (localStorage.getItem('access_token')) {
      navigate(`/room/${roomId}`);
    }
  };

  // eslint-disable-next-line no-undef
  const permissionName = 'microphone' as PermissionName;
  const checkValid = !!navigator.permissions?.query;
  if (checkValid) {
    navigator.permissions.query({ name: permissionName }).then((result) => {
      if (result.state === 'granted') {
        setDisableButton(false);
      } else if (result.state === 'prompt') {
        setDisableButton(true);
      } else if (result.state === 'denied') {
        setDisableButton(false);
      }
    });
  }

  return (
    <Container>
      <Card room={roomId} />
      <EnterButton
        onClick={enterRoom}
        disabled={disableButton}
        data-cy="ready-enter-button"
      >
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
