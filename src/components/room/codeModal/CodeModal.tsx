import React from 'react';
import styled from 'styled-components';
import ModalPortal from 'src/components/atoms/ModalPortal';
import Header from '../profileModal/Header';
import Contents from './Contents';

export default function CodeModal({ toggle }: { toggle: () => void }) {
  const closeModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle();
  };

  return (
    <ModalPortal>
      <Screen onClick={closeModalBackground}>
        <Container onClick={(e) => e.stopPropagation()}>
          <Header toggle={toggle} />
          <Contents toggle={toggle} />
        </Container>
      </Screen>
    </ModalPortal>
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
  width: 60%;
  min-width: 60rem;
  height: 90%;
  background-color: black;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  border-radius: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;
