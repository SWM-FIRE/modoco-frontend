import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserStore from '../stores/userStore';
import RoomCards from '../components/main/RoomCards';
import Header from '../components/main/Header';
import MainTitle from '../components/main/MainTitle';
import Modal from '../components/layout/Modal';
import LoginModal from '../components/login/LoginModal';
import useSetSelf from '../hooks/useSetSelf';
import ModalStore from '../stores/createRoomModalStore';
import CreateRoomModal from '../components/main/CreateRoomModal';
import CreateRoomForm from '../components/main/CreateRoomForm';

export default function Main() {
  const [isModal, setIsModal] = useState(false);
  const { isOpenCreateRoomModal } = ModalStore();
  const { nickname } = UserStore();
  const navigate = useNavigate();

  useSetSelf();
  useEffect(() => {
    if (!nickname) {
      navigate('/');
    }
  });
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
      {isOpenCreateRoomModal && (
        <CreateRoomModal>
          <CreateRoomForm />
        </CreateRoomModal>
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
