import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from 'src/components/atoms/ModalPortal';
import Header from '../profileModal/Header';
import Contents from './Contents';
import codeChatStore from '../../../stores/room/codeChatStore';

export default function CodeModal({
  toggle,
  codeModalType,
}: {
  toggle: (_type) => void;
  codeModalType: string;
}) {
  const closeModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle(codeModalType);
  };
  const { setCode } = codeChatStore();

  useEffect(() => {
    return () => {
      setCode('');
    };
  }, []);

  return (
    <ModalPortal>
      <Screen onClick={closeModalBackground}>
        <Container onClick={(e) => e.stopPropagation()}>
          <Header toggle={toggle} />
          <Contents toggle={toggle} codeModalType={codeModalType} />
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
