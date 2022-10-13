import styled from 'styled-components';
import { useEffect } from 'react';
import Contents from './Contents';
import Header from '../room/profileModal/Header';
import mainModalStore from '../../stores/mainModalStore';

export default function NoticeModal() {
  const { closeNoticeModal } = mainModalStore();

  useEffect(() => {
    if (localStorage.getItem('isNotice') === 'false') {
      closeNoticeModal();
    }
  }, []);
  return (
    <Screen onClick={closeNoticeModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header toggle={closeNoticeModal} />
        <Contents />
      </Container>
    </Screen>
  );
}

const Screen = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: relative;
  width: fit-content;
  max-width: 80%;
  /* height: 60%; */
  background-color: black;
  overflow: auto;
  ::-webkit-scrollbar {
    scrollbar-width: 0.3rem;
  }
  border-radius: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
`;
