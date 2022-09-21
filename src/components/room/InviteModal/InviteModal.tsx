import React from 'react';
import styled from 'styled-components';
import Header from '../profileModal/Header';
import Invite from './Invite';

export default function InviteModal({ toggle }: { toggle: () => void }) {
  const closeModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle();
  };

  return (
    <Screen onClick={closeModalBackground}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header toggle={toggle} />
        <Invite />
      </Container>
    </Screen>
  );
}

const Screen = styled.div`
  position: fixed;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: relative;
  width: fit-content;
  max-width: 70%;
  height: 20%;
  background-color: black;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  border-radius: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;
