import { useState } from 'react';
import styled from 'styled-components';
import RoomCards from '../components/main/RoomCards';
import Header from '../components/main/Header';
import MainTitle from '../components/main/MainTitle';
import Modal from '../components/layout/Modal';
import LoginModal from '../components/login/LoginModal';
import useSetSelf from '../hooks/useSetSelf';

export default function Main() {
  const [isModal, setIsModal] = useState(false);

  useSetSelf();
  const closeModalHandler = () => {
    setIsModal(false);
  };
  const openModalHandler = () => {
    setIsModal(true);
  };

  return (
    <>
      <Container>
        <Header modalHandler={openModalHandler} />
        <MainTitle />
        <RoomCards />
      </Container>
      {isModal && (
        <Modal modalHandler={closeModalHandler}>
          <LoginModal modalHandler={closeModalHandler} />
        </Modal>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
