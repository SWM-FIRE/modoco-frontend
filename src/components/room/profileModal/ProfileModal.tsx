import React, { useEffect } from 'react';
import styled from 'styled-components';
import Contents from '../../profile/Contents';

export default function ProfileModal({
  isMe,
  toggle,
}: {
  isMe: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    console.log('i am open');
    return () => {
      console.log(' i close');
    };
  }, []);
  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle(false);
  };
  return (
    <Screen onClick={closeModal}>
      <Container>
        <Contents isMe={isMe} />
      </Container>
    </Screen>
  );
}

const Screen = styled.div`
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  height: 90%;
  background-color: black;
  overflow: auto;
  z-index: 999;
`;
