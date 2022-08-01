import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomCards from '../components/main/RoomCards';
import Header from '../components/main/Header';
import MainTitle from '../components/main/MainTitle';
import Modal from '../components/layout/Modal';
import LoginModal from '../components/login/LoginModal';
import UserStore from '../stores/userStore';

export default function Main() {
  const [isModal, setIsModal] = useState(false);
  const { setNickname, uid, setUid, setAvatar } = UserStore();

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      console.log('existing user', uid);
      setNickname(localStorage.getItem('nickname'));
      setUid(localStorage.getItem('uid'));
      setAvatar(localStorage.getItem('avatar'));
    }
  }, []);

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
