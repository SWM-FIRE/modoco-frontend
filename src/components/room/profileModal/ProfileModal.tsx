import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Contents from '../../profile/Contents';
import userStore from '../../../stores/userStore';
import roomModalStore from '../../../stores/room/roomModalStore';

export default function ProfileModal({ toggle }: { toggle: () => void }) {
  useEffect(() => {
    console.log('i am open');
    return () => {
      console.log(' i close');
    };
  }, []);
  const closeModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle();
  };
  const { uid } = userStore();
  const { profileUid } = roomModalStore();

  return (
    <Screen onClick={closeModalBackground}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header toggle={toggle} />
        <CenterContent>
          <Contents isMe={uid === profileUid} />
        </CenterContent>
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

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
